import React from 'react';
import { Sparkles, Truck, ShieldCheck, Heart, Crown, CheckCircle2 } from 'lucide-react';

interface MarqueeTickerProps {
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ className = '' }) => {
  const tickerItems = [
    { text: 'FREE DOORSTEP DELIVERY ACROSS ALL 36 STATES', icon: Truck },
    { text: 'PAY ON DELIVERY AVAILABLE NATIONWIDE', icon: ShieldCheck },
    { text: 'TAILORED FOR NIGERIAN CURVES (UK 6–20)', icon: Heart },
    { text: '100% QUALITY INSPECTED AT IKEJA LOGISTICS HUB', icon: CheckCircle2 },
    { text: 'ZERO ACCOUNT SIGN-UP HASSLE', icon: Crown },
    { text: '7-DAY HASSLE-FREE SIZING REPLACEMENT', icon: Sparkles },
  ];

  return (
    <div
      className={`relative overflow-hidden bg-[#2D2430] text-white py-2.5 sm:py-3 border-y border-[#3D3242] select-none ${className}`}
      aria-label="Store highlights ticker"
    >
      <div className="flex animate-marquee-smooth items-center">
        {/* Render twice for seamless loop */}
        {[...tickerItems, ...tickerItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 shrink-0 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-white/90"
            >
              <Icon className="w-3.5 h-3.5 text-[#E75480] shrink-0" />
              <span>{item.text}</span>
              <span className="text-[#D4A373] text-sm ml-2">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

