import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/2348160844108?text=${encodeURIComponent(
    "Hello Megaprime, I'd like to make an inquiry about your products and delivery."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Small popover notice */}
      {showTooltip && (
        <div className="mb-2 bg-white text-[#2D2430] text-xs py-2 px-3.5 rounded-[5px] shadow-lg border border-[#FFE4EC] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="font-semibold text-[#C2185B]">Need help?</span>
          <span className="text-[#8A7F8E]">Chat with Lagos Hub on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#8A7F8E] hover:text-[#2D2430] ml-1"
            aria-label="Close WhatsApp prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        aria-label="WhatsApp Support Desk"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="text-xs font-bold tracking-wide uppercase pr-1 font-mono hidden sm:inline">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
