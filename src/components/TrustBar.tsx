import React from 'react';
import { Truck, ShieldCheck, PhoneCall, CheckCircle2, RotateCcw } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#2D2430] text-white border-y border-[#3D3242] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Item 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[5px] bg-[#E75480]/15 border border-[#E75480]/30 text-[#E75480] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">100% Free Delivery</h4>
              <p className="text-xs text-[#8A7F8E] mt-1 leading-snug">
                Across all 36 States + Abuja with zero hidden courier fees.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[5px] bg-[#D4A373]/15 border border-[#D4A373]/30 text-[#D4A373] flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">Phone Verification</h4>
              <p className="text-xs text-[#8A7F8E] mt-1 leading-snug">
                Our dispatch officer calls to confirm your address before sending.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[5px] bg-[#E75480]/15 border border-[#E75480]/30 text-[#E75480] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">Pre-Dispatch Inspection</h4>
              <p className="text-xs text-[#8A7F8E] mt-1 leading-snug">
                Every unit is physically tested at our Ikeja logistics hub.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[5px] bg-[#D4A373]/15 border border-[#D4A373]/30 text-[#D4A373] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">7-Day Guarantee</h4>
              <p className="text-xs text-[#8A7F8E] mt-1 leading-snug">
                Hassle-free replacement if transit damage or fault is detected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
