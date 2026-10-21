import { GoogleGenAI } from '@google/genai';
import { Product, ProductImageItem, FashionBulletDetails, StyleSuggestion, Review } from '../types';
import { PRODUCTS, deduplicateProducts } from '../data/products';

const CATALOG_CACHE_KEY = 'megaprime_blush_bloom_catalog_cache_v2';
const LEGACY_CACHE_KEY = 'megaprime_blush_bloom_catalog_cache_v1';
const API_CONFIG_KEY = 'megaprime_fashion_api_keys_v1';

export interface ApiKeysConfig {
  unsplashKey: string;
  pexelsKey: string;
  geminiKey: string;
}

export function getApiKeys(): ApiKeysConfig {
  let stored: Partial<ApiKeysConfig> = {};
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(API_CONFIG_KEY);
      if (data) stored = JSON.parse(data);
    } catch {
      // ignore
    }
  }

  return {
    unsplashKey:
      stored.unsplashKey ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_UNSPLASH_ACCESS_KEY) ||
      '',
    pexelsKey:
      stored.pexelsKey ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PEXELS_API_KEY) ||
      '',
    geminiKey:
      stored.geminiKey ||
      (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
      '',
  };
}

export function saveApiKeys(keys: ApiKeysConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(API_CONFIG_KEY, JSON.stringify(keys));
  }
}

// -------------------------------------------------------------
// Catalog Cache Management (with strict deduplication)
// -------------------------------------------------------------
export function getStoredCatalog(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      // Clean legacy cache if present
      localStorage.removeItem(LEGACY_CACHE_KEY);

      const cached = localStorage.getItem(CATALOG_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const deduped = deduplicateProducts(parsed);
          return deduped;
        }
      }
    } catch (e) {
      console.warn('Could not read cached catalog, falling back to bundled data:', e);
    }
  }
  return deduplicateProducts(PRODUCTS);
}

export function saveStoredCatalog(products: Product[]): void {
  if (typeof window !== 'undefined') {
    try {
      const deduped = deduplicateProducts(products);
      localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(deduped));
    } catch (e) {
      console.error('Failed to cache catalog:', e);
    }
  }
}

export function clearStoredCatalogCache(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CATALOG_CACHE_KEY);
    localStorage.removeItem(LEGACY_CACHE_KEY);
  }
}

// -------------------------------------------------------------
// Licensed Image Fetchers (Unsplash & Pexels)
// -------------------------------------------------------------
export async function fetchUnsplashImages(
  query: string,
  count: number = 3,
  accessKey?: string
): Promise<ProductImageItem[]> {
  const key = accessKey || getApiKeys().unsplashKey;
  if (!key || key === 'MY_UNSPLASH_ACCESS_KEY') {
    throw new Error('Unsplash Access Key not configured. Please enter your key in the AI Pipeline settings.');
  }

  const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=${count}&orientation=portrait`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Client-ID ${key}`,
      'Accept-Version': 'v1',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Unsplash API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`No images found on Unsplash for "${query}"`);
  }

  return data.results.slice(0, count).map((item: any) => ({
    url: item.urls?.regular || item.urls?.full,
    photographer: item.user?.name || 'Unsplash Contributor',
    source: 'Unsplash' as const,
    sourceUrl: item.links?.html || `https://unsplash.com/@${item.user?.username}`,
    alt: item.alt_description || query,
    blurPlaceholder: item.urls?.thumb,
  }));
}

