import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, HelpCircle, MessageCircle, Phone, ArrowLeft, Sparkles } from 'lucide-react';
import { ALL_FAQS, FAQ_CATEGORIES } from '../data/faqs';

interface FaqPageProps {
  navigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("order-1");

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((item) => {
      const matchesCat =
        selectedCategory === "All Questions" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Template Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#8A7F8E] mb-6">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#C2185B] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#C2185B] font-bold">Sizing Guide &amp; FAQs</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-2 bg-[#FFE4EC] border border-[#E75480]/30 px-3 py-1 rounded-[5px]">
            <HelpCircle className="w-3.5 h-3.5 text-[#E75480]" />
            <span>Blush &amp; Bloom Support Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#2D2430] tracking-tight font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#8A7F8E] mt-2 max-w-2xl mx-auto">
            Everything you need to know about our UK sizing guide, Pay on Delivery, fabric care, and free nationwide delivery across Nigeria.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 sm:p-5 shadow-xs mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A7F8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search help topics (e.g. UK sizing, delivery time, pay on delivery, fabric care)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFF5F8] border border-[#FFE4EC] focus:border-[#E75480] focus:bg-white focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] pl-10 pr-4 py-2.5 text-sm transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 text-xs font-mono scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-[5px] whitespace-nowrap transition-all font-semibold ${
                    isActive
                      ? 'bg-[#E75480] text-white font-bold shadow-xs'
                      : 'bg-[#FFE4EC]/40 text-[#2D2430] hover:text-[#C2185B] hover:bg-[#FFE4EC] border border-[#FFE4EC]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#FFE4EC] rounded-[5px] overflow-hidden shadow-xs transition-all hover:border-[#E75480]/30"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#2D2430] hover:text-[#C2185B] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{faq.question}</span>
                      {faq.popular && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 font-mono px-2 py-0.5 rounded-[5px]">
                          <Sparkles className="w-2.5 h-2.5 text-[#E75480]" />
                          Popular
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8A7F8E] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#C2185B]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#8A7F8E] leading-relaxed border-t border-[#FFE4EC] pt-3 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-8 text-center text-[#8A7F8E] text-xs">
              No matching questions found for "{searchQuery}". Try searching for "delivery", "sizing", or "returns".
            </div>
          )}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 bg-white border border-[#FFE4EC] rounded-[5px] p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <h3 className="text-lg font-bold text-[#2D2430] font-display">
            Still Have Questions About Your Order or Sizing?
          </h3>
          <p className="text-xs text-[#8A7F8E] max-w-md mx-auto">
            Our Lagos customer care desk is available on WhatsApp and direct telephone calls to assist you with address verification, measurements, and answers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="https://wa.me/2348068515242"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-mono font-bold py-3 px-6 rounded-[5px] flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto bg-[#2D2430] hover:bg-[#1D1620] text-white text-xs font-mono font-bold py-3 px-6 rounded-[5px] flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D4A373]" />
              <span>Contact Dispatch Center</span>
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto bg-[#FFF5F8] border border-[#E75480]/40 text-[#C2185B] hover:bg-[#FFE4EC] text-xs font-mono font-bold py-3 px-6 rounded-[5px] flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Looks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
