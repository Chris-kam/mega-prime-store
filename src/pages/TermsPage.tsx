import React from 'react';
import { ShieldCheck, Truck, RotateCcw, PhoneCall } from 'lucide-react';

interface TermsPageProps {
  navigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-2 bg-[#FFE4EC] border border-[#E75480]/30 px-3 py-1 rounded-[5px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E75480]" />
            <span>Consumer Protection & FCCPA 2018 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D2430] tracking-tight font-display">
            Terms of Sale & Delivery Agreement
          </h1>
          <p className="text-xs sm:text-sm text-[#8A7F8E] mt-2">
            Governing all direct purchases on Blush &amp; Bloom by Megaprime across Nigeria.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#2D2430]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E75480]" />
              <span>1. 100% Free Nationwide Delivery Policy</span>
            </h2>
            <p>
              Megaprime provides completely free delivery across all 36 States of the Federation and the Federal Capital Territory (Abuja). Couriers are strictly prohibited from demanding extra shipping surcharges, bridge tolls, or logistics top-ups from buyers.
            </p>
            <p>
              The package price published on the product offer is the complete, final amount payable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#D4A373]" />
              <span>2. Mandatory Pre-Dispatch Verification</span>
            </h2>
            <p>
              To eliminate false dispatches and reduce courier returns across Nigeria, <strong>all orders require voice telephone or WhatsApp verification</strong> by our Ikeja customer fulfillment desk before the parcel leaves our warehouse.
            </p>
            <p>
              Orders with unreachable or disconnected phone numbers will be paused until valid contact is established.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#E75480]" />
              <span>3. 7-Day Replacement Guarantee</span>
            </h2>
            <p>
              In accordance with the Federal Competition and Consumer Protection Act (FCCPA 2018), every buyer is protected by our 7-Day Replacement Guarantee:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#8A7F8E]">
              <li>If the item sustains physical damage during transit, notify our customer care within 7 days.</li>
              <li>If any electrical or mechanical component fails under normal recommended use within 7 days, we issue an immediate replacement item at zero additional courier fee.</li>
              <li>Damage arising from misuse, dropping, water damage to non-waterproof electrical bases, or improper voltage charging is not covered.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display">
              4. Package Bundles & Discounts
            </h2>
            <p>
              Discounted bundles (e.g. "Buy 2 Save ₦10,000" or "Buy 2 Get 1 Free") apply only when units are shipped simultaneously to the same delivery address.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display">
              5. Governing Law & Dispute Resolution
            </h2>
            <p>
              These terms are governed by the Laws of the Federal Republic of Nigeria. Inquiries or dispute resolutions may be directed to our Legal & Consumer Relations Desk at <strong>support@megaprime.store</strong> or phone +234 806 851 5242.
            </p>
          </section>

          <div className="pt-4 border-t border-[#FFE4EC] text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-[#E75480] hover:bg-[#C2185B] text-white font-bold px-6 py-2.5 rounded-[5px] text-xs transition-colors"
            >
              Return to Megaprime Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
