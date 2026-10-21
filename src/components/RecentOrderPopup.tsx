import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const RECENT_LOCATIONS = [
  "Lekki Phase 1, Lagos",
  "Garki 2, Abuja (FCT)",
  "Bodija, Ibadan, Oyo State",
  "GRA, Port Harcourt, Rivers",
  "Magodo Phase 2, Lagos",
  "Wuse 2, Abuja",
  "Independence Layout, Enugu",
  "Ikeja GRA, Lagos",
  "Kaduna North, Kaduna",
];

const TIME_AGOS = [
  "2 minutes ago",
  "5 minutes ago",
  "12 minutes ago",
  "18 minutes ago",
  "24 minutes ago",
];

export const RecentOrderPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    location: RECENT_LOCATIONS[0],
    product: PRODUCTS[0].shortName || PRODUCTS[0].name,
    time: TIME_AGOS[0],
  });

  useEffect(() => {
    // Initial delay before first popup
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Periodic interval
    const interval = setInterval(() => {
      const randomLoc = RECENT_LOCATIONS[Math.floor(Math.random() * RECENT_LOCATIONS.length)];
      const randomProd = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      const randomTime = TIME_AGOS[Math.floor(Math.random() * TIME_AGOS.length)];

      setCurrentOrder({
        location: randomLoc,
        product: randomProd.shortName || randomProd.name,
        time: randomTime,
      });
      setVisible(true);

      // Hide after 6 seconds
      setTimeout(() => {
        setVisible(false);
      }, 6000);
    }, 22000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm bg-white border border-[#FFE4EC] rounded-[5px] p-3 shadow-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="w-9 h-9 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 flex items-center justify-center shrink-0 mt-0.5">
        <ShoppingBag className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0 pr-1">
        <div className="text-[11px] text-[#8A7F8E] font-mono flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-[#E75480]" />
          <span>Verified Order • {currentOrder.time}</span>
        </div>
        <div className="text-xs font-bold text-[#2D2430] truncate mt-0.5 font-display">
          {currentOrder.product}
        </div>
        <div className="text-[11px] text-[#C2185B] font-semibold truncate">
          Purchased in {currentOrder.location}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-[#8A7F8E] hover:text-[#2D2430] p-0.5"
        aria-label="Dismiss order notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
