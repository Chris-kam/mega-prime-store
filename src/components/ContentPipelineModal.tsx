import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Key,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Database,
  ExternalLink,
  X,
  Sliders,
  Image as ImageIcon,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  getApiKeys,
  saveApiKeys,
  getStoredCatalog,
  saveStoredCatalog,
  clearStoredCatalogCache,
  runPipelineForProduct,
  ApiKeysConfig,
} from '../services/contentPipeline';
import { PRODUCTS, deduplicateProducts } from '../data/products';
import { Product } from '../types';

interface ContentPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProductSlug?: string;
  onCatalogUpdated: (updatedProducts: Product[]) => void;
}

export const ContentPipelineModal: React.FC<ContentPipelineModalProps> = ({
  isOpen,
  onClose,
  currentProductSlug,
  onCatalogUpdated,
}) => {
  const [keys, setKeys] = useState<ApiKeysConfig>({
    unsplashKey: '',
    pexelsKey: '',
    geminiKey: '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'regenerate' | 'apikeys' | 'guide'>('regenerate');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>(
    currentProductSlug || PRODUCTS[0]?.slug || ''
  );
  const [useUnsplash, setUseUnsplash] = useState(true);
  const [usePexels, setUsePexels] = useState(false);
  const [useAiCopy, setUseAiCopy] = useState(true);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setKeys(getApiKeys());
      if (currentProductSlug) {
        setSelectedProductSlug(currentProductSlug);
      }
    }
  }, [isOpen, currentProductSlug]);

  if (!isOpen) return null;

  const addLog = (msg: string) => {
    setLogMessages((prev) => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiKeys(keys);
    setSavedSuccess(true);
    addLog('API keys saved to browser cache successfully.');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // 1. Regenerate Single Product
  const handleRegenerateSingle = async () => {
    const catalog = getStoredCatalog();
    const target = catalog.find((p) => p.slug === selectedProductSlug);
    if (!target) {
      addLog(`Error: Could not locate product "${selectedProductSlug}"`);
      return;
    }

    setIsProcessing(true);
    setProgressPercent(20);
    setProgressText(`Researching trends & copy for "${target.name}"...`);
    addLog(`Initiating pipeline for: ${target.name}`);

    try {
      if (useAiCopy) {
        addLog(`Grounding with Google Search on "${target.category}" trends...`);
      }
      if (useUnsplash) {
        addLog(`Querying Unsplash API for licensed photography...`);
      } else if (usePexels) {
        addLog(`Querying Pexels API for licensed photography...`);
      }

      const updated = await runPipelineForProduct(target, {
        useUnsplash,
        usePexels,
        useAiCopy,
      });

      setProgressPercent(90);
      addLog(`Updated copy and image metadata for "${updated.name}".`);

      const nextCatalog = catalog.map((p) => (p.slug === target.slug ? updated : p));
      saveStoredCatalog(nextCatalog);
      onCatalogUpdated(nextCatalog);

      setProgressPercent(100);
      setProgressText(`Successfully regenerated "${updated.name}"!`);
      addLog(`Saved changes to persistent catalog cache.`);
    } catch (err: any) {
      addLog(`Error: ${err.message}`);
      setProgressText(`Pipeline encountered an issue: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Regenerate All 40 Products
  const handleRegenerateAll = async () => {
    const catalog = [...getStoredCatalog()];
    const total = catalog.length;
    setIsProcessing(true);
    setLogMessages([]);
    addLog(`Starting batch pipeline for all ${total} fashion products...`);

    const updatedCatalog: Product[] = [];

    for (let i = 0; i < total; i++) {
      const prod = catalog[i];
      const pct = Math.round(((i + 1) / total) * 100);
      setProgressPercent(pct);
      setProgressText(`Processing (${i + 1}/${total}): ${prod.name}`);
      addLog(`[${i + 1}/${total}] Processing ${prod.category} -> "${prod.name}"`);

      try {
        const updated = await runPipelineForProduct(prod, {
          useUnsplash,
          usePexels,
          useAiCopy,
        });
        updatedCatalog.push(updated);
      } catch (err: any) {
        addLog(`Warning on ${prod.slug}: ${err.message}. Retaining current data.`);
        updatedCatalog.push(prod);
      }
    }

    const deduped = deduplicateProducts(updatedCatalog);
    saveStoredCatalog(deduped);
    onCatalogUpdated(deduped);
    setProgressPercent(100);
    setProgressText(`Completed batch update of ${deduped.length} fashion products!`);
    addLog(`All ${deduped.length} unique products cached and synchronized.`);
    setIsProcessing(false);
  };

  // 3. Reset to Bundled Default
  const handleResetCatalog = () => {
    clearStoredCatalogCache();
    const cleanDefault = deduplicateProducts(PRODUCTS);
    onCatalogUpdated(cleanDefault);
    addLog(`Reset catalog cache to default ${cleanDefault.length} fashion items.`);
    setProgressText('Catalog reset to default 40 curated fashion looks.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white border border-[#FFE4EC] rounded-[5px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#2D2430] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#3D3242]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-[5px] bg-[#E75480] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Content Pipeline & API Engine
                </h3>
                <span className="text-[10px] font-mono bg-[#E75480] text-white px-2 py-0.5 rounded-[5px]">
                  Blush & Bloom
                </span>
              </div>
              <p className="text-xs text-[#8A7F8E]">
                Gemini Search Grounding • Unsplash/Pexels API • Imagen Fallbacks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8A7F8E] hover:text-white p-1 rounded-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#FFE4EC] bg-[#FFF5F8] px-4 pt-2">
          <button
            onClick={() => setActiveTab('regenerate')}
            className={`px-4 py-2 text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'regenerate'
                ? 'border-[#C2185B] text-[#C2185B] bg-white'
                : 'border-transparent text-[#8A7F8E] hover:text-[#2D2430]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate Content</span>
          </button>
          <button
            onClick={() => setActiveTab('apikeys')}
            className={`px-4 py-2 text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'apikeys'
                ? 'border-[#C2185B] text-[#C2185B] bg-white'
                : 'border-transparent text-[#8A7F8E] hover:text-[#2D2430]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>API Keys & Configuration</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-[#C2185B] text-[#C2185B] bg-white'
                : 'border-transparent text-[#8A7F8E] hover:text-[#2D2430]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation & Setup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: REGENERATE CONTENT */}
          {activeTab === 'regenerate' && (
            <div className="space-y-6">
              <div className="bg-[#FFF5F8] border border-[#FFE4EC] p-4 rounded-[5px] text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#C2185B] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#C2185B]" />
                  <span>Licensed, Non-Scraped Content Pipeline</span>
                </div>
                <p className="text-[#8A7F8E] leading-relaxed">
                  Fetches licensed high-resolution imagery from the official Unsplash or Pexels API
                  with full photographer credits, and uses Gemini 3.8 Flash with Google Search
                  grounding to craft structured fashion descriptions, sizing guides, and authentic
                  Nigerian reviews.
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 p-3 bg-white border border-[#FFE4EC] rounded-[5px] text-xs font-semibold cursor-pointer hover:border-[#E75480]">
                  <input
                    type="checkbox"
                    checked={useAiCopy}
                    onChange={(e) => setUseAiCopy(e.target.checked)}
                    className="accent-[#C2185B]"
                  />
                  <span>AI Trend Copy (Gemini)</span>
                </label>
                <label className="flex items-center gap-2 p-3 bg-white border border-[#FFE4EC] rounded-[5px] text-xs font-semibold cursor-pointer hover:border-[#E75480]">
                  <input
                    type="checkbox"
                    checked={useUnsplash}
                    onChange={(e) => {
                      setUseUnsplash(e.target.checked);
                      if (e.target.checked) setUsePexels(false);
                    }}
                    className="accent-[#C2185B]"
                  />
                  <span>Unsplash API Photos</span>
                </label>
                <label className="flex items-center gap-2 p-3 bg-white border border-[#FFE4EC] rounded-[5px] text-xs font-semibold cursor-pointer hover:border-[#E75480]">
                  <input
                    type="checkbox"
                    checked={usePexels}
                    onChange={(e) => {
                      setUsePexels(e.target.checked);
                      if (e.target.checked) setUseUnsplash(false);
                    }}
                    className="accent-[#C2185B]"
                  />
                  <span>Pexels API Photos</span>
                </label>
              </div>

              {/* Single Product Action */}
              <div className="bg-white border border-[#FFE4EC] p-4 rounded-[5px] space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430]">
                  Regenerate Single Item
                </h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedProductSlug}
                    onChange={(e) => setSelectedProductSlug(e.target.value)}
                    className="flex-1 bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#C2185B]"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        [{p.category}] {p.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleRegenerateSingle}
                    disabled={isProcessing}
                    className="bg-[#E75480] hover:bg-[#C2185B] text-white text-xs font-bold font-mono px-4 py-2 rounded-[5px] transition-all flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                    <span>Run for Selected</span>
                  </button>
                </div>
              </div>

              {/* Entire Catalog Action */}
              <div className="bg-white border border-[#FFE4EC] p-4 rounded-[5px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430]">
                    Regenerate Entire Catalog (40 Products)
                  </h4>
                  <p className="text-xs text-[#8A7F8E]">
                    Sequential batch pipeline across all 11 categories with live progress.
                  </p>
                </div>
                <button
                  onClick={handleRegenerateAll}
                  disabled={isProcessing}
                  className="bg-[#2D2430] hover:bg-[#1D1620] text-[#D4A373] text-xs font-bold font-mono px-4 py-2.5 rounded-[5px] transition-all flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E75480]" />
                  <span>Run for All 40 Items</span>
                </button>
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#C2185B] font-bold">{progressText}</span>
                    <span className="text-[#8A7F8E]">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#FFE4EC] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#E75480] h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Live Console Logs */}
              {logMessages.length > 0 && (
                <div className="bg-[#1D1620] text-emerald-400 p-3 rounded-[5px] text-[11px] font-mono space-y-1 max-h-36 overflow-y-auto border border-[#3D3242]">
                  {logMessages.map((msg, i) => (
                    <div key={i}>{msg}</div>
                  ))}
                </div>
              )}

              {/* Reset Cache Button */}
              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-[#8A7F8E]">Cached via browser localStorage.</span>
                <button
                  onClick={handleResetCatalog}
                  className="text-[#C2185B] hover:underline font-mono text-xs"
                >
                  Reset Catalog to Default (40 Items)
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: API KEYS CONFIGURATION */}
          {activeTab === 'apikeys' && (
            <form onSubmit={handleSaveKeys} className="space-y-5">
              <div className="bg-[#FFF5F8] border border-[#FFE4EC] p-4 rounded-[5px] text-xs text-[#8A7F8E] space-y-1">
                <span className="font-bold text-[#C2185B]">Store Keys Locally & In Environment:</span>
                <p>
                  You can paste keys here for immediate live use in the browser, or add them to{' '}
                  <code className="text-[#C2185B] font-mono bg-white px-1 py-0.5 rounded-sm">.env</code>{' '}
                  so they load automatically.
                </p>
              </div>

              {/* Unsplash API Key */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#2D2430] uppercase">
                    1. Unsplash Access Key
                  </label>
                  <a
                    href="https://unsplash.com/developers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#C2185B] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="text"
                  placeholder="Paste your Unsplash Access Key here..."
                  value={keys.unsplashKey}
                  onChange={(e) => setKeys({ ...keys, unsplashKey: e.target.value })}
                  className="w-full bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C2185B]"
                />
                <p className="text-[11px] text-[#8A7F8E]">
                  In <code>.env</code>: <code>VITE_UNSPLASH_ACCESS_KEY="your_key_here"</code>
                </p>
              </div>

              {/* Pexels API Key */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#2D2430] uppercase">
                    2. Pexels API Key
                  </label>
                  <a
                    href="https://www.pexels.com/api/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#C2185B] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="text"
                  placeholder="Paste your Pexels API Key here..."
                  value={keys.pexelsKey}
                  onChange={(e) => setKeys({ ...keys, pexelsKey: e.target.value })}
                  className="w-full bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C2185B]"
                />
                <p className="text-[11px] text-[#8A7F8E]">
                  In <code>.env</code>: <code>VITE_PEXELS_API_KEY="your_key_here"</code>
                </p>
              </div>

              {/* Gemini API Key */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#2D2430] uppercase">
                  3. Gemini AI Key (Optional Override)
                </label>
                <input
                  type="password"
                  placeholder="Injected automatically in AI Studio (or enter custom key)"
                  value={keys.geminiKey}
                  onChange={(e) => setKeys({ ...keys, geminiKey: e.target.value })}
                  className="w-full bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C2185B]"
                />
                <p className="text-[11px] text-[#8A7F8E]">
                  Defaults to runtime <code>GEMINI_API_KEY</code> from AI Studio secrets.
                </p>
              </div>

              {savedSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-[5px] text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>API Keys successfully saved! Ready for content pipeline runs.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold font-mono py-2.5 rounded-[5px] text-xs transition-all shadow-xs"
              >
                Save Keys to Browser Cache
              </button>
            </form>
          )}

          {/* TAB 3: DOCUMENTATION */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-[#2D2430] leading-relaxed">
              <div className="border border-[#FFE4EC] rounded-[5px] p-4 bg-[#FFF5F8]">
                <h4 className="font-bold text-[#C2185B] mb-2 font-mono uppercase">
                  Where to Paste API Keys
                </h4>
                <p className="text-[#8A7F8E] mb-3">
                  For permanent configuration without retyping in the browser, open your project’s{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded border border-[#FFE4EC] font-mono text-[#C2185B]">
                    .env
                  </code>{' '}
                  or{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded border border-[#FFE4EC] font-mono text-[#C2185B]">
                    .env.example
                  </code>{' '}
                  file:
                </p>
                <pre className="bg-[#2D2430] text-pink-200 p-3 rounded-[5px] font-mono text-[11px] overflow-x-auto leading-relaxed">
{`# 1. Unsplash API Key (Free developer account)
VITE_UNSPLASH_ACCESS_KEY="your_actual_unsplash_access_key"

# 2. Pexels API Key (Free developer account)
VITE_PEXELS_API_KEY="your_actual_pexels_api_key"

# 3. Gemini API Key (Automatically configured in AI Studio)
GEMINI_API_KEY="your_gemini_api_key"`}
                </pre>
              </div>

              <div className="border border-[#FFE4EC] rounded-[5px] p-4 bg-white">
                <h4 className="font-bold text-[#2D2430] mb-2 font-mono uppercase">
                  Licensing Compliance
                </h4>
                <ul className="list-disc pl-4 space-y-1.5 text-[#8A7F8E]">
                  <li>
                    Every photo displays: <strong>"Photo by [Photographer] on Unsplash / Pexels"</strong> with a direct link to their creator profile.
                  </li>
                  <li>Zero scraping from commercial retail fashion sites.</li>
                  <li>Images are cached locally to minimize API quota usage.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FFF5F8] border-t border-[#FFE4EC] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A7F8E]">
            <Database className="w-3.5 h-3.5 text-[#C2185B]" />
            <span>40 Fashion Items Loaded</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#2D2430] hover:bg-[#1D1620] text-white text-xs font-mono font-bold px-4 py-2 rounded-[5px] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
