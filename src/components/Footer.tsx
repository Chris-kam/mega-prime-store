import React from 'react';
import { ArrowUp, ShieldCheck, Truck, Phone, MessageSquare, Mail, MapPin, Sparkles, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { MegaprimeLogo } from './MegaprimeLogo';
import { Product } from '../types';

interface FooterProps {
  navigate: (path: string) => void;
  products: Product[];
  onOpenPipelineModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, products, onOpenPipelineModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full text-slate-300 font-sans bg-[#2D2430] border-t border-[#3D3242]">
      {/* Back to top banner */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#241C27] hover:bg-[#1D1620] text-[#D4A373] hover:text-white py-3 text-xs font-mono font-bold flex items-center justify-center gap-2 border-b border-[#3D3242] transition-colors"
      >
        <ArrowUp className="w-4 h-4 text-[#E75480]" />
        <span>BACK TO TOP</span>
      </button>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MegaprimeLogo variant="dark" className="h-9 w-auto" />
            </div>
            <p className="text-xs text-[#8A7F8E] leading-relaxed">
              Blush &amp; Bloom by Megaprime is a contemporary African &amp; global fashion house offering curated women's dresses, vibrant Ankara prints, tailored co-ords, bags, and shoes with 100% free nationwide delivery across Nigeria and pay on delivery.
            </p>
            <div className="pt-2 flex flex-col space-y-1.5 text-xs text-[#D4A373] font-mono">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E75480] shrink-0" />
                <span>100% Free Nationwide Doorstep Delivery</span>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>7-Day Sizing Replacement Guarantee</span>
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#E75480] shrink-0" />
                <span>Designed for Nigerian Curves (UK 6–20)</span>
              </span>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-[#3D3242]">
              Collections (11 Categories)
            </h4>
            <ul className="space-y-2 text-xs text-[#8A7F8E]">
              {CATEGORIES.filter((c) => c !== 'All Products').map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
                    className="hover:text-[#E75480] transition-colors text-left truncate max-w-full block"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Shopping & Policies */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-[#3D3242]">
              Shopping &amp; Sizing
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8A7F8E]">
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-[#E75480] transition-colors text-left"
                >
                  UK Sizing Guide (Bust, Waist &amp; Hips)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#how-it-works')}
                  className="hover:text-[#E75480] transition-colors text-left"
                >
                  Pay on Delivery Guide (All 36 States)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-[#E75480] transition-colors text-left"
                >
                  Fabric Care &amp; Washing Instructions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-[#E75480] transition-colors text-left"
                >
                  7-Day Sizing Exchange Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-[#E75480] transition-colors text-left"
                >
                  Privacy Policy &amp; Customer Security
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenPipelineModal}
                  className="text-[#E75480] hover:text-white flex items-center gap-1 font-mono text-[11px] font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Content Pipeline Engine</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch Verification */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-[#3D3242]">
              Dispatch Hub &amp; Support
            </h4>
            <div className="space-y-3 text-xs text-[#8A7F8E]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E75480] shrink-0 mt-0.5" />
                <span>Central Logistics Hub: Ikeja Commercial District, Lagos State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span className="font-mono text-white">0814 000 7890 / 0903 555 1234</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Fashion Concierge Available (8am – 8pm WAT)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8A7F8E] shrink-0" />
                <span className="font-mono">concierge@megaprimestore.com</span>
              </div>
            </div>

            <div className="p-3 bg-[#241C27] border border-[#3D3242] rounded-[5px] text-[11px] text-[#8A7F8E]">
              <strong className="text-white block font-mono">PHONE VERIFICATION POLICY:</strong>
              Every order is directly verified via phone call before dispatch to avoid wrong address returns.
            </div>
          </div>
        </div>

        {/* Photography & License Attribution Banner */}
        <div className="mt-10 pt-6 border-t border-[#3D3242] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A7F8E] font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Megaprime Blush &amp; Bloom. All rights reserved.
          </div>
          <div className="text-center sm:text-right">
            Licensed editorial fashion imagery powered by Unsplash &amp; Pexels API in strict compliance with creator licence guidelines.
          </div>
        </div>
      </div>
    </footer>
  );
};
