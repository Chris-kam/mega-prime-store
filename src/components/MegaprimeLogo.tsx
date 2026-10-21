import React from 'react';

interface MegaprimeLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'colored';
  iconOnly?: boolean;
}

export const MegaprimeLogo: React.FC<MegaprimeLogoProps> = ({
  className = 'h-8 sm:h-9 w-auto',
  variant = 'colored',
  iconOnly = false,
}) => {
  const isDark = variant === 'dark'; // for dark backgrounds like footer
  const textColor = isDark ? '#FFFFFF' : '#2D2430';
  const primeColor = isDark ? '#D4A373' : '#C2185B';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Emblem SVG Icon */}
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square shrink-0"
      >
        <defs>
          <linearGradient id="mpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E75480" />
            <stop offset="100%" stopColor="#C2185B" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6C280" />
            <stop offset="100%" stopColor="#D4A373" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#C2185B" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Rounded Diamond Badge Background */}
        <rect
          x="2"
          y="2"
          width="40"
          height="40"
          rx="10"
          fill="url(#mpGrad)"
          filter="url(#shadow)"
        />

        {/* Subtle Inner Glow Border */}
        <rect
          x="3.5"
          y="3.5"
          width="37"
          height="37"
          rx="8.5"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="1.5"
        />

        {/* Stylized Modern 'M' Ribbon with Prime Crown Arch */}
        <path
          d="M12 30V15.5L20.5 24.5C21.3 25.3 22.7 25.3 23.5 24.5L32 15.5V30"
          stroke="#FFFFFF"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Prime Star / Diamond Accent above M */}
        <path
          d="M22 10.5L23.5 13.5L26.5 14L24 16.5L24.8 19.5L22 18L19.2 19.5L20 16.5L17.5 14L20.5 13.5L22 10.5Z"
          fill="url(#goldGrad)"
        />
      </svg>

      {/* Typography Wordmark */}
      {!iconOnly && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline tracking-tight font-display font-black text-xl sm:text-2xl">
            <span style={{ color: textColor }}>Mega</span>
            <span style={{ color: primeColor }} className="ml-0.5">
              prime
            </span>
            <span className="text-[#D4A373] text-xs font-mono font-bold ml-1">✦</span>
          </div>
          <span
            className="text-[9px] font-mono tracking-widest uppercase font-bold mt-0.5"
            style={{ color: isDark ? '#D4A373' : '#C2185B' }}
          >
            Blush &amp; Bloom Fashion Edit
          </span>
        </div>
      )}
    </div>
  );
};
