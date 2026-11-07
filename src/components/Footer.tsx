import React, { useState } from 'react';
import {
  ArrowUp,
  ShieldCheck,
  Truck,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Sparkles,
  Heart,
  Send,
  CheckCircle2,
  CreditCard,
  Banknote,
  PackageCheck,
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { MegaprimeLogo } from './MegaprimeLogo';
import { Product } from '../types';

interface FooterProps {
  navigate: (path: string) => void;
  products: Product[];
  onOpenPipelineModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, products, onOpenPipelineModal }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 3000);
    }
  };

  return (
    <footer className="w-full text-slate-300 font-sans bg-[#2D2430] border-t border-[#3D3242]">
      {/* Back to top banner */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#241C27] hover:bg-[#1D1620] text-[#D4A373] hover:text-white py-3 text-xs font-mono font-bold flex items-center justify-center gap-2 border-b border-[#3D3242] transition-colors group"
      >
        <ArrowUp className="w-4 h-4 text-[#E75480] group-hover:-translate-y-0.5 transition-transform" />
        <span>BACK TO TOP</span>
      </button>

      {/* VIP Club / Newsletter Bar (Template-inspired) */}
      <div className="border-b border-[#3D3242] bg-[#29202C]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left max-w-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E75480] bg-[#FFE4EC]/10 border border-[#E75480]/30 px-2.5 py-0.5 rounded-[5px] inline-block mb-1.5">
                VIP Style Circle
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                Join the Blush &amp; Bloom Style Circle
              </h3>
              <p className="text-xs text-[#8A7F8E] mt-1">
                Receive secret weekend Ankara drops, tailored lookbooks, and early access to limited luxury collections across Nigeria.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 text-emerald-400 px-5 py-3 rounded-[5px] text-xs font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Welcome to the Style Circle! Lookbook on its way.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email or WhatsApp number..."
                    className="bg-[#241C27] border border-[#3D3242] text-white text-xs px-4 py-3 rounded-[5px] focus:outline-hidden focus:border-[#E75480] placeholder:text-[#8A7F8E]/60 flex-1 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-[#E75480] hover:bg-[#C2185B] text-white text-xs font-mono font-bold px-5 py-3 rounded-[5px] transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs active:scale-95"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

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
            <div className="pt-2 flex flex-col space-y-2 text-xs text-[#D4A373] font-mono">
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
              <span className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pay on Delivery (Cash or Bank Transfer)</span>
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
                    className="hover:text-[#E75480] hover:translate-x-1.5 transition-all text-left truncate max-w-full block"
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
                  className="hover:text-[#E75480] hover:translate-x-1.5 transition-all text-left block"
                >
                  UK Sizing Guide (Bust, Waist &amp; Hips)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#how-it-works')}
                  className="hover:text-[#E75480] hover:translate-x-1.5 transition-all text-left block"
                >
                  Pay on Delivery Guide (All 36 States)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-[#E75480] hover:translate-x-1.5 transition-all text-left block"
                >
                  Fabric Care &amp; Washing Instructions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-[#E75480] hover:translate-x-1.5 transition-all text-left block"
                >
                  7-Day Sizing Exchange Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-[#E75480] hover:translate-x-1.5 transition-all text-left block"
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

        {/* Payment & Security Badges */}
        <div className="mt-12 pt-8 border-t border-[#3D3242] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8A7F8E]">
            <span className="text-white font-bold">Accepted Payment Options:</span>
            <span className="bg-[#241C27] border border-[#3D3242] px-2.5 py-1 rounded-[5px] text-[#D4A373]">
              Pay on Delivery (Cash)
            </span>
            <span className="bg-[#241C27] border border-[#3D3242] px-2.5 py-1 rounded-[5px] text-[#D4A373]">
              Bank Transfer on Delivery
            </span>
            <span className="bg-[#241C27] border border-[#3D3242] px-2.5 py-1 rounded-[5px] text-[#D4A373]">
              POS on Delivery (Lagos/Abuja/PH)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <PackageCheck className="w-4 h-4" />
            <span>Zero Advance Deposit Required</span>
          </div>
        </div>

        {/* Photography & License Attribution Banner */}
        <div className="mt-8 pt-6 border-t border-[#3D3242] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A7F8E] font-mono gap-4">
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