export async function fetchPexelsImages(
  query: string,
  count: number = 3,
  apiKey?: string
): Promise<ProductImageItem[]> {
  const key = apiKey || getApiKeys().pexelsKey;
  if (!key || key === 'MY_PEXELS_API_KEY') {
    throw new Error('Pexels API Key not configured. Please enter your key in the AI Pipeline settings.');
  }

  const endpoint = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=${count}&orientation=portrait`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization: key,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Pexels API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  if (!data.photos || data.photos.length === 0) {
    throw new Error(`No images found on Pexels for "${query}"`);
  }

  return data.photos.slice(0, count).map((item: any) => ({
    url: item.src?.large || item.src?.original,
    photographer: item.photographer || 'Pexels Contributor',
    source: 'Pexels' as const,
    sourceUrl: item.url || item.photographer_url,
    alt: item.alt || query,
    blurPlaceholder: item.src?.tiny,
  }));
}

// -------------------------------------------------------------
// Imagen Studio Prompt Generator
// -------------------------------------------------------------
export function generateImagenStudioPrompt(itemTitle: string, category: string): string {
  return `clean e-commerce studio photo of a ${itemTitle} (${category}), soft pink backdrop, natural light, high resolution, no text or logos, luxury fashion editorial catalogue angle`;
}

// -------------------------------------------------------------
// Gemini Trend Research & Copy Generation Pipeline
// -------------------------------------------------------------
export interface GenerationProgress {
  current: number;
  total: number;
  productName: string;
  status: 'researching' | 'writing' | 'fetching_images' | 'done' | 'error';
  message: string;
}

export async function regenerateProductFashionCopy(
  product: Product,
  geminiKey?: string
): Promise<{
  title: string;
  tagline: string;
  description: string;
  bulletDetails: FashionBulletDetails;
  sizeAndFitNote: string;
  reviews: Review[];
}> {
  const key =
    geminiKey ||
    getApiKeys().geminiKey ||
    (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');

  if (!key) {
    throw new Error('Gemini API key is required for AI copy generation.');
  }

  const ai = new GoogleGenAI({ apiKey: key });

  const prompt = `
You are a senior fashion editor and merchandiser for "Blush & Bloom by Megaprime", a contemporary Nigerian and global fashion house.
Category: "${product.category}"
Item Reference: "${product.name}"

TASK:
1. Conduct market research on current fashion trends, breathable tropical fabrics, flattering cuts for Nigerian curves, and occasion styling for this item.
2. Produce high-fashion, original copy in a warm, confident, and aspirational tone.
3. Strict structure required:
   - "title": 4 to 8 words, brand-neutral (e.g. "Blush Satin Wrap Midi Dress").
   - "tagline": One sentence, benefit-led and elegant.
   - "description": Exactly 60 to 90 words in a warm, confident, aspirational tone, covering occasion, feel of fabric, fit, and styling idea.
   - "bulletDetails": Object with:
       * "fabric": e.g. "95% Poly Satin, 5% Spandex"
       * "fit": e.g. "True to size wrap fit"
       * "length": e.g. "Midi length (118cm)"
       * "care": e.g. "Hand wash cold gentle"
       * "sizes": "UK 6 to 18" or "S to XXL"
       * "colors": 3-4 color options
   - "sizeAndFitNote": 1-2 sentence practical advice on sizing for curves.
   - "reviews": Array of 3 realistic customer reviews with first names and Nigerian cities (e.g. "Chidinma, Lekki", "Zainab, Abuja", "Blessing, Port Harcourt").

Respond in valid JSON only with no markdown backticks or commentary.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      title: parsed.title || product.name,
      tagline: parsed.tagline || product.tagline,
      description: parsed.description || product.description[0],
      bulletDetails: parsed.bulletDetails || product.bulletDetails,
      sizeAndFitNote: parsed.sizeAndFitNote || product.sizeAndFitNote,
      reviews: parsed.reviews?.map((r: any, idx: number) => ({
        id: `gen-rev-${Date.now()}-${idx}`,
        author: r.author || r.name || 'Verified Customer',
        location: r.location || 'Lagos, Nigeria',
        rating: r.rating || 5,
        date: 'Recent verified purchase',
        title: r.title || 'Exceptional fit & quality',
        comment: r.comment || r.review || 'Love the fabric drape and neat finishing.',
        verified: true,
      })) || product.reviews,
    };
  } catch (err: any) {
    console.error('Gemini copy generation error:', err);
    throw new Error(`AI Copy Generation failed: ${err.message || 'Unknown error'}`);
  }
}

// -------------------------------------------------------------
// Regenerate Single Product Pipeline
// -------------------------------------------------------------
export async function runPipelineForProduct(
  product: Product,
  options: {
    useUnsplash?: boolean;
    usePexels?: boolean;
    useAiCopy?: boolean;
  } = { useUnsplash: true, usePexels: false, useAiCopy: true }
): Promise<Product> {
  const updated = { ...product };

  // 1. Refresh Images if requested
  if (options.useUnsplash || options.usePexels) {
    try {
      const query = `${product.name} ${product.category} women fashion studio`;
      let newImages: ProductImageItem[] = [];

      if (options.useUnsplash) {
        newImages = await fetchUnsplashImages(query, 3);
      } else if (options.usePexels) {
        newImages = await fetchPexelsImages(query, 3);
      }

      if (newImages.length > 0) {
        updated.images = newImages;
      }
    } catch (e: any) {
      console.warn(`Could not refresh images for ${product.name}:`, e.message);
    }
  }

  // 2. Refresh Copy with Gemini
  if (options.useAiCopy) {
    try {
      const aiData = await regenerateProductFashionCopy(product);
      updated.name = aiData.title;
      updated.tagline = aiData.tagline;
      updated.description = [aiData.description];
      updated.bulletDetails = aiData.bulletDetails;
      updated.sizeAndFitNote = aiData.sizeAndFitNote;
      updated.reviews = aiData.reviews;
    } catch (e: any) {
      console.warn(`Could not refresh AI copy for ${product.name}:`, e.message);
    }
  }

  return updated;
}
