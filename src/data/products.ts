import { Product, ProductImageItem, PackageOption } from '../types';

export const CATEGORIES = [
  "All Products",
  "Dresses",
  "Tops & Blouses",
  "Skirts",
  "Ankara & African Prints",
  "Co-ord Sets",
  "Jumpsuits",
  "Bags",
  "Shoes",
  "Jewelry",
  "Lingerie & Loungewear",
  "Kids Fashion"
];

// Helper to normalize product image into a ProductImageItem
export function getProductImageItem(img: string | ProductImageItem): ProductImageItem {
  if (typeof img === 'string') {
    return {
      url: img,
      photographer: "Unsplash Fashion Collective",
      source: "Unsplash",
      sourceUrl: "https://unsplash.com",
      alt: "Fashion product photography"
    };
  }
  return img;
}

// Helper to extract image URL safely
export function getProductImageUrl(img: string | ProductImageItem | undefined): string {
  if (!img) return "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80";
  if (typeof img === 'string') return img;
  return img.url;
}

/**
 * Deduplicate products by ID, Slug, and Name so no product ever appears twice in the store.
 */
export function deduplicateProducts(items: Product[]): Product[] {
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();
  const result: Product[] = [];

  for (const item of items) {
    if (!item) continue;
    const cleanId = item.id?.trim();
    const cleanSlug = item.slug?.trim().toLowerCase();
    const cleanName = item.name?.trim().toLowerCase();

    if (cleanId && seenIds.has(cleanId)) continue;
    if (cleanSlug && seenSlugs.has(cleanSlug)) continue;
    if (cleanName && seenNames.has(cleanName)) continue;

    if (cleanId) seenIds.add(cleanId);
    if (cleanSlug) seenSlugs.add(cleanSlug);
    if (cleanName) seenNames.add(cleanName);

    result.push(item);
  }

  return result;
}


export function getDefaultPackages(price: number): PackageOption[] {
  return [
    {
      id: "pkg-1",
      name: "1 Piece (Single Design)",
      quantity: 1,
      price: price,
      originalPrice: Math.round(price * 1.25),
      savings: Math.round(price * 0.25),
      freeDelivery: true
    },
    {
      id: "pkg-2",
      name: "2 Pieces (Curated Duo Bundle)",
      quantity: 2,
      price: Math.round(price * 1.8),
      originalPrice: price * 2,
      savings: Math.round(price * 0.2),
      badge: "MOST POPULAR",
      freeDelivery: true
    },
    {
      id: "pkg-3",
      name: "3 Pieces (Complete Fashion Edit)",
      quantity: 3,
      price: Math.round(price * 2.5),
      originalPrice: price * 3,
      savings: Math.round(price * 0.5),
      badge: "BEST VALUE",
      freeDelivery: true
    }
  ];
}

export const PRODUCTS: Product[] = deduplicateProducts([
  {
    "id": "prod-dress-1",
    "name": "Blush Satin Wrap Midi Dress",
    "slug": "blush-satin-wrap-midi-dress",
    "tagline": "Effortless liquid drape tailored to accentuate feminine silhouettes from dawn to dusk.",
    "headline": "Effortless liquid drape tailored to accentuate feminine silhouettes from dawn to dusk.",
    "category": "Dresses",
    "startingPrice": 38500,
    "oldPrice": 48000,
    "rating": 4.9,
    "reviewCount": 38,
    "stockCount": 14,
    "description": "Impeccably tailored in lustrous silk-satin, this blush wrap dress glides over the skin with a fluid, breathable touch built for warm Nigerian evenings. The contoured wrap waist and asymmetrical flounce hem flatter the waistline while providing movement across formal dinners, bridal showers, and cocktail receptions. Pair with metallic minimalist stiletto sandals and a structured rose leather shoulder bag for an unforgettable evening statement.",
    "bulletDetails": {
      "fabric": "96% High-Twist Satin Silk, 4% Elastane",
      "fit": "Relaxed wrap fit with adjustable sash tie",
      "length": "Midi length (48 inches from shoulder to hem)",
      "care": "Dry clean recommended or gentle cold hand wash; cool iron on reverse",
      "availableSizes": [
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Soft Blush Pink",
        "Champagne Gold",
        "Rose Mauve"
      ]
    },
    "sizeAndFitNote": "True to UK sizing. Features a forgiving adjustable wrap waist that flatters hourglass curves effortlessly.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Adds celebratory height and elongates legs"
      },
      {
        "productId": "prod-bag-1",
        "productName": "Structured Quilted Rose Leather Shoulder Bag",
        "reason": "Matches the tone with understated sophistication"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamar Nicole",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarnicole",
        "alt": "Front view of blush satin wrap midi dress"
      },
      {
        "url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Burgess Milner",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@burgessmilner",
        "alt": "Detail view of draped satin waist tie"
      },
      {
        "url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Valerie Elash",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@valerieelash",
        "alt": "Lifestyle model wearing blush satin wrap dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-d1-1",
        "author": "Amina Bello",
        "location": "Maitama, Abuja",
        "rating": 5,
        "date": "2 days ago",
        "title": "Spectacular drape and premium fabric",
        "comment": "Wore this to an intimate wedding reception at Fraser Suites Abuja. The satin looks so rich and does not cling or crease easily. Delivery was quick and the fit was true to size."
      },
      {
        "id": "rev-d1-2",
        "author": "Chidinma Nwosu",
        "location": "Lekki Phase 1, Lagos",
        "rating": 5,
        "date": "1 week ago",
        "title": "Very flattering for curvy hips",
        "comment": "As a UK 14 with hips, wrap dresses can be tricky, but this one has generous coverage at the bust and hips. Pay on delivery made it 100% stress-free."
      },
      {
        "id": "rev-d1-3",
        "author": "Omotola Bankole",
        "location": "Bodija, Ibadan",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Soft pink color is gorgeous",
        "comment": "The blush color is sweet and very classy. Came nicely steamed in a dust bag with prompt courier dispatch."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 38500,
        "originalPrice": 48125,
        "savings": 9625,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 69300,
        "originalPrice": 77000,
        "savings": 7700,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 96250,
        "originalPrice": 115500,
        "savings": 19250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Blush Satin Wrap Midi Dress",
    "shortBenefit": "Effortless liquid drape tailored to accentuate feminine silhouettes from dawn to dusk."
  },
  {
    "id": "prod-dress-2",
    "name": "Tiered Chiffon Floral Maxi Dress",
    "slug": "tiered-chiffon-floral-maxi-dress",
    "tagline": "Romantic tiered flounces made from featherlight chiffon for carefree movement.",
    "headline": "Romantic tiered flounces made from featherlight chiffon for carefree movement.",
    "category": "Dresses",
    "startingPrice": 42000,
    "oldPrice": 52000,
    "rating": 4.8,
    "reviewCount": 29,
    "stockCount": 9,
    "description": "Float effortlessly into garden engagements and daytime festivities with our tiered floral maxi gown. Spun from whisper-soft georgette chiffon over a breathable cotton-viscose lining, this silhouette features romantic flutter cuffs and an elasticized smocked bodice. It moves with grace in humid weather while remaining opaque and modest. Style with braided wedge slides and delicate pearl huggies for garden-party glamour.",
    "bulletDetails": {
      "fabric": "100% Lightweight Georgette Chiffon; Cotton blend lining",
      "fit": "Flowing A-line tiered silhouette with smocked bodice",
      "length": "Full maxi (56 inches length)",
      "care": "Hand wash cold; line dry in shade; low iron",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18",
        "UK 20"
      ],
      "availableColors": [
        "Blush Meadow Floral",
        "Pastel Rose",
        "Powder Blue"
      ]
    },
    "sizeAndFitNote": "Smocked elastic bodice stretches comfortably. Fits true to size.",
    "styleWith": [
      {
        "productId": "prod-shoe-3",
        "productName": "Braided Leather Low Wedge Slides",
        "reason": "Maintains an airy daytime aesthetic"
      },
      {
        "productId": "prod-jewel-2",
        "productName": "Freshwater Pearl Drop Huggie Earrings",
        "reason": "Complements soft floral aesthetics"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Jonathan Borba",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@jonathanborba",
        "alt": "Front view of tiered floral chiffon maxi dress"
      },
      {
        "url": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Valerie Elash",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@valerieelash",
        "alt": "Detail view of sheer floral chiffon sleeve"
      },
      {
        "url": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Lifestyle outdoors wearing tiered floral maxi dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-d2-1",
        "author": "Zainab Aliyu",
        "location": "Kano Municipal, Kano",
        "rating": 5,
        "date": "3 days ago",
        "title": "Breathable and modest elegance",
        "comment": "The dress is fully lined and not see-through at all. Perfect for hot weather because the chiffon is airy and high quality."
      },
      {
        "id": "rev-d2-2",
        "author": "Kemi Adeleke",
        "location": "Victoria Island, Lagos",
        "rating": 4.8,
        "date": "1 week ago",
        "title": "Wore to Sunday service and brunch",
        "comment": "Received so many compliments! The smocking on the chest is very soft and doesn't pinch."
      },
      {
        "id": "rev-d2-3",
        "author": "Ngozi Eke",
        "location": "GRA, Port Harcourt",
        "rating": 4.7,
        "date": "3 weeks ago",
        "title": "Flows beautifully in motion",
        "comment": "Fast dispatch down to Rivers State. Paid on delivery with POS without any headache."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 42000,
        "originalPrice": 52500,
        "savings": 10500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 75600,
        "originalPrice": 84000,
        "savings": 8400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 105000,
        "originalPrice": 126000,
        "savings": 21000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Tiered Chiffon Floral Maxi Dress",
    "shortBenefit": "Romantic tiered flounces made from featherlight chiffon for carefree movement."
  },
  {
    "id": "prod-dress-3",
    "name": "Emerald Pleated Corset Midi Dress",
    "slug": "emerald-pleated-corset-midi-dress",
    "tagline": "Structured boning meets micro sunray pleats for regal evening poise.",
    "headline": "Structured boning meets micro sunray pleats for regal evening poise.",
    "category": "Dresses",
    "startingPrice": 46000,
    "oldPrice": 58000,
    "rating": 4.9,
    "reviewCount": 42,
    "stockCount": 7,
    "description": "Designed for high-impact presence, this emerald midi combines an architectural corset bodice with sharp accordion sunray pleats. The inner boning sculpts the waist with comfortable flexibility, while the knife-pleated skirt swirls dramatically with every step. Perfect for formal galas, award dinners, and evening wedding banquets. Complete the regal ensemble with stiletto sandals and twisted chunky gold jewelry.",
    "bulletDetails": {
      "fabric": "95% Poly-Crepe, 5% Spandex with flex boning",
      "fit": "Corset-fitted bodice with flare pleated skirt",
      "length": "Midi length (47 inches)",
      "care": "Specialist dry clean only",
      "availableSizes": [
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16"
      ],
      "availableColors": [
        "Deep Emerald Green",
        "Burgundy Plum",
        "Midnight Navy"
      ]
    },
    "sizeAndFitNote": "Corseted bodice holds firmly. If between bust sizes, choose one size up.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Metallic heels amplify jewel tones"
      },
      {
        "productId": "prod-jewel-3",
        "productName": "Twisted Chunky Statement Gold Cuff Bangle",
        "reason": "Adds striking contrast to deep emerald"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Apostolos Vamvouras",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@apostolosvamvouras",
        "alt": "Front view of emerald pleated corset midi dress"
      },
      {
        "url": "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Detail view of corset boning and sunray accordion pleats"
      },
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Dom Hill",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@domhill",
        "alt": "Lifestyle editorial of emerald evening dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-d3-1",
        "author": "Bolanle Osinbajo",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "Felt like royalty at the dinner",
        "comment": "The emerald color is rich and deep. The corset cinches you in comfortably without restricting your breathing. 10/10!"
      },
      {
        "id": "rev-d3-2",
        "author": "Halima Usman",
        "location": "Garki 2, Abuja",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Pleats remain razor sharp",
        "comment": "Traveled with this dress in my suitcase and the pleats did not crush. Exceptional craftsmanship."
      },
      {
        "id": "rev-d3-3",
        "author": "Tomiwa Ajayi",
        "location": "Abeokuta, Ogun",
        "rating": 4.8,
        "date": "1 month ago",
        "title": "Great sizing support",
        "comment": "Customer service called me after order to ensure my bust measurement matched UK 12. Fits like a custom tailor made it."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 46000,
        "originalPrice": 57500,
        "savings": 11500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 82800,
        "originalPrice": 92000,
        "savings": 9200,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 115000,
        "originalPrice": 138000,
        "savings": 23000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Emerald Pleated Corset Midi Dress",
    "shortBenefit": "Structured boning meets micro sunray pleats for regal evening poise."
  },
  {
    "id": "prod-dress-4",
    "name": "Structured Ivory Crepe Blazer Dress",
    "slug": "structured-ivory-crepe-blazer-dress",
    "tagline": "Sharp double-breasted tailoring crafted for confident corporate and cocktail occasions.",
    "headline": "Sharp double-breasted tailoring crafted for confident corporate and cocktail occasions.",
    "category": "Dresses",
    "startingPrice": 49500,
    "oldPrice": 62000,
    "rating": 5,
    "reviewCount": 31,
    "stockCount": 6,
    "description": "Command attention in boardrooms and VIP receptions alike with this structured ivory blazer dress. Cut from substantial stretch crepe that resists creasing in transit, it features peaked satin lapels, padded shoulders, and tortoiseshell-inlaid horn buttons. Tailored with princess seams to define the waistline without feeling restrictive. Style with pointed suede block mules and a minimal crossbody bag for executive poise.",
    "bulletDetails": {
      "fabric": "Substantial Double-Weave Crepe with stretch lining",
      "fit": "Tailored double-breasted hourglass silhouette",
      "length": "Above knee/micro midi (36 inches length)",
      "care": "Dry clean only",
      "availableSizes": [
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16"
      ],
      "availableColors": [
        "Pure Ivory",
        "Onyx Black",
        "Powder Rose"
      ]
    },
    "sizeAndFitNote": "Structured shoulder pads included. Fits true to tailored UK size.",
    "styleWith": [
      {
        "productId": "prod-shoe-1",
        "productName": "Pointed Toe Block Heel Suede Mules",
        "reason": "Adds contemporary office elegance"
      },
      {
        "productId": "prod-bag-4",
        "productName": "Minimalist Pebbled Leather Crossbody Bag",
        "reason": "Clean lines that complement sharp lapels"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Houcine Ncib",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@houcinencib",
        "alt": "Front view of structured ivory crepe blazer dress"
      },
      {
        "url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Apostolos Vamvouras",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@apostolosvamvouras",
        "alt": "Detail view of satin peaked lapels and buttons"
      },
      {
        "url": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Lifestyle look of ivory blazer dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-d4-1",
        "author": "Yetunde Soyinka",
        "location": "Marina, Lagos",
        "rating": 5,
        "date": "5 days ago",
        "title": "Power dressing at its finest",
        "comment": "Wore this for an executive board presentation in Victoria Island. The crepe fabric feels heavy, premium, and holds its shape impeccably."
      },
      {
        "id": "rev-d4-2",
        "author": "Dr. Ngozi Okon",
        "location": "Calabar, Cross River",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Top-tier tailoring",
        "comment": "The satin lapel detail looks like something from a luxury boutique on Savile Row. Very happy with the fast delivery."
      },
      {
        "id": "rev-d4-3",
        "author": "Blessing Igwe",
        "location": "Asaba, Delta",
        "rating": 4.9,
        "date": "3 weeks ago",
        "title": "No creasing after hours of sitting",
        "comment": "Traveled for an event and wore it straight out of the garment bag without wrinkling. Highly recommended."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 49500,
        "originalPrice": 61875,
        "savings": 12375,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 89100,
        "originalPrice": 99000,
        "savings": 9900,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 123750,
        "originalPrice": 148500,
        "savings": 24750,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Structured Ivory Crepe Blazer Dress",
    "shortBenefit": "Sharp double-breasted tailoring crafted for confident corporate and cocktail occasions."
  },
  {
    "id": "prod-dress-5",
    "name": "Puff Sleeve Linen Summer Sundress",
    "slug": "puff-sleeve-linen-summer-sundress",
    "tagline": "Airy pure linen designed to keep you delightfully cool in tropical sun.",
    "headline": "Airy pure linen designed to keep you delightfully cool in tropical sun.",
    "category": "Dresses",
    "startingPrice": 32000,
    "oldPrice": 39000,
    "rating": 4.7,
    "reviewCount": 22,
    "stockCount": 11,
    "description": "Embrace effortless island-breeze comfort in this pure linen sundress. Designed with romantic voluminous puff sleeves that can be worn on or off the shoulder, a square neckline, and a gently tiered skirt with deep functional side pockets. The breathable woven flax softens gracefully with each wear and allows airflow through tropical heatwaves. Style with braided leather slides and a woven raffia market tote for breezy weekend markets.",
    "bulletDetails": {
      "fabric": "100% Breathable European Washed Linen",
      "fit": "Relaxed fit-and-flare with elasticized sleeves",
      "length": "Midi length (44 inches)",
      "care": "Machine wash cold gentle; hang dry; steam lightly",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Natural Sand",
        "Blush Petal",
        "Terracotta Coral"
      ]
    },
    "sizeAndFitNote": "Generous cut through the hips with side pockets. Choose normal size.",
    "styleWith": [
      {
        "productId": "prod-bag-2",
        "productName": "Woven Raffia Summer Market Tote Bag",
        "reason": "Harmonizes natural resort materials"
      },
      {
        "productId": "prod-shoe-3",
        "productName": "Braided Leather Low Wedge Slides",
        "reason": "Adds understated coastal flair"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Oladimeji Odunsi",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@oladimeg",
        "alt": "Front view of puff sleeve linen summer sundress"
      },
      {
        "url": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sarah Dorweiler",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sarahdorweiler",
        "alt": "Detail view of woven European linen weave"
      },
      {
        "url": "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Pete Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@petebellis",
        "alt": "Sunny outdoor lifestyle wearing linen sundress"
      }
    ],
    "reviews": [
      {
        "id": "rev-d5-1",
        "author": "Fatima Garba",
        "location": "Kaduna South, Kaduna",
        "rating": 5,
        "date": "1 week ago",
        "title": "So cool in the afternoon sun",
        "comment": "Real linen that actually breathes! I love that the sleeves don't squeeze the arms and the pockets are deep enough for my phone."
      },
      {
        "id": "rev-d5-2",
        "author": "Bukola Adebiyi",
        "location": "Ikeja, Lagos",
        "rating": 4.7,
        "date": "2 weeks ago",
        "title": "Subtle blush shade",
        "comment": "The color is delicate and feminine. Great quality fabric and quick courier dispatch to my office."
      },
      {
        "id": "rev-d5-3",
        "author": "Chisom Obi",
        "location": "Enugu, Enugu State",
        "rating": 4.6,
        "date": "3 weeks ago",
        "title": "Relaxed and practical",
        "comment": "Very comfortable for everyday errands and weekend outings. Washes nicely without shrinking."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 32000,
        "originalPrice": 40000,
        "savings": 8000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 57600,
        "originalPrice": 64000,
        "savings": 6400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 80000,
        "originalPrice": 96000,
        "savings": 16000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Puff Sleeve Linen Summer Sundress",
    "shortBenefit": "Airy pure linen designed to keep you delightfully cool in tropical sun."
  },
  {
    "id": "prod-top-1",
    "name": "Pleated Flutter Sleeve Chiffon Blouse",
    "slug": "pleated-flutter-sleeve-chiffon-blouse",
    "tagline": "Airy micro-pleats with flutter sleeves that transition effortlessly from desk to dinner.",
    "headline": "Airy micro-pleats with flutter sleeves that transition effortlessly from desk to dinner.",
    "category": "Tops & Blouses",
    "startingPrice": 21500,
    "oldPrice": 27000,
    "rating": 4.8,
    "reviewCount": 19,
    "stockCount": 15,
    "description": "Upgrade your daytime workwear and weekend brunch ensembles with this flutter-sleeve chiffon blouse. Feathery micro accordion pleats cascade down the front bodice, paired with a delicate split neckline with gold hardware toggle ties. The lightweight georgette is opaque across the bust yet feather-light on the arms. Style effortlessly tucked into a high-waisted pencil skirt or paired with casual tailored shorts.",
    "bulletDetails": {
      "fabric": "100% Poly-Chiffon Georgette",
      "fit": "Relaxed fluid drape with flutter cap sleeves",
      "length": "Hip length (24 inches)",
      "care": "Machine wash cold delicate in mesh bag; line dry",
      "availableSizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "availableColors": [
        "Dusty Blush",
        "Warm Sand",
        "Sage Mist"
      ]
    },
    "sizeAndFitNote": "True to size with generous drape through the torso.",
    "styleWith": [
      {
        "productId": "prod-skirt-3",
        "productName": "High Waisted Tailored Pencil Skirt",
        "reason": "Creates a smart corporate silhouette"
      },
      {
        "productId": "prod-jewel-1",
        "productName": "Layered Hammered Gold Coin Pendant Necklace",
        "reason": "Accents the split neckline beautifully"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Gilles De Muynck",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@gillesdemuynck",
        "alt": "Front view of pleated flutter sleeve chiffon blouse"
      },
      {
        "url": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Alireza Dolati",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@alirezadolati",
        "alt": "Detail view of micro-pleated front chiffon panel"
      },
      {
        "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Lifestyle model wearing pleated flutter sleeve top"
      }
    ],
    "reviews": [
      {
        "id": "rev-t1-1",
        "author": "Funmi Dosunmu",
        "location": "Surulere, Lagos",
        "rating": 5,
        "date": "3 days ago",
        "title": "Perfect work blouse",
        "comment": "The flutter sleeves hide arm insecurities while remaining airy in Lagos traffic heat. Looks very expensive tucked into trousers."
      },
      {
        "id": "rev-t1-2",
        "author": "Mariam Danjuma",
        "location": "Wuse Zone 4, Abuja",
        "rating": 4.8,
        "date": "1 week ago",
        "title": "Soft pink color is very polite",
        "comment": "Excellent blouse for the office. Doesn't crease when tucked in all day."
      },
      {
        "id": "rev-t1-3",
        "author": "Gloria Umeh",
        "location": "Awka, Anambra",
        "rating": 4.7,
        "date": "2 weeks ago",
        "title": "Fast dispatch",
        "comment": "Arrived in Anambra within 3 days. POS payment on arrival worked smoothly."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 21500,
        "originalPrice": 26875,
        "savings": 5375,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 38700,
        "originalPrice": 43000,
        "savings": 4300,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 53750,
        "originalPrice": 64500,
        "savings": 10750,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Pleated Flutter Sleeve Chiffon Blouse",
    "shortBenefit": "Airy micro-pleats with flutter sleeves that transition effortlessly from desk to dinner."
  },
  {
    "id": "prod-top-2",
    "name": "Asymmetric Draped Satin Cowl Top",
    "slug": "asymmetric-draped-satin-cowl-top",
    "tagline": "Architectural satin draping tailored with subtle side ruching for after-dark luxury.",
    "headline": "Architectural satin draping tailored with subtle side ruching for after-dark luxury.",
    "category": "Tops & Blouses",
    "startingPrice": 24500,
    "oldPrice": 31000,
    "rating": 4.9,
    "reviewCount": 26,
    "stockCount": 12,
    "description": "Infuse instant sophistication into your evening wardrobe with this asymmetric satin cowl top. Cut on the bias to hug your curves without clinging, it features an elegant waterfall cowl neckline and one-shoulder architectural pleat. The heavyweight liquid satin catches candle and spotlight with a rich, molten sheen. Style with a bias-cut rose silk skirt or tailored wide-leg trousers for upscale dinner dates and cocktail soirées.",
    "bulletDetails": {
      "fabric": "97% Liquid Silk-Satin, 3% Spandex",
      "fit": "Bias-cut slim contour with draped cowl",
      "length": "Waist length (22 inches)",
      "care": "Hand wash cool with mild detergent; dry flat",
      "availableSizes": [
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16"
      ],
      "availableColors": [
        "Rose Gold Champagne",
        "Blush Pink",
        "Onyx Black"
      ]
    },
    "sizeAndFitNote": "Bias cut allows gentle natural stretch. Choose normal UK size.",
    "styleWith": [
      {
        "productId": "prod-skirt-1",
        "productName": "Bias Cut Rose Silk Midi Skirt",
        "reason": "Creates a seamless faux-dress evening look"
      },
      {
        "productId": "prod-jewel-3",
        "productName": "Twisted Chunky Statement Gold Cuff Bangle",
        "reason": "Adds contemporary high-shine drama"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Alex Perez",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@a2ephotography",
        "alt": "Front view of asymmetric draped satin cowl top"
      },
      {
        "url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Pete Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@petebellis",
        "alt": "Detail view of cowl drape and satin texture"
      },
      {
        "url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Ali Pazani",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@alipazani",
        "alt": "Lifestyle model wearing draped satin top"
      }
    ],
    "reviews": [
      {
        "id": "rev-t2-1",
        "author": "Dami Alabi",
        "location": "Lekki Phase 2, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "The neckline is so flattering!",
        "comment": "Wore this for anniversary dinner at RSVP in VI. The drape sits naturally and looks expensive under candlelight."
      },
      {
        "id": "rev-t2-2",
        "author": "Grace Bassey",
        "location": "Uyo, Akwa Ibom",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Quality satin that feels heavy",
        "comment": "Not cheap polyester satin that generates static. This has weight and falls like real silk."
      },
      {
        "id": "rev-t2-3",
        "author": "Ronke Thomas",
        "location": "Gwarinpa, Abuja",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Arrived exactly as pictured",
        "comment": "Packaging was neat and the color is identical to the photos."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 24500,
        "originalPrice": 30625,
        "savings": 6125,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 44100,
        "originalPrice": 49000,
        "savings": 4900,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 61250,
        "originalPrice": 73500,
        "savings": 12250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Asymmetric Draped Satin Cowl Top",
    "shortBenefit": "Architectural satin draping tailored with subtle side ruching for after-dark luxury."
  },
  {
    "id": "prod-top-3",
    "name": "Crisp Cotton Poplin Oversized Shirt",
    "slug": "crisp-cotton-poplin-oversized-shirt",
    "tagline": "Modern shirting tailored with dropped shoulders and architectural cuffs.",
    "headline": "Modern shirting tailored with dropped shoulders and architectural cuffs.",
    "category": "Tops & Blouses",
    "startingPrice": 26000,
    "oldPrice": 32500,
    "rating": 4.8,
    "reviewCount": 34,
    "stockCount": 16,
    "description": "A staple masterclass in effortless minimalism. Cut from 100% long-staple cotton poplin, this shirt offers crisp architectural structure that stays sharp throughout long working days. Features an elongated point collar, dropped shoulder seams, and extra-wide French-style buttoned cuffs with mother-of-pearl closures. Wear buttoned up for meetings, unbuttoned as an airy lightweight overshirt, or half-tucked into jeans.",
    "bulletDetails": {
      "fabric": "100% Long-Staple Compact Cotton Poplin",
      "fit": "Relaxed boyfriend oversized silhouette",
      "length": "Tunic length (29 inches)",
      "care": "Machine wash warm; hot iron or steam with starch",
      "availableSizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "availableColors": [
        "Crisp Cotton White",
        "Soft Pink Pinstripe",
        "Sky Blue"
      ]
    },
    "sizeAndFitNote": "Designed intentionally with an oversized fit. Take your true size.",
    "styleWith": [
      {
        "productId": "prod-shoe-1",
        "productName": "Pointed Toe Block Heel Suede Mules",
        "reason": "Balances relaxed shirting with pointed polish"
      },
      {
        "productId": "prod-bag-3",
        "productName": "Croc Embossed Baguette Clutch Bag",
        "reason": "Adds texture to monochrome cotton"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Nimble Made",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@nimblemade",
        "alt": "Front view of crisp cotton poplin oversized shirt"
      },
      {
        "url": "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Mariano Nocetti",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@marianonocetti",
        "alt": "Detail view of cotton collar and buttoned cuffs"
      },
      {
        "url": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80",
        "photographer": "NordWood Themes",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@nordwood",
        "alt": "Lifestyle look of relaxed oversized cotton shirt"
      }
    ],
    "reviews": [
      {
        "id": "rev-t3-1",
        "author": "Adaeze Anya",
        "location": "Yaba, Lagos",
        "rating": 5,
        "date": "6 days ago",
        "title": "Clean, crisp, and high density cotton",
        "comment": "Hard to find shirts in Nigeria that aren't cheap synthetic blends. This poplin is crisp and irons to perfection."
      },
      {
        "id": "rev-t3-2",
        "author": "Khadijah Sanusi",
        "location": "Kano City, Kano",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Great modest length",
        "comment": "Covers the hips generously which I appreciate. The dropped shoulder cut looks very chic."
      },
      {
        "id": "rev-t3-3",
        "author": "Toyin Fashola",
        "location": "Ilorin, Kwara",
        "rating": 4.7,
        "date": "1 month ago",
        "title": "Loved the mother of pearl buttons",
        "comment": "The button detailing is premium. Definitely buying another in the pinstripe color."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 26000,
        "originalPrice": 32500,
        "savings": 6500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 46800,
        "originalPrice": 52000,
        "savings": 5200,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 65000,
        "originalPrice": 78000,
        "savings": 13000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Crisp Cotton Poplin Oversized Shirt",
    "shortBenefit": "Modern shirting tailored with dropped shoulders and architectural cuffs."
  },
  {
    "id": "prod-top-4",
    "name": "Embroidered Lace Peplum Evening Blouse",
    "slug": "embroidered-lace-peplum-evening-blouse",
    "tagline": "Intricate floral corded lace contoured with a flared peplum waist for celebratory events.",
    "headline": "Intricate floral corded lace contoured with a flared peplum waist for celebratory events.",
    "category": "Tops & Blouses",
    "startingPrice": 34000,
    "oldPrice": 42000,
    "rating": 4.9,
    "reviewCount": 37,
    "stockCount": 8,
    "description": "A celebration of festive grandeur. Crafted from corded French guipure lace over an ultra-soft nude mesh lining, this peplum blouse features hand-finished scalloped edging along the neckline and cuffs. The structured flared peplum sculpts the waistline while skimming gracefully over hips. Pair with a coordinating high-waisted pencil skirt or satin palazzo trousers for church thanksgiving, christenings, and wedding guest duties.",
    "bulletDetails": {
      "fabric": "Corded Guipure Lace with Soft Viscose Tricot lining",
      "fit": "Contoured hourglass peplum with concealed back zip",
      "length": "Peplum hip length (25 inches)",
      "care": "Dry clean only to protect lace cords",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Blush Rose Lace",
        "Pure White",
        "Antique Gold"
      ]
    },
    "sizeAndFitNote": "Structured fit through the ribcage. Refer to bust measurement.",
    "styleWith": [
      {
        "productId": "prod-skirt-3",
        "productName": "High Waisted Tailored Pencil Skirt",
        "reason": "Complements the flared peplum proportion"
      },
      {
        "productId": "prod-jewel-4",
        "productName": "Crystal Embellished Chandelier Drop Earrings",
        "reason": "Adds sparkling radiance to intricate lace"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Front view of embroidered lace peplum blouse"
      },
      {
        "url": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Waldemar Brandt",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@waldemarbrandt67w",
        "alt": "Detail view of corded lace texture and scallops"
      },
      {
        "url": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Brooke Cagle",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@brookecagle",
        "alt": "Lifestyle look of elegant lace peplum blouse"
      }
    ],
    "reviews": [
      {
        "id": "rev-t4-1",
        "author": "Victoria Akpan",
        "location": "GRA, Port Harcourt",
        "rating": 5,
        "date": "5 days ago",
        "title": "Owambe ready in seconds",
        "comment": "The lace is heavy and substantial, not scratchy at all. Paired it with a satin skirt for a wedding and looked like a queen."
      },
      {
        "id": "rev-t4-2",
        "author": "Remi Olaleye",
        "location": "Ikeja GRA, Lagos",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "The peplum shape is stunning",
        "comment": "Hides the tummy area completely while giving a lovely hourglass waist. Very pleased."
      },
      {
        "id": "rev-t4-3",
        "author": "Hauwa Mohammed",
        "location": "Sokoto, Sokoto State",
        "rating": 4.8,
        "date": "1 month ago",
        "title": "Well lined and modest",
        "comment": "The nude lining is fully opaque so no underwear shows. Beautiful delivery packaging."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 34000,
        "originalPrice": 42500,
        "savings": 8500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 61200,
        "originalPrice": 68000,
        "savings": 6800,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 85000,
        "originalPrice": 102000,
        "savings": 17000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Embroidered Lace Peplum Evening Blouse",
    "shortBenefit": "Intricate floral corded lace contoured with a flared peplum waist for celebratory events."
  },
  {
    "id": "prod-skirt-1",
    "name": "Bias Cut Rose Silk Midi Skirt",
    "slug": "bias-cut-rose-silk-midi-skirt",
    "tagline": "Liquid drape that moves like water, cut on the bias for effortless fluidity.",
    "headline": "Liquid drape that moves like water, cut on the bias for effortless fluidity.",
    "category": "Skirts",
    "startingPrice": 28000,
    "oldPrice": 35000,
    "rating": 4.9,
    "reviewCount": 33,
    "stockCount": 13,
    "description": "The quintessential capsule wardrobe foundation. Cut entirely on the bias from heavy silk-blend charmeuse, this rose midi skirt glides over the hips and flares into a soft fluted hem. Featuring a concealed elasticized waistband that sits smoothly against the skin without digging in. Style down for sunny daytime outings with our crisp poplin shirt or elevate for nighttime with an asymmetric satin cowl top.",
    "bulletDetails": {
      "fabric": "95% Heavyweight Silk Charmeuse, 5% Spandex",
      "fit": "Bias-cut fluid contour with subtle fluted hem",
      "length": "Midi length (34 inches from waist)",
      "care": "Hand wash cool; steam on low or hang in steamy bathroom",
      "availableSizes": [
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Dusty Rose",
        "Champagne Nude",
        "Midnight Black"
      ]
    },
    "sizeAndFitNote": "Bias cut expands naturally across curves without bunching.",
    "styleWith": [
      {
        "productId": "prod-top-2",
        "productName": "Asymmetric Draped Satin Cowl Top",
        "reason": "Creates a seamless coordinated evening set"
      },
      {
        "productId": "prod-shoe-1",
        "productName": "Pointed Toe Block Heel Suede Mules",
        "reason": "Adds contemporary sleek footwear contrast"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Philipp Arntz",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@philipparntz",
        "alt": "Front view of bias cut rose silk midi skirt"
      },
      {
        "url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Devon Divine",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@devondivine",
        "alt": "Detail view of liquid silk drape and fluted hem"
      },
      {
        "url": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Brooke Cagle",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@brookecagle",
        "alt": "Lifestyle model wearing rose silk midi skirt"
      }
    ],
    "reviews": [
      {
        "id": "rev-s1-1",
        "author": "Eseosa Ighodaro",
        "location": "Benin City, Edo",
        "rating": 5,
        "date": "4 days ago",
        "title": "Glides like real silk!",
        "comment": "The cut on this skirt is perfection. Doesn't cling uncomfortably to the rear and moves so gracefully when you walk."
      },
      {
        "id": "rev-s1-2",
        "author": "Nneka Okoli",
        "location": "Enugu, Enugu State",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Versatile staple",
        "comment": "I have styled this with sneakers and a t-shirt, and with heels for church. Excellent value for money."
      },
      {
        "id": "rev-s1-3",
        "author": "Bisi Ogundimu",
        "location": "Magodo, Lagos",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Waistband is very comfortable",
        "comment": "The hidden elastic band sits flat without rolling over. Very neat finishing."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 28000,
        "originalPrice": 35000,
        "savings": 7000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 50400,
        "originalPrice": 56000,
        "savings": 5600,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 70000,
        "originalPrice": 84000,
        "savings": 14000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Bias Cut Rose Silk Midi Skirt",
    "shortBenefit": "Liquid drape that moves like water, cut on the bias for effortless fluidity."
  },
  {
    "id": "prod-skirt-2",
    "name": "Pleated Metallic Sunray Maxi Skirt",
    "slug": "pleated-metallic-sunray-maxi-skirt",
    "tagline": "Dramatic metallic shimmer woven into permanent sunray pleats for glamorous entrances.",
    "headline": "Dramatic metallic shimmer woven into permanent sunray pleats for glamorous entrances.",
    "category": "Skirts",
    "startingPrice": 36000,
    "oldPrice": 45000,
    "rating": 4.8,
    "reviewCount": 28,
    "stockCount": 10,
    "description": "Capture the golden hour glow in every room. Crafted with an iridescent metallic foil finish on high-density pleated crepe, this sunray maxi skirt features knife-edge pleats that catch ambient light with radiant warmth. The high-rise elasticized velvet waistband provides comfortable support while keeping the silhouette streamlined. Style with stiletto heels and chunky statement gold cuff bangles for memorable galas and celebrations.",
    "bulletDetails": {
      "fabric": "Woven Metallic Lurex Crepe with Silk-Touch Tricot lining",
      "fit": "Full A-line sunray pleat maxi with elastic waist",
      "length": "Maxi length (40 inches from waist)",
      "care": "Spot clean or gentle hand wash; hang to preserve pleat memory",
      "availableSizes": [
        "S/M (UK 8-12)",
        "L/XL (UK 14-18)"
      ],
      "availableColors": [
        "Champagne Gold",
        "Rose Bronze",
        "Sterling Platinum"
      ]
    },
    "sizeAndFitNote": "Velvet elastic waistband stretches comfortably across 2 UK size ranges.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Amplifies the gilded metallic reflections"
      },
      {
        "productId": "prod-jewel-3",
        "productName": "Twisted Chunky Statement Gold Cuff Bangle",
        "reason": "Adds sculptural arm jewelry balance"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Front view of pleated metallic sunray maxi skirt"
      },
      {
        "url": "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Philipp Arntz",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@philipparntz",
        "alt": "Detail view of shimmering sunray accordion pleats"
      },
      {
        "url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Apostolos Vamvouras",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@apostolosvamvouras",
        "alt": "Lifestyle model wearing metallic pleated skirt"
      }
    ],
    "reviews": [
      {
        "id": "rev-s2-1",
        "author": "Zubaida Bello",
        "location": "Kano, Kano State",
        "rating": 5,
        "date": "1 week ago",
        "title": "The shimmer is breathtaking!",
        "comment": "Wore this to a wedding dinner at Bristol Palace Kano. It catches the light like molten gold and swirls majestically."
      },
      {
        "id": "rev-s2-2",
        "author": "Kofo Oshodi",
        "location": "Victoria Island, Lagos",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Comfortable velvet waist",
        "comment": "The velvet band doesn't pinch or itch. Fabric is lined completely to the hem."
      },
      {
        "id": "rev-s2-3",
        "author": "Stephanie Akpabio",
        "location": "Uyo, Akwa Ibom",
        "rating": 4.7,
        "date": "1 month ago",
        "title": "Pleats hold their structure",
        "comment": "Good quality pleating. Arrived neatly packaged in a protective box."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 36000,
        "originalPrice": 45000,
        "savings": 9000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 64800,
        "originalPrice": 72000,
        "savings": 7200,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 90000,
        "originalPrice": 108000,
        "savings": 18000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Pleated Metallic Sunray Maxi Skirt",
    "shortBenefit": "Dramatic metallic shimmer woven into permanent sunray pleats for glamorous entrances."
  },
  {
    "id": "prod-skirt-3",
    "name": "High Waisted Tailored Pencil Skirt",
    "slug": "high-waisted-tailored-pencil-skirt",
    "tagline": "Contoured executive tailoring with a discrete back kick pleat for effortless stride.",
    "headline": "Contoured executive tailoring with a discrete back kick pleat for effortless stride.",
    "category": "Skirts",
    "startingPrice": 24000,
    "oldPrice": 30000,
    "rating": 4.9,
    "reviewCount": 39,
    "stockCount": 17,
    "description": "Architectural precision designed for the modern businesswoman. Cut from dense bi-stretch compact crepe, this high-waisted pencil skirt hugs your waist and hips with smoothing compression while the discrete back overlap vent allows natural stride and car boarding. Finished with a curved wide waistband and invisible back zipper. Seamlessly pairs with flutter-sleeve blouses or crisp poplin shirts for executive presence.",
    "bulletDetails": {
      "fabric": "70% Rayon, 26% Nylon, 4% Spandex Compact Double-Knit",
      "fit": "Sculpted pencil fit with back kick pleat",
      "length": "Knee length (27 inches)",
      "care": "Machine wash cold delicate; warm iron on reverse",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18",
        "UK 20"
      ],
      "availableColors": [
        "Tailored Black",
        "Blush Pink",
        "Corporate Navy"
      ]
    },
    "sizeAndFitNote": "Substantial stretch crepe holds everything smooth. Fits true to UK size.",
    "styleWith": [
      {
        "productId": "prod-top-1",
        "productName": "Pleated Flutter Sleeve Chiffon Blouse",
        "reason": "Softens executive lines with airy feminine movement"
      },
      {
        "productId": "prod-shoe-1",
        "productName": "Pointed Toe Block Heel Suede Mules",
        "reason": "All-day comfort with polished workplace dignity"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Front view of high waisted tailored pencil skirt"
      },
      {
        "url": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "NordWood Themes",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@nordwood",
        "alt": "Detail view of wide contoured waistband and rear vent"
      },
      {
        "url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Christina @ wocintechchat",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@wocintechchat",
        "alt": "Executive corporate look wearing high waisted pencil skirt"
      }
    ],
    "reviews": [
      {
        "id": "rev-s3-1",
        "author": "Barrister Adaeze Peters",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "3 days ago",
        "title": "Holds shape all day in court",
        "comment": "The compact knit fabric has just the right amount of hold. Doesn't ride up when walking or sitting. An essential work piece."
      },
      {
        "id": "rev-s3-2",
        "author": "Folake Bakare",
        "location": "Ibadan, Oyo State",
        "rating": 4.9,
        "date": "1 week ago",
        "title": "Generous curve cut",
        "comment": "Finally a pencil skirt tailored for Nigerian hips! The waist doesn't gap while the hips fit smoothly."
      },
      {
        "id": "rev-s3-3",
        "author": "Zainab Bello",
        "location": "Kaduna, Kaduna State",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Smooth waistband",
        "comment": "Very flattering wide waistband that flattens the tummy nicely."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 24000,
        "originalPrice": 30000,
        "savings": 6000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 43200,
        "originalPrice": 48000,
        "savings": 4800,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 60000,
        "originalPrice": 72000,
        "savings": 12000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "High Waisted Tailored Pencil Skirt",
    "shortBenefit": "Contoured executive tailoring with a discrete back kick pleat for effortless stride."
  },
  {
    "id": "prod-ankara-1",
    "name": "Vibrant Ankara Peplum Mermaid Gown",
    "slug": "vibrant-ankara-peplum-mermaid-gown",
    "tagline": "Architectural flared peplum crafted from 100% authentic vibrant African wax cotton.",
    "headline": "Architectural flared peplum crafted from 100% authentic vibrant African wax cotton.",
    "category": "Ankara & African Prints",
    "startingPrice": 52000,
    "oldPrice": 65000,
    "rating": 5,
    "reviewCount": 46,
    "stockCount": 8,
    "description": "A triumphant celebration of African heritage and contemporary red-carpet glamour. Crafted from authentic 100% premium African wax block print cotton, this gown features an architectural structured peplum with horsehair braid hem reinforcement and a sweeping mermaid flare. Fully lined with breathable cotton lining to maintain cool comfort through long celebrations. Complete the show-stopping Owambe look with metallic heels and handcrafted gold jewelry.",
    "bulletDetails": {
      "fabric": "100% Authentic Dutch Wax Print Cotton; Pure cotton lining",
      "fit": "Sculpted corset bodice with flared peplum & mermaid hem",
      "length": "Floor length (60 inches)",
      "care": "Hand wash cold with mild bar soap; do not bleach; hot iron on reverse",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18",
        "UK 20"
      ],
      "availableColors": [
        "Royal Indigo & Gold Wax",
        "Sunset Tangerine Wax",
        "Emerald Coral Wax"
      ]
    },
    "sizeAndFitNote": "Authentic wax cotton has minimal stretch. Follow exact bust & waist measurements.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Elevates floor-skimming mermaid hem with festive height"
      },
      {
        "productId": "prod-jewel-3",
        "productName": "Twisted Chunky Statement Gold Cuff Bangle",
        "reason": "Harmonizes with traditional African jewelry aesthetics"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Prince Akachi",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@princeakachi",
        "alt": "Front view of vibrant Ankara peplum mermaid gown"
      },
      {
        "url": "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Kassia Karr",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@kassiakarr",
        "alt": "Detail view of authentic African wax cotton block pattern"
      },
      {
        "url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Houcine Ncib",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@houcinencib",
        "alt": "Lifestyle model wearing regal Ankara mermaid gown"
      }
    ],
    "reviews": [
      {
        "id": "rev-a1-1",
        "author": "Chief Mrs. Adenike Adeleke",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "2 days ago",
        "title": "Turned every single head at the wedding!",
        "comment": "Wore this to a traditional engagement at Landmark Event Centre. The peplum has real structure and the wax print colors are rich and vibrant. Authentic African craftsmanship."
      },
      {
        "id": "rev-a1-2",
        "author": "Faith Okonjo",
        "location": "Asokoro, Abuja",
        "rating": 5,
        "date": "1 week ago",
        "title": "Lining makes it super comfortable",
        "comment": "Unlike many tailor-made Ankara outfits with itchy inner seams, this is fully lined with soft breathable cotton. Worth every Naira."
      },
      {
        "id": "rev-a1-3",
        "author": "Chiamaka Eze",
        "location": "Enugu, Enugu State",
        "rating": 4.9,
        "date": "3 weeks ago",
        "title": "Flawless doorstep delivery",
        "comment": "Courier brought it to my door in Independence Layout. Pos payment was effortless."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 52000,
        "originalPrice": 65000,
        "savings": 13000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 93600,
        "originalPrice": 104000,
        "savings": 10400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 130000,
        "originalPrice": 156000,
        "savings": 26000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Vibrant Ankara Peplum Mermaid Gown",
    "shortBenefit": "Architectural flared peplum crafted from 100% authentic vibrant African wax cotton."
  },
  {
    "id": "prod-ankara-2",
    "name": "Modern Batik Print Shirt Dress",
    "slug": "modern-batik-print-shirt-dress",
    "tagline": "Hand-dyed artisanal batik motifs tailored into an effortless belted shirt dress.",
    "headline": "Hand-dyed artisanal batik motifs tailored into an effortless belted shirt dress.",
    "category": "Ankara & African Prints",
    "startingPrice": 38000,
    "oldPrice": 46000,
    "rating": 4.8,
    "reviewCount": 30,
    "stockCount": 11,
    "description": "Where heritage textile art meets modern cosmopolitan ease. Tailored from hand-stamped wax batik cotton in rich earthy tones, this shirt dress features an elongated camp collar, cuffed dolman sleeves, and a removable self-tie fabric belt. Functional side seam pockets and a curved shirt hem make it an everyday go-to for art galleries, creative workplaces, and weekend socializing.",
    "bulletDetails": {
      "fabric": "100% Hand-Dyed Artisanal Batik Cotton",
      "fit": "Relaxed shirt dress with detachable sash belt",
      "length": "Midi length (46 inches)",
      "care": "Cold hand wash with mild detergent; dry in shade",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Indigo Clay Batik",
        "Ochre Sunburst",
        "Emerald Olive"
      ]
    },
    "sizeAndFitNote": "Belt allows complete waist customization. Fits true to size.",
    "styleWith": [
      {
        "productId": "prod-shoe-3",
        "productName": "Braided Leather Low Wedge Slides",
        "reason": "Complements handcrafted artisanal motifs"
      },
      {
        "productId": "prod-bag-2",
        "productName": "Woven Raffia Summer Market Tote Bag",
        "reason": "Adds organic natural resort texture"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Apostolos Vamvouras",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@apostolosvamvouras",
        "alt": "Front view of modern batik print shirt dress"
      },
      {
        "url": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Annie Spratt",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@anniespratt",
        "alt": "Detail view of artisanal batik wax resist motifs"
      },
      {
        "url": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Warren Wong",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@warrenwong",
        "alt": "Lifestyle look of modern African batik shirt dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-a2-1",
        "author": "Dr. Funmi Alakija",
        "location": "Lekki, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "Artistic and extremely chic",
        "comment": "I love supporting authentic batik. The motifs are gorgeous and the cotton is soft yet holds its shape. Very stylish."
      },
      {
        "id": "rev-a2-2",
        "author": "Amina Sani",
        "location": "Zaria, Kaduna",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Love the pockets!",
        "comment": "Pockets are deep and practical. The belt lets you cinch the waist as snug as you want."
      },
      {
        "id": "rev-a2-3",
        "author": "Chinyere Ndukwe",
        "location": "Owerri, Imo State",
        "rating": 4.7,
        "date": "1 month ago",
        "title": "Breathes well in hot afternoons",
        "comment": "Very comfortable for Nigerian heat. Prompt customer service when I needed a size confirmation."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 38000,
        "originalPrice": 47500,
        "savings": 9500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 68400,
        "originalPrice": 76000,
        "savings": 7600,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 95000,
        "originalPrice": 114000,
        "savings": 19000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Modern Batik Print Shirt Dress",
    "shortBenefit": "Hand-dyed artisanal batik motifs tailored into an effortless belted shirt dress."
  },
  {
    "id": "prod-ankara-3",
    "name": "Kente Accent Fit and Flare Midi",
    "slug": "kente-accent-fit-and-flare-midi",
    "tagline": "Geometric royal Kente borders woven into a classic feminine fit-and-flare silhouette.",
    "headline": "Geometric royal Kente borders woven into a classic feminine fit-and-flare silhouette.",
    "category": "Ankara & African Prints",
    "startingPrice": 44000,
    "oldPrice": 55000,
    "rating": 4.9,
    "reviewCount": 35,
    "stockCount": 9,
    "description": "Honor royal West African heritage with everyday grace. This fit-and-flare midi dress integrates authentic woven Kente pattern borders along the jewel neckline, waist yoke, and full flared hem. The structured wax cotton holds its regal A-line shape throughout the day, while hidden side pockets add welcome modern practicality. Style with stiletto sandals and hammered gold coin pendants for church anniversaries and societal gatherings.",
    "bulletDetails": {
      "fabric": "100% High-Grade African Wax Cotton with Woven Kente Trims",
      "fit": "Tailored bodice with pleated flare A-line skirt",
      "length": "Midi length (48 inches)",
      "care": "Hand wash cold; line dry in shade; hot iron",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Royal Gold & Crimson",
        "Indigo Blue & Ochre"
      ]
    },
    "sizeAndFitNote": "Fitted through the ribcage with flare over the hips. True to size.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Gold tones accent the royal Kente borders"
      },
      {
        "productId": "prod-jewel-1",
        "productName": "Layered Hammered Gold Coin Pendant Necklace",
        "reason": "Completes regal cultural elegance"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Oladimeji Odunsi",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@oladimeg",
        "alt": "Front view of Kente accent fit and flare midi dress"
      },
      {
        "url": "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Ebun Oluwole",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@ebunoluwole",
        "alt": "Detail view of woven Kente border motif and pleating"
      },
      {
        "url": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Gift Habeshaw",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@gifthabeshaw",
        "alt": "Celebratory outdoor look wearing Kente accent midi dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-a3-1",
        "author": "Khadija Abdullahi",
        "location": "Katsina, Katsina State",
        "rating": 5,
        "date": "5 days ago",
        "title": "Regal and modest",
        "comment": "Wore this for Eid celebration and received endless compliments. The Kente accents are woven sharply with vibrant gold threads."
      },
      {
        "id": "rev-a3-2",
        "author": "Tola Oladipo",
        "location": "Ibadan, Oyo State",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Great flare and spin",
        "comment": "The skirt has substantial body. Beautiful tailoring and very neat hemline."
      },
      {
        "id": "rev-a3-3",
        "author": "Ifeoma Nwankwo",
        "location": "Awka, Anambra",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Swift doorstep delivery",
        "comment": "Came in 3 days with doorstep POS payment. The fit around the bust and waist is spot on."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 44000,
        "originalPrice": 55000,
        "savings": 11000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 79200,
        "originalPrice": 88000,
        "savings": 8800,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 110000,
        "originalPrice": 132000,
        "savings": 22000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Kente Accent Fit and Flare Midi",
    "shortBenefit": "Geometric royal Kente borders woven into a classic feminine fit-and-flare silhouette."
  },
  {
    "id": "prod-ankara-4",
    "name": "Multi Tonal Ankara Infinity Wrap Maxi",
    "slug": "multi-tonal-ankara-infinity-wrap-maxi",
    "tagline": "Endless styling possibilities with multi-way wrap sashes in vibrant wax cotton.",
    "headline": "Endless styling possibilities with multi-way wrap sashes in vibrant wax cotton.",
    "category": "Ankara & African Prints",
    "startingPrice": 48000,
    "oldPrice": 60000,
    "rating": 4.9,
    "reviewCount": 39,
    "stockCount": 7,
    "description": "One breathtaking dress, more than ten distinct silhouettes. Tailored from premium multi-tonal Ankara wax cotton, this infinity maxi dress features extended, versatile fabric straps that can be styled as a halter neck, cross-back, one-shoulder, capped sleeve, or strapless sweetheart. An elasticated back waist ensures a snug fit while the flowing floor-length circle skirt creates majestic drama with every step.",
    "bulletDetails": {
      "fabric": "100% Genuine African Wax Print Cotton with elastic back panel",
      "fit": "Multi-way infinity wrap bodice with full circle maxi skirt",
      "length": "Full floor length (58 inches)",
      "care": "Hand wash cold; hang dry; hot iron on reverse",
      "availableSizes": [
        "Size 1 (UK 8-12)",
        "Size 2 (UK 14-18)",
        "Size 3 (UK 20-22)"
      ],
      "availableColors": [
        "Sunset Coral & Teal Wax",
        "Royal Purple & Gold Wax"
      ]
    },
    "sizeAndFitNote": "Infinity ties adapt to any bust size and shape effortlessly.",
    "styleWith": [
      {
        "productId": "prod-bag-1",
        "productName": "Structured Quilted Rose Leather Shoulder Bag",
        "reason": "Provides refined contrasting texture"
      },
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Lengthens silhouette under voluminous circle skirt"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Burgess Milner",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@burgessmilner",
        "alt": "Front view of multi tonal Ankara infinity wrap maxi"
      },
      {
        "url": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sarah Dorweiler",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sarahdorweiler",
        "alt": "Detail view of multi-tonal African wax print cotton"
      },
      {
        "url": "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Lifestyle model wearing infinity wrap maxi dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-a4-1",
        "author": "Ronke Doherty",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "1 week ago",
        "title": "I have styled this 4 different ways already!",
        "comment": "Wore it one-shoulder for an engagement and halter for a dinner party. The cotton is vibrant and does not bleed when washed. Outstanding!"
      },
      {
        "id": "rev-a4-2",
        "author": "Amina Jibril",
        "location": "Abuja (FCT)",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Amazing volume in the skirt",
        "comment": "Full circle skirt with real weight to it. Feels luxurious and regal."
      },
      {
        "id": "rev-a4-3",
        "author": "Chidera Obi",
        "location": "Owerri, Imo State",
        "rating": 4.8,
        "date": "1 month ago",
        "title": "Very fast nationwide delivery",
        "comment": "Received my parcel in Imo within 3 days. Loved the pay on delivery convenience."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 48000,
        "originalPrice": 60000,
        "savings": 12000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 86400,
        "originalPrice": 96000,
        "savings": 9600,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 120000,
        "originalPrice": 144000,
        "savings": 24000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Multi Tonal Ankara Infinity Wrap Maxi",
    "shortBenefit": "Endless styling possibilities with multi-way wrap sashes in vibrant wax cotton."
  },
  {
    "id": "prod-coord-1",
    "name": "Relaxed Linen Blend Two Piece Set",
    "slug": "relaxed-linen-blend-two-piece-set",
    "tagline": "Effortless resort chic featuring wide-leg trousers and a coordinating sleeveless vest.",
    "headline": "Effortless resort chic featuring wide-leg trousers and a coordinating sleeveless vest.",
    "category": "Co-ord Sets",
    "startingPrice": 42000,
    "oldPrice": 52000,
    "rating": 4.9,
    "reviewCount": 32,
    "stockCount": 10,
    "description": "The epitome of relaxed coastal sophistication. Tailored from a breathable European flax linen and viscose blend, this matching set includes an architectural button-front waistcoat vest with a curved hem and high-waisted wide-leg trousers with an elasticized back waistband. The natural drape prevents rigid stiffness while keeping you delightfully cool in warm weather. Wear as a matching duo or mix-and-match effortlessly with the rest of your wardrobe.",
    "bulletDetails": {
      "fabric": "55% Pure Linen, 45% Breathable Viscose",
      "fit": "Tailored vest with relaxed high-waisted wide-leg trousers",
      "length": "Trousers: 42 inches outseam; Vest: 21 inches",
      "care": "Cold gentle wash; line dry; warm iron or steam",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Oatmeal Blush",
        "Warm Sand",
        "Sage Green"
      ]
    },
    "sizeAndFitNote": "Elasticated back waistband allows comfortable flexibility after lunch.",
    "styleWith": [
      {
        "productId": "prod-shoe-3",
        "productName": "Braided Leather Low Wedge Slides",
        "reason": "Maintains natural resort ease"
      },
      {
        "productId": "prod-bag-2",
        "productName": "Woven Raffia Summer Market Tote Bag",
        "reason": "Completes the breezy weekend ensemble"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Front view of relaxed linen blend two piece set"
      },
      {
        "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Pete Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@petebellis",
        "alt": "Detail view of tortoiseshell buttons and linen texture"
      },
      {
        "url": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Freestocks",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@freestocks",
        "alt": "Lifestyle look of relaxed linen matching set"
      }
    ],
    "reviews": [
      {
        "id": "rev-c1-1",
        "author": "Zainab Al-Hassan",
        "location": "Maitama, Abuja",
        "rating": 5,
        "date": "3 days ago",
        "title": "Chicest set in my closet",
        "comment": "The waistcoat fits like a dream and the trousers fall with such elegance. Perfect for casual meetings and Sunday brunch."
      },
      {
        "id": "rev-c1-2",
        "author": "Bukky Ajayi",
        "location": "Lekki, Lagos",
        "rating": 4.9,
        "date": "1 week ago",
        "title": "Real linen blend that doesn't itch",
        "comment": "Soft against the skin and very breathable. The oatmeal blush color is subtle and gorgeous."
      },
      {
        "id": "rev-c1-3",
        "author": "Nkiru Okafor",
        "location": "Enugu, Enugu State",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Great versatility",
        "comment": "Have already worn the trousers with a white tee and the vest with jeans. Love it."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 42000,
        "originalPrice": 52500,
        "savings": 10500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 75600,
        "originalPrice": 84000,
        "savings": 8400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 105000,
        "originalPrice": 126000,
        "savings": 21000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Relaxed Linen Blend Two Piece Set",
    "shortBenefit": "Effortless resort chic featuring wide-leg trousers and a coordinating sleeveless vest."
  },
  {
    "id": "prod-coord-2",
    "name": "Printed Silk Kimono and Trouser Set",
    "slug": "printed-silk-kimono-and-trouser-set",
    "tagline": "Opulent botanical prints on lustrous silk satin for elevated lounge and evening glamour.",
    "headline": "Opulent botanical prints on lustrous silk satin for elevated lounge and evening glamour.",
    "category": "Co-ord Sets",
    "startingPrice": 48500,
    "oldPrice": 59000,
    "rating": 5,
    "reviewCount": 27,
    "stockCount": 8,
    "description": "Indulge in unapologetic luxury. Spun from high-density silk-touch satin printed with painterly botanical florals, this matching set features a flowing open-front kimono robe with wide bell sleeves and coordinating straight-leg palazzo trousers with an elasticized drawstring waist. Contrast ivory piping along the lapels and cuffs adds refined tailoring detail. Wear with metallic heels for evening soirées or slip into mules for intimate hosting.",
    "bulletDetails": {
      "fabric": "96% High-Twist Silk Satin, 4% Elastane",
      "fit": "Relaxed flowing kimono robe with straight-leg trousers",
      "length": "Kimono: 32 inches; Trousers: 42 inches outseam",
      "care": "Hand wash cool with gentle silk detergent; line dry",
      "availableSizes": [
        "S/M (UK 8-12)",
        "L/XL (UK 14-18)"
      ],
      "availableColors": [
        "Blush Botanical Print",
        "Emerald Garden",
        "Midnight Floral"
      ]
    },
    "sizeAndFitNote": "Fluid relaxed silhouette that flatters all body types gracefully.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Elevates flowing silk trousers for dinner events"
      },
      {
        "productId": "prod-jewel-3",
        "productName": "Twisted Chunky Statement Gold Cuff Bangle",
        "reason": "Complements wide kimono bell sleeves"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Dom Hill",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@domhill",
        "alt": "Front view of printed silk kimono and trouser set"
      },
      {
        "url": "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Hanna Morris",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@hannamorris",
        "alt": "Detail view of contrast piping and botanical silk sheen"
      },
      {
        "url": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "NordWood Themes",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@nordwood",
        "alt": "Lifestyle model relaxing in printed silk kimono set"
      }
    ],
    "reviews": [
      {
        "id": "rev-c2-1",
        "author": "Hauwa Aliyu",
        "location": "Kano, Kano State",
        "rating": 5,
        "date": "2 days ago",
        "title": "Pure opulence!",
        "comment": "Wore this to host family during the holidays. The fabric feels like real silk and the piping is so neat and crisp. Everyone asked where I bought it."
      },
      {
        "id": "rev-c2-2",
        "author": "Dolapo Adeleke",
        "location": "Victoria Island, Lagos",
        "rating": 5,
        "date": "1 week ago",
        "title": "Incredible evening set",
        "comment": "Styled with strappy metallic sandals and gold jewelry for a private dinner party. Felt like a million dollars."
      },
      {
        "id": "rev-c2-3",
        "author": "Chinyere Nwosu",
        "location": "Port Harcourt, Rivers",
        "rating": 4.9,
        "date": "3 weeks ago",
        "title": "Prompt delivery to PH",
        "comment": "Delivery came directly to my home in GRA. POS on delivery is so reassuring."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 48500,
        "originalPrice": 60625,
        "savings": 12125,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 87300,
        "originalPrice": 97000,
        "savings": 9700,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 121250,
        "originalPrice": 145500,
        "savings": 24250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Printed Silk Kimono and Trouser Set",
    "shortBenefit": "Opulent botanical prints on lustrous silk satin for elevated lounge and evening glamour."
  },
  {
    "id": "prod-coord-3",
    "name": "Ribbed Knit Crop and Midi Set",
    "slug": "ribbed-knit-crop-and-midi-set",
    "tagline": "Sculpting viscose micro-rib knit that contours curves with comfortable flex.",
    "headline": "Sculpting viscose micro-rib knit that contours curves with comfortable flex.",
    "category": "Co-ord Sets",
    "startingPrice": 35000,
    "oldPrice": 44000,
    "rating": 4.8,
    "reviewCount": 31,
    "stockCount": 12,
    "description": "The ultimate harmony of comfort and contoured elegance. Knitted from breathable high-twist viscose micro-rib yarn, this two-piece set pairs a sleeveless boat-neck crop top with a high-waisted midi skirt featuring a discreet side thigh slit. The fine vertical ribbing visually elongates your frame while providing four-way stretch that moves with you effortlessly. Pair with flatform sandals for casual days or pointed mules for chic casual Fridays.",
    "bulletDetails": {
      "fabric": "80% Breathable Viscose Yarn, 20% Nylon Micro-Rib",
      "fit": "Form-fitting sculpted stretch contour",
      "length": "Skirt: 33 inches; Top: 16 inches",
      "care": "Hand wash cold; lay flat to dry to preserve rib memory",
      "availableSizes": [
        "S (UK 6-8)",
        "M (UK 10-12)",
        "L (UK 14-16)",
        "XL (UK 18)"
      ],
      "availableColors": [
        "Dusty Blush Rose",
        "Warm Cocoa",
        "Onyx Black"
      ]
    },
    "sizeAndFitNote": "Generous stretch that holds its shape without bagging out.",
    "styleWith": [
      {
        "productId": "prod-shoe-4",
        "productName": "Cushioned Leather Minimal Flatform Sandals",
        "reason": "Maintains clean, modern casual lines"
      },
      {
        "productId": "prod-bag-4",
        "productName": "Minimalist Pebbled Leather Crossbody Bag",
        "reason": "Adds easy hands-free everyday utility"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Dom Hill",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@domhill",
        "alt": "Front view of ribbed knit crop and midi set"
      },
      {
        "url": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Detail view of fine vertical micro-ribbing and side slit"
      },
      {
        "url": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Alex Perez",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@a2ephotography",
        "alt": "Lifestyle look of sculpted ribbed knit two-piece"
      }
    ],
    "reviews": [
      {
        "id": "rev-c3-1",
        "author": "Tariere Briggs",
        "location": "Port Harcourt, Rivers",
        "rating": 5,
        "date": "4 days ago",
        "title": "Cinches and flatters everything!",
        "comment": "The knit is substantial enough that panty lines don't show, but breathable enough for warm weather. Super flattering on curves."
      },
      {
        "id": "rev-c3-2",
        "author": "Sade Adeleke",
        "location": "Ikeja, Lagos",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Crop top length is just right",
        "comment": "The crop meets the high-waisted skirt perfectly with only a sliver of skin showing. Very tasteful."
      },
      {
        "id": "rev-c3-3",
        "author": "Zainab Mohammed",
        "location": "Garki, Abuja",
        "rating": 4.7,
        "date": "3 weeks ago",
        "title": "Fast dispatch",
        "comment": "Came in 2 business days. Very happy with the quality."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 35000,
        "originalPrice": 43750,
        "savings": 8750,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 63000,
        "originalPrice": 70000,
        "savings": 7000,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 87500,
        "originalPrice": 105000,
        "savings": 17500,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Ribbed Knit Crop and Midi Set",
    "shortBenefit": "Sculpting viscose micro-rib knit that contours curves with comfortable flex."
  },
  {
    "id": "prod-coord-4",
    "name": "Tailored Tweed Vest and Short Set",
    "slug": "tailored-tweed-vest-and-short-set",
    "tagline": "Parisian sophistication reimagined in lightweight bouclé with gold crest buttons.",
    "headline": "Parisian sophistication reimagined in lightweight bouclé with gold crest buttons.",
    "category": "Co-ord Sets",
    "startingPrice": 39000,
    "oldPrice": 48000,
    "rating": 4.9,
    "reviewCount": 24,
    "stockCount": 9,
    "description": "Classic prep meets contemporary high fashion. Tailored from a featherlight, unlined cotton bouclé tweed engineered specifically for tropical climates, this set features a fitted waistcoat vest accented with embossed gold coin buttons and matching tailored high-waisted shorts with a zip fly and slant pockets. Wear buttoned up over bare skin or styled unbuttoned with a silk cami underneath.",
    "bulletDetails": {
      "fabric": "Cotton-Blend Lightweight Bouclé Tweed with Satin Binding",
      "fit": "Tailored waistcoat with structured high-waisted A-line shorts",
      "length": "Vest: 20 inches; Shorts: 16 inches outseam",
      "care": "Dry clean or gentle hand wash inside out",
      "availableSizes": [
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16"
      ],
      "availableColors": [
        "Pastel Rose Tweed",
        "Ivory Cream Tweed",
        "Sky Blue Tweed"
      ]
    },
    "sizeAndFitNote": "Tailored fit through the waist and hips. Order your usual dress size.",
    "styleWith": [
      {
        "productId": "prod-shoe-1",
        "productName": "Pointed Toe Block Heel Suede Mules",
        "reason": "Adds polished Parisian city chic"
      },
      {
        "productId": "prod-bag-3",
        "productName": "Croc Embossed Baguette Clutch Bag",
        "reason": "Complements rich textured bouclé"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Front view of tailored tweed vest and short set"
      },
      {
        "url": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Waldemar Brandt",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@waldemarbrandt67w",
        "alt": "Detail view of gold crest buttons and bouclé weave"
      },
      {
        "url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Pete Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@petebellis",
        "alt": "Lifestyle look of bouclé tweed vest set"
      }
    ],
    "reviews": [
      {
        "id": "rev-c4-1",
        "author": "Kiki Williams",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "5 days ago",
        "title": "Looks straight off a runway",
        "comment": "The tweed is light and doesn't trap heat at all. The gold button detailing looks very high-end. Received so many compliments at brunch."
      },
      {
        "id": "rev-c4-2",
        "author": "Oluwakemi Balogun",
        "location": "Ibadan, Oyo State",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Shorts have a very classy length",
        "comment": "Not too short at all. Sits nicely on the mid-thigh with a flattering A-line cut."
      },
      {
        "id": "rev-c4-3",
        "author": "Fatima Balarabe",
        "location": "Kaduna, Kaduna State",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Neat finishing",
        "comment": "The satin edge binding ensures there is no scratchiness anywhere. Loved it."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 39000,
        "originalPrice": 48750,
        "savings": 9750,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 70200,
        "originalPrice": 78000,
        "savings": 7800,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 97500,
        "originalPrice": 117000,
        "savings": 19500,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Tailored Tweed Vest and Short Set",
    "shortBenefit": "Parisian sophistication reimagined in lightweight bouclé with gold crest buttons."
  },
  {
    "id": "prod-jump-1",
    "name": "Wide Leg Tailored Crepe Jumpsuit",
    "slug": "wide-leg-tailored-crepe-jumpsuit",
    "tagline": "Statuesque elegance in heavy drape crepe with a sculpted halter neckline and sash.",
    "headline": "Statuesque elegance in heavy drape crepe with a sculpted halter neckline and sash.",
    "category": "Jumpsuits",
    "startingPrice": 45000,
    "oldPrice": 56000,
    "rating": 4.9,
    "reviewCount": 38,
    "stockCount": 8,
    "description": "The ultimate modern alternative to the evening gown. Crafted from substantial, crease-resistant double crepe, this jumpsuit features an architectural halter crossover neckline, open-back keyhole detail, and sweeping floor-skimming wide-leg trousers that elongate the legs effortlessly. A detachable sash cinches the waist to perfection. Wear to black-tie galas, formal weddings, and high-stakes award ceremonies.",
    "bulletDetails": {
      "fabric": "Double-Weave Crepe (95% Poly, 5% Spandex)",
      "fit": "Tailored bodice with sweeping wide palazzo legs",
      "length": "Full floor length (60 inches shoulder to hem)",
      "care": "Dry clean only",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Blush Rose",
        "Midnight Onyx",
        "Emerald Green"
      ]
    },
    "sizeAndFitNote": "Generous trouser length designed to accommodate 3 to 4-inch heels.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Adds height to maximize wide-leg flow"
      },
      {
        "productId": "prod-bag-3",
        "productName": "Croc Embossed Baguette Clutch Bag",
        "reason": "Sleek evening accessory companion"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Dom Hill",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@domhill",
        "alt": "Front view of wide leg tailored crepe jumpsuit"
      },
      {
        "url": "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Philipp Arntz",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@philipparntz",
        "alt": "Detail view of crossover halter bodice and sash waist"
      },
      {
        "url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Houcine Ncib",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@houcinencib",
        "alt": "Statuesque evening look wearing tailored wide leg jumpsuit"
      }
    ],
    "reviews": [
      {
        "id": "rev-j1-1",
        "author": "Amina Lawal",
        "location": "Maitama, Abuja",
        "rating": 5,
        "date": "3 days ago",
        "title": "Made me look 6 feet tall!",
        "comment": "The wide-leg cut combined with heels makes your legs look endless. The fabric is heavy and falls like liquid. Received compliments all evening."
      },
      {
        "id": "rev-j1-2",
        "author": "Chioma Okoye",
        "location": "Lekki Phase 1, Lagos",
        "rating": 5,
        "date": "1 week ago",
        "title": "Impeccable evening silhouette",
        "comment": "Wore to an awards dinner at Eko Hotel. Doesn't wrinkle even after sitting for hours. Excellent quality."
      },
      {
        "id": "rev-j1-3",
        "author": "Efe Agbaje",
        "location": "Warri, Delta State",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Loved the pay on delivery",
        "comment": "Felt so secure inspecting the item when the dispatch rider arrived before making POS payment."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 45000,
        "originalPrice": 56250,
        "savings": 11250,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 81000,
        "originalPrice": 90000,
        "savings": 9000,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 112500,
        "originalPrice": 135000,
        "savings": 22500,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Wide Leg Tailored Crepe Jumpsuit",
    "shortBenefit": "Statuesque elegance in heavy drape crepe with a sculpted halter neckline and sash."
  },
  {
    "id": "prod-jump-2",
    "name": "One Shoulder Draped Satin Jumpsuit",
    "slug": "one-shoulder-draped-satin-jumpsuit",
    "tagline": "Sensual asymmetrical drape in liquid satin with tapered cigarette trousers.",
    "headline": "Sensual asymmetrical drape in liquid satin with tapered cigarette trousers.",
    "category": "Jumpsuits",
    "startingPrice": 42000,
    "oldPrice": 53000,
    "rating": 4.8,
    "reviewCount": 29,
    "stockCount": 10,
    "description": "Sleek, modern drama for after-hours elegance. Cut from high-shine liquid silk-satin, this jumpsuit showcases an asymmetrical one-shoulder neckline with a soft waterfall drape that flows gracefully over the shoulder. The tailored waistband transitions into pleated cigarette trousers that taper cleanly to the ankle, highlighting your footwear. Style with strappy metallic heels and chandelier earrings for celebratory engagements.",
    "bulletDetails": {
      "fabric": "97% Liquid Silk Satin, 3% Elastane",
      "fit": "Asymmetric one-shoulder with tapered slim-leg trousers",
      "length": "Ankle grazing (54 inches shoulder to hem)",
      "care": "Hand wash cool with delicate detergent; hang to dry",
      "availableSizes": [
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16"
      ],
      "availableColors": [
        "Champagne Rose",
        "Onyx Black",
        "Rich Ruby"
      ]
    },
    "sizeAndFitNote": "Tapered ankle cut highlights statement heels perfectly.",
    "styleWith": [
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Ankle taper showcases delicate stiletto straps"
      },
      {
        "productId": "prod-jewel-4",
        "productName": "Crystal Embellished Chandelier Drop Earrings",
        "reason": "Balances bare shoulder with sparkling crystal radiance"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Valerie Elash",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@valerieelash",
        "alt": "Front view of one shoulder draped satin jumpsuit"
      },
      {
        "url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Burgess Milner",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@burgessmilner",
        "alt": "Detail view of asymmetric shoulder drape and satin sheen"
      },
      {
        "url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Ali Pazani",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@alipazani",
        "alt": "Evening party look wearing one shoulder satin jumpsuit"
      }
    ],
    "reviews": [
      {
        "id": "rev-j2-1",
        "author": "Folashade Onabanjo",
        "location": "Ikeja, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "The drape is pure art",
        "comment": "Sits so naturally on the shoulder. Doesn't slip down or pull uncomfortably. Very chic evening piece."
      },
      {
        "id": "rev-j2-2",
        "author": "Zainab Balarabe",
        "location": "Kano, Kano State",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Sleek tailored trousers",
        "comment": "The tapered leg is so flattering and shows off your heels. Lovely blush color."
      },
      {
        "id": "rev-j2-3",
        "author": "Adaobi Ude",
        "location": "Enugu, Enugu State",
        "rating": 4.7,
        "date": "1 month ago",
        "title": "Great sizing guide",
        "comment": "Used their size chart and it was 100% accurate. Fits like a glove."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 42000,
        "originalPrice": 52500,
        "savings": 10500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 75600,
        "originalPrice": 84000,
        "savings": 8400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 105000,
        "originalPrice": 126000,
        "savings": 21000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "One Shoulder Draped Satin Jumpsuit",
    "shortBenefit": "Sensual asymmetrical drape in liquid satin with tapered cigarette trousers."
  },
  {
    "id": "prod-jump-3",
    "name": "Belted Utility Safari Cotton Jumpsuit",
    "slug": "belted-utility-safari-cotton-jumpsuit",
    "tagline": "Structured washed cotton poplin with cargo patch pockets and a double D-ring belt.",
    "headline": "Structured washed cotton poplin with cargo patch pockets and a double D-ring belt.",
    "category": "Jumpsuits",
    "startingPrice": 38000,
    "oldPrice": 47000,
    "rating": 4.8,
    "reviewCount": 25,
    "stockCount": 11,
    "description": "The ultimate harmony of utilitarian practicality and effortless fashion. Spun from 100% garment-washed cotton drill, this safari jumpsuit features a notched lapel collar, rolled-tab cuffed sleeves, four functional cargo chest and hip pockets, and an adjustable webbing belt with gold D-ring hardware. The relaxed tapered silhouette rolls up easily at the ankle for laid-back weekend exploration or casual creative meetings.",
    "bulletDetails": {
      "fabric": "100% Garment-Washed Breathable Cotton Drill",
      "fit": "Relaxed utility cut with adjustable D-ring cinch belt",
      "length": "Full length (56 inches)",
      "care": "Machine wash warm; tumble dry low or line dry; warm iron",
      "availableSizes": [
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18"
      ],
      "availableColors": [
        "Dusty Blush Utility",
        "Desert Khaki",
        "Olive Green"
      ]
    },
    "sizeAndFitNote": "Relaxed cut through the body; belt cinches the waist firmly.",
    "styleWith": [
      {
        "productId": "prod-shoe-4",
        "productName": "Cushioned Leather Minimal Flatform Sandals",
        "reason": "Reinforces modern utilitarian aesthetic"
      },
      {
        "productId": "prod-bag-4",
        "productName": "Minimalist Pebbled Leather Crossbody Bag",
        "reason": "Hands-free practical pairing"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Christian Ferrer",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@cferrers",
        "alt": "Front view of belted utility safari cotton jumpsuit"
      },
      {
        "url": "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Mariano Nocetti",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@marianonocetti",
        "alt": "Detail view of cargo flap pockets and D-ring belt"
      },
      {
        "url": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80",
        "photographer": "NordWood Themes",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@nordwood",
        "alt": "Weekend urban explorer look wearing safari jumpsuit"
      }
    ],
    "reviews": [
      {
        "id": "rev-j3-1",
        "author": "Yetunde Folarin",
        "location": "Surulere, Lagos",
        "rating": 5,
        "date": "6 days ago",
        "title": "Comfortable and so effortlessly cool",
        "comment": "Real cotton that doesn't feel stifling in Lagos heat. Pockets are actual functional pockets. Love the blush pink shade."
      },
      {
        "id": "rev-j3-2",
        "author": "Khadija Garba",
        "location": "Abuja (FCT)",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Great travel outfit",
        "comment": "Wore this on an interstate trip. Didn't wrinkle uncomfortably and felt very durable."
      },
      {
        "id": "rev-j3-3",
        "author": "Chisom Igwe",
        "location": "Aba, Abia State",
        "rating": 4.7,
        "date": "1 month ago",
        "title": "Belt makes it very flattering",
        "comment": "Cinches in nicely so you don't look boxy. Fast dispatch."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 38000,
        "originalPrice": 47500,
        "savings": 9500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 68400,
        "originalPrice": 76000,
        "savings": 7600,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 95000,
        "originalPrice": 114000,
        "savings": 19000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Belted Utility Safari Cotton Jumpsuit",
    "shortBenefit": "Structured washed cotton poplin with cargo patch pockets and a double D-ring belt."
  },
  {
    "id": "prod-bag-1",
    "name": "Structured Quilted Rose Leather Shoulder Bag",
    "slug": "structured-quilted-rose-leather-bag",
    "tagline": "Chevron quilting on supple leather with a multi-way gold sliding chain strap.",
    "headline": "Chevron quilting on supple leather with a multi-way gold sliding chain strap.",
    "category": "Bags",
    "startingPrice": 32500,
    "oldPrice": 42000,
    "rating": 4.9,
    "reviewCount": 44,
    "stockCount": 15,
    "description": "An instant icon of refined elegance. Handcrafted from supple top-grain leather featuring padded chevron quilting, this rose-toned shoulder bag boasts an interlocking gold turn-lock closure and an adjustable sliding curb chain strap that transitions seamlessly from a long crossbody to a double-strap shoulder carry. Inside, multiple lined compartments and a zippered pocket keep your phone, keys, and lip gloss impeccably organized.",
    "bulletDetails": {
      "fabric": "100% Genuine Top-Grain Quilted Leather; Microfiber suede lining",
      "fit": "Medium structured shoulder / crossbody bag (10 x 6.5 x 3.5 inches)",
      "length": "Chain drop: 22 inches single, 12 inches doubled",
      "care": "Wipe clean with soft damp cloth; store in included dust bag",
      "availableSizes": [
        "Standard Medium"
      ],
      "availableColors": [
        "Dusty Rose Pink",
        "Champagne Beige",
        "Noir Black"
      ]
    },
    "sizeAndFitNote": "Spacious enough for iPhone Pro Max, cardholder, cosmetics & keys.",
    "styleWith": [
      {
        "productId": "prod-dress-1",
        "productName": "Blush Satin Wrap Midi Dress",
        "reason": "Harmonizes soft blush tones with gold hardware"
      },
      {
        "productId": "prod-jewel-1",
        "productName": "Layered Hammered Gold Coin Pendant Necklace",
        "reason": "Matches gleaming gold curb chain strap"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Kari Shea",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@karishea",
        "alt": "Front view of structured quilted rose leather shoulder bag"
      },
      {
        "url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Creative Christian",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@creativechristian",
        "alt": "Detail view of gold turn-lock clasp and chevron quilt stitching"
      },
      {
        "url": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Lifestyle model wearing quilted rose leather shoulder bag"
      }
    ],
    "reviews": [
      {
        "id": "rev-b1-1",
        "author": "Bimbo Olaleye",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "2 days ago",
        "title": "The leather smells so rich and real!",
        "comment": "Supple, soft leather with immaculate stitching. The gold chain has substantial weight and doesn't tarnish. Delivered in a luxury dust bag."
      },
      {
        "id": "rev-b1-2",
        "author": "Nkiru Okafor",
        "location": "Enugu, Enugu State",
        "rating": 4.9,
        "date": "1 week ago",
        "title": "Perfect size for essentials",
        "comment": "Fits my iPhone Pro Max, car keys, compact powder, and lipstick comfortably without bulging."
      },
      {
        "id": "rev-b1-3",
        "author": "Hauwa Shehu",
        "location": "Abuja (FCT)",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Prompt delivery with POS",
        "comment": "Inspected the leather before paying the courier. Seamless shopping experience."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 32500,
        "originalPrice": 40625,
        "savings": 8125,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 58500,
        "originalPrice": 65000,
        "savings": 6500,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 81250,
        "originalPrice": 97500,
        "savings": 16250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Structured Quilted Rose Leather Shoulder Bag",
    "shortBenefit": "Chevron quilting on supple leather with a multi-way gold sliding chain strap."
  },
  {
    "id": "prod-bag-2",
    "name": "Woven Raffia Summer Market Tote Bag",
    "slug": "woven-raffia-summer-tote-bag",
    "tagline": "Handcrafted natural woven palm raffia trimmed with smooth caramel leather handles.",
    "headline": "Handcrafted natural woven palm raffia trimmed with smooth caramel leather handles.",
    "category": "Bags",
    "startingPrice": 24500,
    "oldPrice": 32000,
    "rating": 4.8,
    "reviewCount": 27,
    "stockCount": 14,
    "description": "Capture effortless coastal chic wherever your day takes you. Hand-woven by skilled artisans from durable organic Madagascar palm raffia, this spacious market tote features smooth caramel saddle leather shoulder straps and an internal canvas lining with a secure drawstring closure. Roomy enough to hold a beach towel, book, water bottle, and sunglasses with ease. Style with linen dresses and woven slides for weekend getaways.",
    "bulletDetails": {
      "fabric": "Natural Palm Raffia with 100% Genuine Leather Trim; Canvas liner",
      "fit": "Spacious tote (16 x 11 x 6 inches)",
      "length": "Handle drop: 9.5 inches",
      "care": "Spot clean with dry cloth; keep away from soaking water",
      "availableSizes": [
        "One Size"
      ],
      "availableColors": [
        "Natural Raffia & Tan Leather",
        "Blush Weave & Rose Leather"
      ]
    },
    "sizeAndFitNote": "Drawstring canvas closure keeps your belongings completely safe and secure.",
    "styleWith": [
      {
        "productId": "prod-dress-5",
        "productName": "Puff Sleeve Linen Summer Sundress",
        "reason": "Harmonizes breezy natural organic textures"
      },
      {
        "productId": "prod-shoe-3",
        "productName": "Braided Leather Low Wedge Slides",
        "reason": "Coordinates warm woven vacation aesthetic"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sun Lingyan",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sunlingyan",
        "alt": "Front view of woven raffia summer market tote bag"
      },
      {
        "url": "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Kari Shea",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@karishea",
        "alt": "Detail view of woven palm raffia texture and leather strap"
      },
      {
        "url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Dom Hill",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@domhill",
        "alt": "Lifestyle model carrying woven raffia market tote"
      }
    ],
    "reviews": [
      {
        "id": "rev-b2-1",
        "author": "Zainab Bello",
        "location": "Victoria Island, Lagos",
        "rating": 5,
        "date": "3 days ago",
        "title": "My favorite weekend bag!",
        "comment": "Took this to Tarkwa Bay and then to weekend brunch. The drawstring lining inside is genius so nothing falls out or gets exposed."
      },
      {
        "id": "rev-b2-2",
        "author": "Folake Adeyemi",
        "location": "Ibadan, Oyo State",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Strong leather handles",
        "comment": "The leather handles don't dig into your shoulders even when carrying heavy items. Very neatly woven."
      },
      {
        "id": "rev-b2-3",
        "author": "Chidinma Eze",
        "location": "Port Harcourt, Rivers",
        "rating": 4.7,
        "date": "1 month ago",
        "title": "Generous size",
        "comment": "Fits my tablet, makeup bag, umbrella, and water bottle easily."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 24500,
        "originalPrice": 30625,
        "savings": 6125,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 44100,
        "originalPrice": 49000,
        "savings": 4900,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 61250,
        "originalPrice": 73500,
        "savings": 12250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Woven Raffia Summer Market Tote Bag",
    "shortBenefit": "Handcrafted natural woven palm raffia trimmed with smooth caramel leather handles."
  },
  {
    "id": "prod-bag-3",
    "name": "Croc Embossed Baguette Clutch Bag",
    "slug": "croc-embossed-baguette-clutch-bag",
    "tagline": "High-shine crocodile embossed leather with a sleek detachable shoulder strap.",
    "headline": "High-shine crocodile embossed leather with a sleek detachable shoulder strap.",
    "category": "Bags",
    "startingPrice": 27500,
    "oldPrice": 35000,
    "rating": 4.9,
    "reviewCount": 31,
    "stockCount": 13,
    "description": "Nineties minimalism elevated with modern Parisian chic. Cut from glossy croc-embossed calfskin leather with rich tonal depth, this baguette bag fits neatly tucked under the arm or carried as a sleek evening clutch. Accented with a polished gold magnetic clasp and an interior card slip. It provides just the right amount of high-shine texture to anchor monochrome evening looks and tailored co-ord sets.",
    "bulletDetails": {
      "fabric": "Glossy Croc-Embossed Leather; Sateen interior lining",
      "fit": "Compact baguette shoulder / clutch (9.5 x 5 x 2.5 inches)",
      "length": "Short shoulder strap drop: 8.5 inches",
      "care": "Wipe with soft microfiber cloth; avoid rough abrasives",
      "availableSizes": [
        "Standard"
      ],
      "availableColors": [
        "Glossy Burgundy Rose",
        "Jet Black Croc",
        "Caramel Toffee"
      ]
    },
    "sizeAndFitNote": "Compact silhouette fits phone, lipstick, cards & car keys comfortably.",
    "styleWith": [
      {
        "productId": "prod-dress-3",
        "productName": "Emerald Pleated Corset Midi Dress",
        "reason": "Glossy texture contrasts accordion pleats"
      },
      {
        "productId": "prod-shoe-2",
        "productName": "Strappy Metallic Stiletto Heel Sandals",
        "reason": "Completes sleek gala evening accessories"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Irene Kredenets",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@ikredenets",
        "alt": "Front view of croc embossed baguette clutch bag"
      },
      {
        "url": "https://images.unsplash.com/photo-1566150902887-9679ec15d487?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Detail view of croc-embossed leather grain and magnetic clasp"
      },
      {
        "url": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Alex Perez",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@a2ephotography",
        "alt": "Lifestyle model carrying croc embossed baguette under arm"
      }
    ],
    "reviews": [
      {
        "id": "rev-b3-1",
        "author": "Simisola Cole",
        "location": "Lekki, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "Tucks under the arm perfectly",
        "comment": "The 90s baguette trend done right! The crocodile embossing looks so rich and glossy. Magnetic clasp snaps shut securely."
      },
      {
        "id": "rev-b3-2",
        "author": "Amina Danjuma",
        "location": "Maitama, Abuja",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Great color depth",
        "comment": "The burgundy rose shade has lovely depth under different lighting. Very classy."
      },
      {
        "id": "rev-b3-3",
        "author": "Uchechi Kalu",
        "location": "Aba, Abia State",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Fast dispatch",
        "comment": "Came in pristine condition within 3 days. Loved the pay on delivery feature."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 27500,
        "originalPrice": 34375,
        "savings": 6875,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 49500,
        "originalPrice": 55000,
        "savings": 5500,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 68750,
        "originalPrice": 82500,
        "savings": 13750,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Croc Embossed Baguette Clutch Bag",
    "shortBenefit": "High-shine crocodile embossed leather with a sleek detachable shoulder strap."
  },
  {
    "id": "prod-bag-4",
    "name": "Minimalist Pebbled Leather Crossbody Bag",
    "slug": "minimalist-pebbled-leather-crossbody-bag",
    "tagline": "Butter-soft pebbled calfskin with an adjustable wide strap for hands-free daily ease.",
    "headline": "Butter-soft pebbled calfskin with an adjustable wide strap for hands-free daily ease.",
    "category": "Bags",
    "startingPrice": 29000,
    "oldPrice": 36000,
    "rating": 4.8,
    "reviewCount": 36,
    "stockCount": 18,
    "description": "Designed for the woman on the move. Crafted from scratch-resistant full-grain pebbled leather, this minimalist camera-style crossbody bag features clean rounded corners, a smooth gold top zipper, and a comfortable wide leather strap that rests gently across the collarbone. Equipped with an exterior back slip pocket for quick-access phone retrieval and a zippered interior pocket for valuables.",
    "bulletDetails": {
      "fabric": "100% Full-Grain Pebbled Cowhide; Cotton twill lining",
      "fit": "Compact camera crossbody (8.5 x 6 x 3 inches)",
      "length": "Adjustable shoulder strap: 18 to 24 inches drop",
      "care": "Treat with leather conditioner periodically; wipe with damp cloth",
      "availableSizes": [
        "Standard"
      ],
      "availableColors": [
        "Dusty Blush",
        "Warm Caramel Tan",
        "Classic Black"
      ]
    },
    "sizeAndFitNote": "Wide strap prevents shoulder fatigue during all-day wear.",
    "styleWith": [
      {
        "productId": "prod-top-3",
        "productName": "Crisp Cotton Poplin Oversized Shirt",
        "reason": "Clean utilitarian pairing for errand days"
      },
      {
        "productId": "prod-shoe-4",
        "productName": "Cushioned Leather Minimal Flatform Sandals",
        "reason": "Coordinates sleek minimalist city leather"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1527383418406-f85a3b146499?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Alireza Esmaeeli",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@alirezaesmaeeli",
        "alt": "Front view of minimalist pebbled leather crossbody bag"
      },
      {
        "url": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Kari Shea",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@karishea",
        "alt": "Detail view of pebbled leather texture and gold zipper"
      },
      {
        "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Pete Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@petebellis",
        "alt": "Lifestyle model wearing pebbled leather crossbody"
      }
    ],
    "reviews": [
      {
        "id": "rev-b4-1",
        "author": "Dr. Kemi Solanke",
        "location": "Ikeja GRA, Lagos",
        "rating": 5,
        "date": "5 days ago",
        "title": "My daily workhorse bag",
        "comment": "The pebbled leather does not scratch even when tossed in the car. Zipper slides like butter. Truly durable leather."
      },
      {
        "id": "rev-b4-2",
        "author": "Zainab Aliyu",
        "location": "Kano, Kano State",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Comfortable wide strap",
        "comment": "Does not hurt the shoulder even after walking around all afternoon."
      },
      {
        "id": "rev-b4-3",
        "author": "Blessing Eze",
        "location": "Asaba, Delta State",
        "rating": 4.7,
        "date": "1 month ago",
        "title": "Quick delivery",
        "comment": "Arrived neatly in a dust bag with prompt courier delivery."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 29000,
        "originalPrice": 36250,
        "savings": 7250,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 52200,
        "originalPrice": 58000,
        "savings": 5800,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 72500,
        "originalPrice": 87000,
        "savings": 14500,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Minimalist Pebbled Leather Crossbody Bag",
    "shortBenefit": "Butter-soft pebbled calfskin with an adjustable wide strap for hands-free daily ease."
  },
  {
    "id": "prod-shoe-1",
    "name": "Pointed Toe Block Heel Suede Mules",
    "slug": "pointed-toe-block-heel-suede-mules",
    "tagline": "Elongating pointed silhouette with a stable 65mm architectural block heel.",
    "headline": "Elongating pointed silhouette with a stable 65mm architectural block heel.",
    "category": "Shoes",
    "startingPrice": 28500,
    "oldPrice": 36000,
    "rating": 4.9,
    "reviewCount": 38,
    "stockCount": 14,
    "description": "The ideal union of leg-lengthening polish and all-day walking comfort. Crafted from velvety kid suede leather with a glove-soft sheepskin lining, these slip-on mules feature an elongated pointed toe and an architectural 65mm block heel that provides rock-solid stability across paved streets and office corridors. Cushioned memory-foam insoles support your arches from morning meetings to evening dinners.",
    "bulletDetails": {
      "fabric": "100% Genuine Kid Suede Leather; Breathable sheepskin lining",
      "fit": "Slip-on mule with pointed toe and 65mm (2.5 inch) block heel",
      "length": "Standard EU / UK footwear sizing",
      "care": "Protect with suede protector spray; brush with crepe suede brush",
      "availableSizes": [
        "EU 37 (UK 4)",
        "EU 38 (UK 5)",
        "EU 39 (UK 6)",
        "EU 40 (UK 7)",
        "EU 41 (UK 8)",
        "EU 42 (UK 9)"
      ],
      "availableColors": [
        "Dusty Blush Suede",
        "Warm Nude Tan",
        "Onyx Black Suede"
      ]
    },
    "sizeAndFitNote": "Pointed toe box. If you have wide feet, we recommend choosing one size up.",
    "styleWith": [
      {
        "productId": "prod-skirt-3",
        "productName": "High Waisted Tailored Pencil Skirt",
        "reason": "Creates sleek, unbroken leg elongation"
      },
      {
        "productId": "prod-coord-4",
        "productName": "Tailored Tweed Vest and Short Set",
        "reason": "Balances structured bouclé with suede softness"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Amanda Vick",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@amandavick",
        "alt": "Front view of pointed toe block heel suede mules"
      },
      {
        "url": "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Camila Damásio",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@camiladamasio",
        "alt": "Detail view of kid suede texture and stable block heel"
      },
      {
        "url": "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Irene Kredenets",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@ikredenets",
        "alt": "Lifestyle look of pointed suede block heel mules"
      }
    ],
    "reviews": [
      {
        "id": "rev-sh1-1",
        "author": "Omolara Jinadu",
        "location": "Victoria Island, Lagos",
        "rating": 5,
        "date": "3 days ago",
        "title": "I can wear these all day at work without pain!",
        "comment": "The block heel is so steady and the memory foam cushioning in the footbed makes a huge difference. Suede is velvety and rich."
      },
      {
        "id": "rev-sh1-2",
        "author": "Zainab Kabir",
        "location": "Gwarinpa, Abuja",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Very chic pointed toe",
        "comment": "Makes every outfit look intentional and put together. Ordered EU 40 and fits true to size."
      },
      {
        "id": "rev-sh1-3",
        "author": "Ebele Nnamdi",
        "location": "Onitsha, Anambra",
        "rating": 4.8,
        "date": "1 month ago",
        "title": "Arrived in great shoe box",
        "comment": "Came with dust bags and heel protectors. Very impressive service."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 28500,
        "originalPrice": 35625,
        "savings": 7125,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 51300,
        "originalPrice": 57000,
        "savings": 5700,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 71250,
        "originalPrice": 85500,
        "savings": 14250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Pointed Toe Block Heel Suede Mules",
    "shortBenefit": "Elongating pointed silhouette with a stable 65mm architectural block heel."
  },
  {
    "id": "prod-shoe-2",
    "name": "Strappy Metallic Stiletto Heel Sandals",
    "slug": "strappy-metallic-stiletto-heel-sandals",
    "tagline": "Champagne metallic straps with an ankle buckle and 85mm stiletto heel for red carpets.",
    "headline": "Champagne metallic straps with an ankle buckle and 85mm stiletto heel for red carpets.",
    "category": "Shoes",
    "startingPrice": 32000,
    "oldPrice": 40000,
    "rating": 4.9,
    "reviewCount": 42,
    "stockCount": 11,
    "description": "Celebration footwear engineered to turn heads. Featuring ultra-slender metallic champagne faux leather straps that embrace the foot with delicate minimalism, an adjustable buckle ankle strap, and an 85mm stiletto heel. Reinforced arch support and non-slip rubber outsoles ensure you can dance through Owambes and wedding receptions with poised confidence from afternoon arrival to midnight after-parties.",
    "bulletDetails": {
      "fabric": "Metallic Mirrored Specchio Vegan Leather; Cushioned leather insole",
      "fit": "Barely-there strappy stiletto sandal (85mm / 3.3 inch heel)",
      "length": "Standard EU / UK footwear sizing",
      "care": "Wipe with damp cloth; store away from direct heat",
      "availableSizes": [
        "EU 36 (UK 3)",
        "EU 37 (UK 4)",
        "EU 38 (UK 5)",
        "EU 39 (UK 6)",
        "EU 40 (UK 7)",
        "EU 41 (UK 8)"
      ],
      "availableColors": [
        "Champagne Gold",
        "Rose Gold",
        "Liquid Platinum"
      ]
    },
    "sizeAndFitNote": "Ankle strap is fully adjustable with multiple pinholes.",
    "styleWith": [
      {
        "productId": "prod-ankara-1",
        "productName": "Vibrant Ankara Peplum Mermaid Gown",
        "reason": "Adds celebratory height to floor-length gowns"
      },
      {
        "productId": "prod-jump-1",
        "productName": "Wide Leg Tailored Crepe Jumpsuit",
        "reason": "Elevates palazzo trouser hem with metallic glimmer"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Apostolos Vamvouras",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@apostolosvamvouras",
        "alt": "Front view of strappy metallic stiletto heel sandals"
      },
      {
        "url": "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Mireia Vazquez",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@mireiavazquez",
        "alt": "Detail view of champagne metallic straps and delicate buckle"
      },
      {
        "url": "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Wedding guest look wearing strappy metallic heels"
      }
    ],
    "reviews": [
      {
        "id": "rev-sh2-1",
        "author": "Bukola Savage",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "2 days ago",
        "title": "Danced all night at an Owambe!",
        "comment": "Usually stilettos kill my feet after 1 hour, but the arch support on these is surprisingly comfortable. The champagne gold matches every single dress."
      },
      {
        "id": "rev-sh2-2",
        "author": "Chiamaka Obi",
        "location": "Enugu, Enugu State",
        "rating": 5,
        "date": "1 week ago",
        "title": "So delicate and sexy on the foot",
        "comment": "Barely-there straps that don't cut into the skin. Absolutely gorgeous heels."
      },
      {
        "id": "rev-sh2-3",
        "author": "Hauwa Mohammed",
        "location": "Wuse 2, Abuja",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Accurate size advice",
        "comment": "Followed the size guide and it fit like a dream. POS payment on delivery was smooth."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 32000,
        "originalPrice": 40000,
        "savings": 8000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 57600,
        "originalPrice": 64000,
        "savings": 6400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 80000,
        "originalPrice": 96000,
        "savings": 16000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Strappy Metallic Stiletto Heel Sandals",
    "shortBenefit": "Champagne metallic straps with an ankle buckle and 85mm stiletto heel for red carpets."
  },
  {
    "id": "prod-shoe-3",
    "name": "Braided Leather Low Wedge Slides",
    "slug": "braided-leather-low-wedge-slides",
    "tagline": "Artisan woven braided leather with an ergonomic 35mm micro-wedge for daily comfort.",
    "headline": "Artisan woven braided leather with an ergonomic 35mm micro-wedge for daily comfort.",
    "category": "Shoes",
    "startingPrice": 22000,
    "oldPrice": 28000,
    "rating": 4.8,
    "reviewCount": 33,
    "stockCount": 16,
    "description": "Relaxed coastal comfort crafted for effortless wear. Hand-woven from supple top-grain nappa leather straps that rest gently across the instep without friction or pinching, these slide sandals feature a slight 35mm micro-wedge heel that provides gentle arch lift and posture support. Finished with a cushioned memory foam leather footbed and durable non-slip ribbed rubber soles.",
    "bulletDetails": {
      "fabric": "100% Genuine Nappa Leather Braiding; Ergonomic EVA wedge core",
      "fit": "Slip-on low wedge slide (35mm / 1.4 inch heel)",
      "length": "Standard EU / UK footwear sizing",
      "care": "Wipe with soft leather conditioner cloth",
      "availableSizes": [
        "EU 37 (UK 4)",
        "EU 38 (UK 5)",
        "EU 39 (UK 6)",
        "EU 40 (UK 7)",
        "EU 41 (UK 8)",
        "EU 42 (UK 9)"
      ],
      "availableColors": [
        "Blush Nude Leather",
        "Caramel Tan",
        "Crisp White"
      ]
    },
    "sizeAndFitNote": "Braided straps stretch gently to conform to your unique foot width.",
    "styleWith": [
      {
        "productId": "prod-dress-2",
        "productName": "Tiered Chiffon Floral Maxi Dress",
        "reason": "Complements breezy, feminine daytime dresses"
      },
      {
        "productId": "prod-bag-2",
        "productName": "Woven Raffia Summer Market Tote Bag",
        "reason": "Coordinates warm vacation-ready textures"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Maksim Larin",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@maksimlarin",
        "alt": "Front view of braided leather low wedge slides"
      },
      {
        "url": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Irene Kredenets",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@ikredenets",
        "alt": "Detail view of woven braided leather and cushioned sole"
      },
      {
        "url": "https://images.unsplash.com/photo-1524041255072-7da0525d6b34?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Pete Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@petebellis",
        "alt": "Lifestyle look of relaxed braided leather slide sandals"
      }
    ],
    "reviews": [
      {
        "id": "rev-sh3-1",
        "author": "Funmi Adeleke",
        "location": "Lekki, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "Like walking on clouds",
        "comment": "The braided leather is so soft that it doesn't cause any blisters even on the very first wear. The slight wedge gives great back support."
      },
      {
        "id": "rev-sh3-2",
        "author": "Amina Yusuf",
        "location": "Kaduna, Kaduna State",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Great for everyday errands",
        "comment": "Slip them on and go. Quality real leather with a durable rubber sole."
      },
      {
        "id": "rev-sh3-3",
        "author": "Ngozi Ekwueme",
        "location": "Owerri, Imo State",
        "rating": 4.7,
        "date": "3 weeks ago",
        "title": "Accurate sizing",
        "comment": "True to EU 39. Arrived safely in Imo State via courier."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 22000,
        "originalPrice": 27500,
        "savings": 5500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 39600,
        "originalPrice": 44000,
        "savings": 4400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 55000,
        "originalPrice": 66000,
        "savings": 11000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Braided Leather Low Wedge Slides",
    "shortBenefit": "Artisan woven braided leather with an ergonomic 35mm micro-wedge for daily comfort."
  },
  {
    "id": "prod-shoe-4",
    "name": "Cushioned Leather Minimal Flatform Sandals",
    "slug": "cushioned-leather-minimal-flatform-sandals",
    "tagline": "Contemporary architectural platform sandal with dual padded leather straps.",
    "headline": "Contemporary architectural platform sandal with dual padded leather straps.",
    "category": "Shoes",
    "startingPrice": 24000,
    "oldPrice": 30000,
    "rating": 4.8,
    "reviewCount": 29,
    "stockCount": 15,
    "description": "Clean, sculptural Scandinavian minimalism adapted for warm tropical climates. Designed with dual padded tubular leather straps that cradle the foot softly, these flatform sandals feature a lightweight 40mm platform sole with a serrated rubber grip for traction. The molded footbed conforms to the shape of your feet over time, providing balanced weight distribution for long weekend strolls and city outings.",
    "bulletDetails": {
      "fabric": "Padded Smooth Nappa Cowhide Leather; Lightweight EVA platform",
      "fit": "Slip-on dual-strap flatform sandal (40mm / 1.6 inch platform)",
      "length": "Standard EU / UK footwear sizing",
      "care": "Wipe with damp cloth; store in dry place",
      "availableSizes": [
        "EU 37 (UK 4)",
        "EU 38 (UK 5)",
        "EU 39 (UK 6)",
        "EU 40 (UK 7)",
        "EU 41 (UK 8)"
      ],
      "availableColors": [
        "Dusty Blush",
        "Bone White",
        "Pitch Black"
      ]
    },
    "sizeAndFitNote": "Padded straps provide comfortable grip without tight pinching.",
    "styleWith": [
      {
        "productId": "prod-coord-3",
        "productName": "Ribbed Knit Crop and Midi Set",
        "reason": "Maintains modern athletic-minimalist silhouette"
      },
      {
        "productId": "prod-bag-4",
        "productName": "Minimalist Pebbled Leather Crossbody Bag",
        "reason": "Coordinates sleek everyday leather accessories"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80",
        "photographer": "NordWood Themes",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@nordwood",
        "alt": "Front view of cushioned leather minimal flatform sandals"
      },
      {
        "url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sun Lingyan",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sunlingyan",
        "alt": "Detail view of padded leather tubular straps and platform sole"
      },
      {
        "url": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Freestocks",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@freestocks",
        "alt": "Lifestyle look of modern flatform sandals"
      }
    ],
    "reviews": [
      {
        "id": "rev-sh4-1",
        "author": "Toyin Balogun",
        "location": "Victoria Island, Lagos",
        "rating": 5,
        "date": "5 days ago",
        "title": "Trendy and so comfortable!",
        "comment": "Gives you extra height without having to balance on a thin heel. The straps are nicely padded and don't rub against toes."
      },
      {
        "id": "rev-sh4-2",
        "author": "Zainab Sani",
        "location": "Abuja (FCT)",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "Clean modern design",
        "comment": "Looks great with linen trousers and casual sets. Very sturdy platform sole."
      },
      {
        "id": "rev-sh4-3",
        "author": "Chioma Eke",
        "location": "Port Harcourt, Rivers",
        "rating": 4.7,
        "date": "3 weeks ago",
        "title": "Fast delivery",
        "comment": "Delivered to my gate in PH without delay. Very happy."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 24000,
        "originalPrice": 30000,
        "savings": 6000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 43200,
        "originalPrice": 48000,
        "savings": 4800,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 60000,
        "originalPrice": 72000,
        "savings": 12000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Cushioned Leather Minimal Flatform Sandals",
    "shortBenefit": "Contemporary architectural platform sandal with dual padded leather straps."
  },
  {
    "id": "prod-jewel-1",
    "name": "Layered Hammered Gold Coin Pendant Necklace",
    "slug": "layered-hammered-gold-coin-pendant-necklace",
    "tagline": "Pre-layered double chain featuring organic hammered Roman-style coin medallions.",
    "headline": "Pre-layered double chain featuring organic hammered Roman-style coin medallions.",
    "category": "Jewelry",
    "startingPrice": 16500,
    "oldPrice": 22000,
    "rating": 4.9,
    "reviewCount": 39,
    "stockCount": 22,
    "description": "Curated layering made effortless. Crafted with a thick 18K gold vermeil plating over hypoallergenic titanium steel, this double-strand necklace features a delicate paperclip chain paired with an artisan hammered Roman coin medallion. The anti-tarnish protective coating resists humidity and perspiration, allowing you to wear it all day with confidence. Features a 3-inch extender chain for adjustable collarbone placement.",
    "bulletDetails": {
      "fabric": "18K Gold Vermeil over Hypoallergenic Titanium Steel (Tarnish-free)",
      "fit": "Pre-layered double strand with single lobster clasp",
      "length": "Inner strand: 16 inches; Outer strand: 19 inches (+3 inch extender)",
      "care": "Wipe clean with soft polishing cloth; keep dry",
      "availableSizes": [
        "One Size Adjustable"
      ],
      "availableColors": [
        "18K Yellow Gold Vermeil"
      ]
    },
    "sizeAndFitNote": "Hypoallergenic and nickel-free; safe for sensitive skin.",
    "styleWith": [
      {
        "productId": "prod-top-1",
        "productName": "Pleated Flutter Sleeve Chiffon Blouse",
        "reason": "Fills the open neckline with warm golden radiance"
      },
      {
        "productId": "prod-ankara-3",
        "productName": "Kente Accent Fit and Flare Midi",
        "reason": "Echoes royal gold medallion motifs"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sabrianna",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sabrianna",
        "alt": "Front view of layered hammered gold coin pendant necklace"
      },
      {
        "url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Cornelia Ng",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@corneliang",
        "alt": "Detail view of organic hammered coin texture and paperclip link"
      },
      {
        "url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Aliona & Pasha",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@aliona_pasha",
        "alt": "Lifestyle model wearing layered gold coin necklace"
      }
    ],
    "reviews": [
      {
        "id": "rev-jw1-1",
        "author": "Bisi Akintola",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "3 days ago",
        "title": "Really does not tarnish in Lagos humidity!",
        "comment": "I have worn this daily for 3 weeks including sweaty commutes, and the gold shine is as bright as day one. Zero green marks on my skin. Worth every kobo."
      },
      {
        "id": "rev-jw1-2",
        "author": "Amina Danbatta",
        "location": "Kano, Kano State",
        "rating": 4.9,
        "date": "1 week ago",
        "title": "Curated layering with no tangling",
        "comment": "Because both chains attach to one clasp with proper spacing, they don't twist together into a knot. Brilliant."
      },
      {
        "id": "rev-jw1-3",
        "author": "Chidera Obi",
        "location": "Enugu, Enugu State",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Lovely gift box packaging",
        "comment": "Came in a pink velvet jewelry pouch inside a gift box. Felt very special to unbox."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 16500,
        "originalPrice": 20625,
        "savings": 4125,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 29700,
        "originalPrice": 33000,
        "savings": 3300,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 41250,
        "originalPrice": 49500,
        "savings": 8250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Layered Hammered Gold Coin Pendant Necklace",
    "shortBenefit": "Pre-layered double chain featuring organic hammered Roman-style coin medallions."
  },
  {
    "id": "prod-jewel-2",
    "name": "Freshwater Pearl Drop Huggie Earrings",
    "slug": "freshwater-pearl-drop-huggie-earrings",
    "tagline": "Natural baroque freshwater pearls suspended from 18K gold clicker huggie hoops.",
    "headline": "Natural baroque freshwater pearls suspended from 18K gold clicker huggie hoops.",
    "category": "Jewelry",
    "startingPrice": 14500,
    "oldPrice": 19000,
    "rating": 5,
    "reviewCount": 36,
    "stockCount": 19,
    "description": "Timeless organic opulence. Featuring hand-selected natural baroque freshwater pearls suspended from sleek 18K gold-plated clicker huggie hoops. Because each pearl is naturally formed, no two pairs are identical, lending a bespoke heirloom character to your look. The pearls can also be slid off the hoops, giving you classic minimalist gold huggies for everyday wear.",
    "bulletDetails": {
      "fabric": "Natural Baroque Freshwater Pearls on 18K Gold Plated Brass",
      "fit": "Clicker huggie hoop (12mm diameter; pearl drop 14mm)",
      "length": "Total drop: 1.1 inches",
      "care": "Avoid direct perfume spray on pearls; wipe with soft cloth",
      "availableSizes": [
        "One Size"
      ],
      "availableColors": [
        "18K Gold & Natural Lustrous White Pearl"
      ]
    },
    "sizeAndFitNote": "Hypoallergenic clicker closure snaps shut securely.",
    "styleWith": [
      {
        "productId": "prod-dress-2",
        "productName": "Tiered Chiffon Floral Maxi Dress",
        "reason": "Adds romantic vintage pearls to breezy florals"
      },
      {
        "productId": "prod-ling-1",
        "productName": "Silky Lace Trim Robe and Slip Set",
        "reason": "Completes elegant bridal morning photoshoots"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Front view of freshwater pearl drop huggie earrings"
      },
      {
        "url": "https://images.unsplash.com/photo-1535632799794-b2535a4cf96d?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Aliona & Pasha",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@aliona_pasha",
        "alt": "Detail view of organic baroque pearl luster and gold clicker"
      },
      {
        "url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Houcine Ncib",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@houcinencib",
        "alt": "Refined bridal look wearing freshwater pearl drop huggies"
      }
    ],
    "reviews": [
      {
        "id": "rev-jw2-1",
        "author": "Folake Alabi",
        "location": "Magodo, Lagos",
        "rating": 5,
        "date": "2 days ago",
        "title": "Wore these for my court wedding!",
        "comment": "The pearls have such a lovely natural luster. The fact that you can detach the pearls and wear just the gold huggies is an amazing bonus."
      },
      {
        "id": "rev-jw2-2",
        "author": "Zainab Bello",
        "location": "Garki, Abuja",
        "rating": 5,
        "date": "1 week ago",
        "title": "Zero irritation for sensitive ears",
        "comment": "My ears react to almost all fashion jewelry, but these did not itch at all. Very high quality plating."
      },
      {
        "id": "rev-jw2-3",
        "author": "Chinyere Eze",
        "location": "Port Harcourt, Rivers",
        "rating": 4.9,
        "date": "3 weeks ago",
        "title": "Fast courier delivery",
        "comment": "Arrived in Port Harcourt in 2 business days. Very neat packaging."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 14500,
        "originalPrice": 18125,
        "savings": 3625,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 26100,
        "originalPrice": 29000,
        "savings": 2900,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 36250,
        "originalPrice": 43500,
        "savings": 7250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Freshwater Pearl Drop Huggie Earrings",
    "shortBenefit": "Natural baroque freshwater pearls suspended from 18K gold clicker huggie hoops."
  },
  {
    "id": "prod-jewel-3",
    "name": "Twisted Chunky Statement Gold Cuff Bangle",
    "slug": "twisted-chunky-statement-gold-cuff-bangle",
    "tagline": "Bold architectural twisted rope silhouette in high-mirror 18K gold vermeil.",
    "headline": "Bold architectural twisted rope silhouette in high-mirror 18K gold vermeil.",
    "category": "Jewelry",
    "startingPrice": 18500,
    "oldPrice": 24000,
    "rating": 4.9,
    "reviewCount": 30,
    "stockCount": 17,
    "description": "Sculptural poise for the discerning eye. Cast in durable stainless steel and electroplated in rich 18K yellow gold with a high-mirror finish, this open cuff bangle features a striking twisted cable motif. The open back allows gentle tension adjustment to fit wrists of various sizes securely without sliding off. Wear alone as a singular power statement or stack with dainty chains.",
    "bulletDetails": {
      "fabric": "18K Gold Plated Stainless Steel (Anti-tarnish, water-resistant)",
      "fit": "Adjustable open cuff (2.4 inch interior diameter)",
      "length": "Band width: 8mm",
      "care": "Wipe with microfiber jewelry cloth",
      "availableSizes": [
        "Adjustable One Size"
      ],
      "availableColors": [
        "18K Yellow Gold High Shine"
      ]
    },
    "sizeAndFitNote": "Can be gently squeezed or widened to fit all wrist sizes comfortably.",
    "styleWith": [
      {
        "productId": "prod-ankara-1",
        "productName": "Vibrant Ankara Peplum Mermaid Gown",
        "reason": "Adds bold metallic wrist presence to African wax prints"
      },
      {
        "productId": "prod-dress-3",
        "productName": "Emerald Pleated Corset Midi Dress",
        "reason": "Striking contrast against deep jewel tones"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1611591475152-477754382742?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Castorly Stock",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@castorlystock",
        "alt": "Front view of twisted chunky statement gold cuff bangle"
      },
      {
        "url": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sabrianna",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sabrianna",
        "alt": "Detail view of twisted gold rope motif and mirror finish"
      },
      {
        "url": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Brooke Cagle",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@brookecagle",
        "alt": "Lifestyle look of chunky gold cuff wrist styling"
      }
    ],
    "reviews": [
      {
        "id": "rev-jw3-1",
        "author": "Dr. Jumoke Fashola",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "Substantial weight and mirror shine",
        "comment": "Has a very reassuring weight to it. Looks like real solid gold from a luxury boutique. Cuffs onto the wrist securely."
      },
      {
        "id": "rev-jw3-2",
        "author": "Halima Sanusi",
        "location": "Kano, Kano State",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Adjusts easily",
        "comment": "I have smaller wrists and was able to squeeze it gently to fit snugly without bending out of shape."
      },
      {
        "id": "rev-jw3-3",
        "author": "Chisom Obi",
        "location": "Enugu, Enugu State",
        "rating": 4.8,
        "date": "1 month ago",
        "title": "Prompt delivery",
        "comment": "Delivered in great packaging with pay on delivery convenience."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 18500,
        "originalPrice": 23125,
        "savings": 4625,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 33300,
        "originalPrice": 37000,
        "savings": 3700,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 46250,
        "originalPrice": 55500,
        "savings": 9250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Twisted Chunky Statement Gold Cuff Bangle",
    "shortBenefit": "Bold architectural twisted rope silhouette in high-mirror 18K gold vermeil."
  },
  {
    "id": "prod-jewel-4",
    "name": "Crystal Embellished Chandelier Drop Earrings",
    "slug": "crystal-embellished-chandelier-drop-earrings",
    "tagline": "Cascading brilliant faceted crystals designed for gala soirées and Owambe celebrations.",
    "headline": "Cascading brilliant faceted crystals designed for gala soirées and Owambe celebrations.",
    "category": "Jewelry",
    "startingPrice": 19500,
    "oldPrice": 26000,
    "rating": 4.9,
    "reviewCount": 31,
    "stockCount": 15,
    "description": "Pure celebratory radiance. Featuring cascading multi-tier faceted Austrian crystals hand-prong set in an openwork gold-plated chandelier frame, these statement earrings catch every beam of light with scintillating brilliance. Engineered with a hollow-core setting to remain remarkably lightweight on the earlobe throughout five-hour wedding receptions and gala celebrations.",
    "bulletDetails": {
      "fabric": "Faceted Austrian Crystal Stones in 18K Gold Plated Alloy",
      "fit": "Post-back drop earrings with wide comfort bullet clutch backs",
      "length": "Drop length: 2.8 inches; Width: 1.2 inches",
      "care": "Store in jewelry pouch; wipe with soft microfiber lens cloth",
      "availableSizes": [
        "One Size"
      ],
      "availableColors": [
        "Clear Crystal & 18K Gold",
        "Blush Champagne Crystal"
      ]
    },
    "sizeAndFitNote": "Engineered lightweight setting prevents uncomfortable earlobe pulling.",
    "styleWith": [
      {
        "productId": "prod-top-4",
        "productName": "Embroidered Lace Peplum Evening Blouse",
        "reason": "Adds celebratory sparkle to rich corded lace"
      },
      {
        "productId": "prod-jump-2",
        "productName": "One Shoulder Draped Satin Jumpsuit",
        "reason": "Frames the face with brilliant gala luminescence"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1570891836654-d4961a7b6929?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Ksenia Chernaya",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@kseniachernaya",
        "alt": "Front view of crystal embellished chandelier drop earrings"
      },
      {
        "url": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sabrianna",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sabrianna",
        "alt": "Detail view of faceted crystal cuts and prong settings"
      },
      {
        "url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Ali Pazani",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@alipazani",
        "alt": "Gala evening look wearing crystal chandelier drop earrings"
      }
    ],
    "reviews": [
      {
        "id": "rev-jw4-1",
        "author": "Ronke Doherty",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "1 week ago",
        "title": "Surprisingly lightweight!",
        "comment": "Normally big chandelier earrings pull down my earlobes, but these were so comfortable I forgot I had them on. The sparkle is blinding under event hall lighting."
      },
      {
        "id": "rev-jw4-2",
        "author": "Zubaida Garba",
        "location": "Kano, Kano State",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Magnificent sparkle",
        "comment": "Wore to an engagement and received endless compliments from friends. Very good quality stones."
      },
      {
        "id": "rev-jw4-3",
        "author": "Nneka Eze",
        "location": "Asaba, Delta State",
        "rating": 4.8,
        "date": "1 month ago",
        "title": "Safe delivery",
        "comment": "Arrived securely packaged in bubble wrap and a presentation box."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 19500,
        "originalPrice": 24375,
        "savings": 4875,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 35100,
        "originalPrice": 39000,
        "savings": 3900,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 48750,
        "originalPrice": 58500,
        "savings": 9750,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Crystal Embellished Chandelier Drop Earrings",
    "shortBenefit": "Cascading brilliant faceted crystals designed for gala soirées and Owambe celebrations."
  },
  {
    "id": "prod-ling-1",
    "name": "Silky Lace Trim Robe and Slip Set",
    "slug": "silky-lace-trim-robe-and-slip-set",
    "tagline": "Sensual silk-touch satin paired with delicate eyelash lace for intimate luxury.",
    "headline": "Sensual silk-touch satin paired with delicate eyelash lace for intimate luxury.",
    "category": "Lingerie & Loungewear",
    "startingPrice": 28000,
    "oldPrice": 35000,
    "rating": 4.9,
    "reviewCount": 35,
    "stockCount": 14,
    "description": "A celebration of romantic femininity. Crafted from ultra-smooth, lightweight silk-touch satin, this coordinated two-piece lounge set includes an adjustable bias-cut camisole slip dress trimmed with French eyelash lace along the V-neckline and hem, plus a matching belted kimono robe with scalloped lace sleeves. Perfect for bridal morning preparations, luxury travel, and unwinding in private tranquility.",
    "bulletDetails": {
      "fabric": "96% Silk-Feel Polyester Satin, 4% Spandex with Nylon Eyelash Lace",
      "fit": "Relaxed bias slip with wrap kimono robe and tie sash",
      "length": "Slip: 34 inches; Robe: 36 inches",
      "care": "Hand wash cool in lingerie bag; line dry",
      "availableSizes": [
        "S (UK 6-8)",
        "M (UK 10-12)",
        "L (UK 14-16)",
        "XL (UK 18)"
      ],
      "availableColors": [
        "Blush Petal",
        "Bridal Pearl White",
        "Midnight Noir"
      ]
    },
    "sizeAndFitNote": "Adjustable slip shoulder straps allow custom bust coverage.",
    "styleWith": [
      {
        "productId": "prod-jewel-2",
        "productName": "Freshwater Pearl Drop Huggie Earrings",
        "reason": "Adds delicate heirloom beauty to bridal mornings"
      },
      {
        "productId": "prod-shoe-3",
        "productName": "Braided Leather Low Wedge Slides",
        "reason": "Coordinates soft bedroom and resort lounging"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Alena Koval",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@alenakoval",
        "alt": "Front view of silky lace trim robe and slip set"
      },
      {
        "url": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Laura Chouette",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@laurachouette",
        "alt": "Detail view of delicate French eyelash lace on satin hem"
      },
      {
        "url": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Tamara Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@tamarabellis",
        "alt": "Bridal morning boudoir look wearing silky robe set"
      }
    ],
    "reviews": [
      {
        "id": "rev-ln1-1",
        "author": "Adaeze Nwosu",
        "location": "Lekki, Lagos",
        "rating": 5,
        "date": "3 days ago",
        "title": "Purchased for my wedding morning prep!",
        "comment": "Looked magnificent in my bridal getting-ready photos. The lace is so delicate and soft, not scratchy. The satin feels butter-soft."
      },
      {
        "id": "rev-ln1-2",
        "author": "Zainab Aliyu",
        "location": "Maitama, Abuja",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Extremely comfortable satin",
        "comment": "Breathes well and doesn't get sticky. The blush color is romantic and sweet."
      },
      {
        "id": "rev-ln1-3",
        "author": "Khadija Sani",
        "location": "Kano, Kano State",
        "rating": 4.8,
        "date": "1 month ago",
        "title": "Prompt doorstep delivery",
        "comment": "Arrived discreetly in a neat presentation box with nationwide pay on delivery."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 28000,
        "originalPrice": 35000,
        "savings": 7000,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 50400,
        "originalPrice": 56000,
        "savings": 5600,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 70000,
        "originalPrice": 84000,
        "savings": 14000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Silky Lace Trim Robe and Slip Set",
    "shortBenefit": "Sensual silk-touch satin paired with delicate eyelash lace for intimate luxury."
  },
  {
    "id": "prod-ling-2",
    "name": "Modal Cotton Piped Pajama Lounge Set",
    "slug": "modal-cotton-piped-pajama-lounge-set",
    "tagline": "Butter-soft breathable modal jersey tailored with contrast satin piping.",
    "headline": "Butter-soft breathable modal jersey tailored with contrast satin piping.",
    "category": "Lingerie & Loungewear",
    "startingPrice": 26000,
    "oldPrice": 33000,
    "rating": 4.9,
    "reviewCount": 38,
    "stockCount": 16,
    "description": "Reclaim peaceful nights and lazy Sunday mornings. Spun from sustainably harvested beechwood modal blended with long-staple cotton, this classic pajama set feels cool to the touch and drapes like a dream. Featuring a button-front notched collar shirt with a chest pocket and matching straight-leg trousers with an elasticized drawstring waistband. Finished with contrast white satin piping.",
    "bulletDetails": {
      "fabric": "95% Beechwood Modal Jersey, 5% Elastane",
      "fit": "Relaxed classic menswear-inspired tailored pajama set",
      "length": "Shirt: 25 inches; Pants: 39 inches outseam",
      "care": "Machine wash cold delicate; tumble dry low or line dry",
      "availableSizes": [
        "S (UK 8-10)",
        "M (UK 12-14)",
        "L (UK 16-18)",
        "XL (UK 20)"
      ],
      "availableColors": [
        "Dusty Blush Rose",
        "Cloud Grey",
        "Navy Blue"
      ]
    },
    "sizeAndFitNote": "Relaxed cut designed for sleeping comfort. True to size.",
    "styleWith": [
      {
        "productId": "prod-shoe-3",
        "productName": "Braided Leather Low Wedge Slides",
        "reason": "Coordinates relaxed at-home morning lounge"
      },
      {
        "productId": "prod-bag-4",
        "productName": "Minimalist Pebbled Leather Crossbody Bag",
        "reason": "Practical companion for quick hotel errand runs"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Castorly Stock",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@castorlystock",
        "alt": "Front view of modal cotton piped pajama lounge set"
      },
      {
        "url": "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Sarah Dorweiler",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@sarahdorweiler",
        "alt": "Detail view of modal jersey weave and contrast satin piping"
      },
      {
        "url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Dom Hill",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@domhill",
        "alt": "Sunday morning coffee look wearing modal pajama set"
      }
    ],
    "reviews": [
      {
        "id": "rev-ln2-1",
        "author": "Yetunde Soyinka",
        "location": "Ikoyi, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "Coolest pajamas in hot weather!",
        "comment": "Modal cotton is a game changer for Nigerian nights without 24-hour generator power. Stays cool against the skin and washes without pilling."
      },
      {
        "id": "rev-ln2-2",
        "author": "Blessing Igwe",
        "location": "Asaba, Delta State",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Butter-soft fabric",
        "comment": "You honestly never want to take them off. The piping detail makes you feel put together even in bed."
      },
      {
        "id": "rev-ln2-3",
        "author": "Halima Usman",
        "location": "Abuja (FCT)",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Great gift item",
        "comment": "Bought for my sister's birthday and she called me raving about the softness. Fast dispatch."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 26000,
        "originalPrice": 32500,
        "savings": 6500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 46800,
        "originalPrice": 52000,
        "savings": 5200,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 65000,
        "originalPrice": 78000,
        "savings": 13000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Modal Cotton Piped Pajama Lounge Set",
    "shortBenefit": "Butter-soft breathable modal jersey tailored with contrast satin piping."
  },
  {
    "id": "prod-ling-3",
    "name": "Seamless Sculpting Ribbed Lounge Romper",
    "slug": "seamless-sculpting-ribbed-lounge-romper",
    "tagline": "Contouring 4-way stretch micro-rib unitard designed for effortless lounging and athleisure.",
    "headline": "Contouring 4-way stretch micro-rib unitard designed for effortless lounging and athleisure.",
    "category": "Lingerie & Loungewear",
    "startingPrice": 22500,
    "oldPrice": 29000,
    "rating": 4.8,
    "reviewCount": 26,
    "stockCount": 15,
    "description": "Modern minimalism crafted for ultimate freedom of movement. Knitted using seamless tubular micro-rib technology from breathable nylon and spandex, this sculpting lounge romper gently contours the tummy, waist, and thighs without uncomfortable digging seams. Features a scoop neckline, low scoop back, and wide supportive shoulder straps. Layer under an oversized cotton poplin shirt or kimono robe for effortless off-duty style.",
    "bulletDetails": {
      "fabric": "90% Seamless Polyamide, 10% Spandex 4-Way Stretch",
      "fit": "Sculpted compression contour with non-digging leg bands",
      "length": "Mid-thigh biker romper (6-inch inseam)",
      "care": "Machine wash cold gentle; hang dry",
      "availableSizes": [
        "XS/S (UK 6-8)",
        "M/L (UK 10-14)",
        "XL/XXL (UK 16-18)"
      ],
      "availableColors": [
        "Blush Petal",
        "Caramel Nude",
        "Midnight Black"
      ]
    },
    "sizeAndFitNote": "Seamless four-way stretch holds firmly without restricting breathing.",
    "styleWith": [
      {
        "productId": "prod-top-3",
        "productName": "Crisp Cotton Poplin Oversized Shirt",
        "reason": "Adds effortless layered city polish"
      },
      {
        "productId": "prod-shoe-4",
        "productName": "Cushioned Leather Minimal Flatform Sandals",
        "reason": "Completes sleek athleisure lounge look"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Pete Bellis",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@petebellis",
        "alt": "Front view of seamless sculpting ribbed lounge romper"
      },
      {
        "url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Apostolos Vamvouras",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@apostolosvamvouras",
        "alt": "Detail view of seamless 4-way micro rib knit and scoop back"
      },
      {
        "url": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Alex Perez",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@a2ephotography",
        "alt": "Lifestyle model relaxing in sculpting ribbed romper"
      }
    ],
    "reviews": [
      {
        "id": "rev-ln3-1",
        "author": "Kiki Thomas",
        "location": "Victoria Island, Lagos",
        "rating": 5,
        "date": "5 days ago",
        "title": "Holds everything in smoothly!",
        "comment": "Great compression without suffocating you. I throw an oversized button-up shirt over it and head out for coffee. Fantastic quality."
      },
      {
        "id": "rev-ln3-2",
        "author": "Zainab Bello",
        "location": "Abuja (FCT)",
        "rating": 4.8,
        "date": "2 weeks ago",
        "title": "No see-through issues",
        "comment": "Squat-proof and not transparent at all. The blush shade is very pretty."
      },
      {
        "id": "rev-ln3-3",
        "author": "Chidera Okafor",
        "location": "Awka, Anambra",
        "rating": 4.7,
        "date": "3 weeks ago",
        "title": "Comfortable seamless straps",
        "comment": "Straps don't dig into shoulders. Very happy with the purchase."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 22500,
        "originalPrice": 28125,
        "savings": 5625,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 40500,
        "originalPrice": 45000,
        "savings": 4500,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 56250,
        "originalPrice": 67500,
        "savings": 11250,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Seamless Sculpting Ribbed Lounge Romper",
    "shortBenefit": "Contouring 4-way stretch micro-rib unitard designed for effortless lounging and athleisure."
  },
  {
    "id": "prod-kids-1",
    "name": "Girls Embroidered Floral Tulle Party Dress",
    "slug": "girls-embroidered-floral-tulle-party-dress",
    "tagline": "Multi-layered soft tulle with delicate pastel floral embroidery and a satin bow sash.",
    "headline": "Multi-layered soft tulle with delicate pastel floral embroidery and a satin bow sash.",
    "category": "Kids Fashion",
    "startingPrice": 22000,
    "oldPrice": 28000,
    "rating": 5,
    "reviewCount": 31,
    "stockCount": 12,
    "description": "Make every little girl feel like a fairytale princess on celebration days. Crafted with multiple layers of cloud-soft, non-scratchy tulle over a 100% pure breathable cotton lining, this party dress features delicate embroidered floral appliqués across the bodice and a gleaming satin ribbon sash that ties into a back bow. Ideal for birthday celebrations, church thanksgiving, and flower girl duties at family weddings.",
    "bulletDetails": {
      "fabric": "Soft Poly Tulle with 100% Pure Hypoallergenic Cotton Lining",
      "fit": "Fit-and-flare princess party dress with back sash tie",
      "length": "Knee length (lined fully)",
      "care": "Gentle cold hand wash; line dry in shade; steam tulle lightly",
      "availableSizes": [
        "Age 2-3 Yrs",
        "Age 4-5 Yrs",
        "Age 6-7 Yrs",
        "Age 8-9 Yrs",
        "Age 10-11 Yrs"
      ],
      "availableColors": [
        "Blush Rose Petal",
        "Pure Bridal White",
        "Champagne Gold"
      ]
    },
    "sizeAndFitNote": "100% cotton lining ensures zero itchiness against tender children's skin.",
    "styleWith": [
      {
        "productId": "prod-jewel-2",
        "productName": "Freshwater Pearl Drop Huggie Earrings",
        "reason": "Matching mother-and-daughter wedding guest celebration elegance"
      },
      {
        "productId": "prod-dress-1",
        "productName": "Blush Satin Wrap Midi Dress",
        "reason": "Coordinates coordinated family holiday photo looks"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Senjuti Kundu",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@senjutikundu",
        "alt": "Front view of girls embroidered floral tulle party dress"
      },
      {
        "url": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Valerie Elash",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@valerieelash",
        "alt": "Detail view of pastel floral embroidery and satin waist bow"
      },
      {
        "url": "https://images.unsplash.com/photo-1476234251651-f353703a034d?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Daiga Ellaby",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@daiga_ellaby",
        "alt": "Little girl smiling in birthday party tulle dress"
      }
    ],
    "reviews": [
      {
        "id": "rev-kd1-1",
        "author": "Mrs. Folashade Adeyemi",
        "location": "Ikeja, Lagos",
        "rating": 5,
        "date": "2 days ago",
        "title": "Zero complaints of itching from my 4-year-old!",
        "comment": "Usually my daughter cries and pulls off party dresses because of itchy tulle seams, but this one is completely lined with super soft cotton. She danced happily all through her birthday party."
      },
      {
        "id": "rev-kd1-2",
        "author": "Hauwa Mohammed",
        "location": "Maitama, Abuja",
        "rating": 5,
        "date": "1 week ago",
        "title": "Looked gorgeous for wedding flower girl",
        "comment": "The floral embroidery on the chest is exquisite. Fits true to the age sizing chart."
      },
      {
        "id": "rev-kd1-3",
        "author": "Chinyere Okon",
        "location": "Port Harcourt, Rivers",
        "rating": 5,
        "date": "3 weeks ago",
        "title": "Prompt delivery in neat packaging",
        "comment": "Delivered to our doorstep in Rivers State without hassle. Pay on delivery made it stress free."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 22000,
        "originalPrice": 27500,
        "savings": 5500,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 39600,
        "originalPrice": 44000,
        "savings": 4400,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 55000,
        "originalPrice": 66000,
        "savings": 11000,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Girls Embroidered Floral Tulle Party Dress",
    "shortBenefit": "Multi-layered soft tulle with delicate pastel floral embroidery and a satin bow sash."
  },
  {
    "id": "prod-kids-2",
    "name": "Boys Ankara Accent Linen Two Piece Set",
    "slug": "boys-ankara-accent-linen-two-piece-set",
    "tagline": "Tailored breathable linen shirt with authentic African wax print placket and shorts.",
    "headline": "Tailored breathable linen shirt with authentic African wax print placket and shorts.",
    "category": "Kids Fashion",
    "startingPrice": 23500,
    "oldPrice": 30000,
    "rating": 4.9,
    "reviewCount": 28,
    "stockCount": 11,
    "description": "Dress young gentlemen in smart, culturally proud celebration style. Tailored from cool, breathable washed linen-cotton, this dapper two-piece set features a mandarin-collar shirt accented with vibrant authentic Ankara wax print detailing on the collar, button placket, and chest pocket. Paired with coordinating tailored shorts with an adjustable elasticized waistband and functional front pockets. Built for church thanksgiving, birthday milestones, and family Owambes.",
    "bulletDetails": {
      "fabric": "70% Breathable Linen, 30% Cotton with 100% Genuine Wax Print Trims",
      "fit": "Tailored mandarin shirt with adjustable elastic-waist shorts",
      "length": "Shorts: Knee-length; Shirt: Standard fit",
      "care": "Machine wash cold gentle; warm iron; do not bleach",
      "availableSizes": [
        "Age 2-3 Yrs",
        "Age 4-5 Yrs",
        "Age 6-7 Yrs",
        "Age 8-9 Yrs",
        "Age 10-12 Yrs"
      ],
      "availableColors": [
        "Oatmeal Linen & Royal Wax",
        "Blush Linen & Coral Wax"
      ]
    },
    "sizeAndFitNote": "Elasticated waistband inside shorts accommodates growth comfortably.",
    "styleWith": [
      {
        "productId": "prod-ankara-1",
        "productName": "Vibrant Ankara Peplum Mermaid Gown",
        "reason": "Coordinates family Owambe and holiday matching looks"
      },
      {
        "productId": "prod-coord-1",
        "productName": "Relaxed Linen Blend Two Piece Set",
        "reason": "Harmonizes natural linen aesthetics across parent & child"
      }
    ],
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Oladimeji Odunsi",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@oladimeg",
        "alt": "Front view of boys Ankara accent linen two piece set"
      },
      {
        "url": "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Ebun Oluwole",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@ebunoluwole",
        "alt": "Detail view of authentic African wax print placket and mandarin collar"
      },
      {
        "url": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=80",
        "photographer": "Gift Habeshaw",
        "source": "Unsplash",
        "sourceUrl": "https://unsplash.com/@gifthabeshaw",
        "alt": "Young boy smiling at church thanksgiving in tailored linen set"
      }
    ],
    "reviews": [
      {
        "id": "rev-kd2-1",
        "author": "Bolanle Adeleke",
        "location": "Victoria Island, Lagos",
        "rating": 5,
        "date": "4 days ago",
        "title": "He looked like a handsome little prince!",
        "comment": "Wore this for our family Thanksgiving service. The linen kept him cool and the Ankara details are so vibrant. The adjustable waist on the shorts is a lifesaver."
      },
      {
        "id": "rev-kd2-2",
        "author": "Amina Danjuma",
        "location": "Garki, Abuja",
        "rating": 4.9,
        "date": "2 weeks ago",
        "title": "Very neat tailoring",
        "comment": "Clean stitching and sturdy buttons that don't fall off during active play. Highly recommended."
      },
      {
        "id": "rev-kd2-3",
        "author": "Nneka Obi",
        "location": "Enugu, Enugu State",
        "rating": 4.8,
        "date": "3 weeks ago",
        "title": "Fast delivery",
        "comment": "Arrived in 3 days. Loved inspecting the package at delivery before paying."
      }
    ],
    "packages": [
      {
        "id": "pkg-1",
        "name": "1 Piece (Single Design)",
        "quantity": 1,
        "price": 23500,
        "originalPrice": 29375,
        "savings": 5875,
        "freeDelivery": true
      },
      {
        "id": "pkg-2",
        "name": "2 Pieces (Curated Duo Bundle)",
        "quantity": 2,
        "price": 42300,
        "originalPrice": 47000,
        "savings": 4700,
        "badge": "MOST POPULAR",
        "freeDelivery": true
      },
      {
        "id": "pkg-3",
        "name": "3 Pieces (Complete Fashion Edit)",
        "quantity": 3,
        "price": 58750,
        "originalPrice": 70500,
        "savings": 11750,
        "badge": "BEST VALUE",
        "freeDelivery": true
      }
    ],
    "shortName": "Boys Ankara Accent Linen Two Piece Set",
    "shortBenefit": "Tailored breathable linen shirt with authentic African wax print placket and shorts."
  }
]);
