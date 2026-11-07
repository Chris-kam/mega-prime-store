import React from 'react';
import { CheckCircle2, MessageCircle, Phone, Truck, ShieldCheck, ArrowRight, ShoppingBag, Clock, PackageCheck, Home } from 'lucide-react';
import { OrderResult } from '../types';

interface ThankYouPageProps {
  orderResult?: OrderResult | null;
  lastOrderResult?: OrderResult | null;
  navigate: (path: string) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ orderResult, lastOrderResult, navigate }) => {
  const activeResult = orderResult || lastOrderResult;
  const details = activeResult?.orderDetails;
  const firstName = details?.customerName ? details.customerName.trim().split(" ")[0] : "Valued Customer";
  const orderRef = details?.orderRef || activeResult?.orderId || "MEGA-ORD-RECEIVED";

  const getWhatsAppUrl = () => {
    if (!details) return `https://wa.me/2348160844108`;
    const msg = `Order Reference: ${details.orderRef}
Customer Name: ${details.customerName}
Phone: ${details.phone}
Delivery Address: ${details.deliveryAddress}
State: ${details.state}
Product: ${details.productName}
Quantity: ${details.packageName} (${details.quantity}pc${details.quantity > 1 ? "s" : ""})
Total Amount: ${details.totalFormatted}`;

    return `https://wa.me/2348160844108?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[5px] border border-[#FFE4EC] shadow-sm overflow-hidden p-6 sm:p-10">
          {/* Top Success Badge */}
          <div className="w-20 h-20 rounded-full bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5] text-[#E75480]" />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 bg-[#FFE4EC] text-[#C2185B] text-xs font-mono font-bold uppercase tracking-wider px-4 py-1 rounded-[5px] border border-[#E75480]/30 mb-4 shadow-xs">
              <span>Order Received Successfully</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#2D2430] tracking-tight font-display">
              Thank You, {firstName}!
            </h1>
            <p className="text-base sm:text-lg text-[#2D2430] mt-2 font-medium">
              Your fashion order has been safely recorded with <strong className="text-[#C2185B]">Blush &amp; Bloom by Megaprime</strong>.
            </p>
            <p className="text-xs sm:text-sm text-[#8A7F8E] mt-1.5">
              <span className="text-[#C2185B] font-bold">Recommended next step:</span> Click below to confirm directly with our Lagos dispatch officer via WhatsApp for expedited packing.
            </p>
          </div>

          {/* Reference Banner */}
          <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFF5F8] border border-[#FFE4EC] p-4 sm:p-5 rounded-[5px]">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A7F8E]">
                Order Reference Code
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#C2185B] font-mono tracking-wider mt-0.5">
                {orderRef}
              </div>
            </div>
            <div className="text-xs font-mono text-[#C2185B] bg-[#FFE4EC] border border-[#E75480]/30 px-3.5 py-1.5 rounded-[5px] font-bold">
              100% Free Nationwide Delivery
            </div>
          </div>

          {/* WhatsApp Confirmation CTA */}
          <div className="mt-6">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-[5px] flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] font-mono"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>CONFIRM ORDER ON WHATSAPP (FAST TRACK)</span>
            </a>
            <p className="text-[11px] text-center text-[#8A7F8E] font-mono mt-2">
              Opens WhatsApp with your pre-formatted order summary ready for our dispatch team.
            </p>
          </div>

          {/* Receipt Details Table */}
          {details && (
            <div className="mt-8 bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-5 sm:p-6 space-y-3 text-xs sm:text-sm">
              <h3 className="font-bold text-[#2D2430] border-b border-[#FFE4EC] pb-2 text-sm font-display flex items-center justify-between">
                <span>Digital Order Receipt</span>
                <span className="text-[#C2185B] font-mono text-xs">{details.orderDate}</span>
              </h3>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]/70">
                <span className="text-[#8A7F8E]">Product:</span>
                <span className="font-bold text-[#2D2430] text-right">{details.productName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]/70">
                <span className="text-[#8A7F8E]">Selected Package:</span>
                <span className="font-semibold text-[#2D2430] text-right">{details.packageName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]/70">
                <span className="text-[#8A7F8E]">Delivery Fee:</span>
                <span className="font-bold text-[#C2185B] font-mono text-right">₦0 (100% Free)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]/70">
                <span className="text-[#8A7F8E] font-bold">Total Amount Payable:</span>
                <span className="font-black text-[#C2185B] text-base font-display text-right">
                  {details.totalFormatted}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]/70">
                <span className="text-[#8A7F8E]">Delivery Contact:</span>
                <span className="font-medium text-[#2D2430] text-right font-mono">
                  {details.customerName} ({details.phone})
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]/70">
                <span className="text-[#8A7F8E]">Destination State:</span>
                <span className="font-bold text-[#2D2430] text-right">{details.state}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]/70">
                <span className="text-[#8A7F8E]">Street Address:</span>
                <span className="font-medium text-[#2D2430] text-right max-w-xs">{details.deliveryAddress}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-[#8A7F8E]">Estimated Delivery:</span>
                <span className="font-bold text-[#C2185B] text-right font-mono">
                  {details.estimatedDelivery}
                </span>
              </div>
            </div>
          )}

          {/* Next Steps 3-Box Timeline (Template Pattern) */}
          <div className="mt-8 pt-6 border-t border-[#FFE4EC]">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-4 text-center sm:text-left">
              Fulfillment Journey &amp; Next Steps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 text-xs card-hover-effect">
                <div className="w-8 h-8 rounded-full bg-[#FFE4EC] text-[#C2185B] font-mono font-bold flex items-center justify-center mb-2.5">
                  1
                </div>
                <div className="font-bold text-[#2D2430] mb-1 font-display">Dispatch Phone Call</div>
                <p className="text-[#8A7F8E] text-[11px] leading-relaxed">
                  Our verification officer will call your phone to verify your exact street address.
                </p>
              </div>

              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 text-xs card-hover-effect">
                <div className="w-8 h-8 rounded-full bg-[#FFE4EC] text-[#C2185B] font-mono font-bold flex items-center justify-center mb-2.5">
                  2
                </div>
                <div className="font-bold text-[#2D2430] mb-1 font-display">QA Inspection &amp; Pack</div>
                <p className="text-[#8A7F8E] text-[11px] leading-relaxed">
                  Your piece is inspected for flawless seams and steam pressed at our Ikeja logistics center.
                </p>
              </div>

              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 text-xs card-hover-effect">
                <div className="w-8 h-8 rounded-full bg-[#FFE4EC] text-[#C2185B] font-mono font-bold flex items-center justify-center mb-2.5">
                  3
                </div>
                <div className="font-bold text-[#2D2430] mb-1 font-display">Doorstep Delivery &amp; POS</div>
                <p className="text-[#8A7F8E] text-[11px] leading-relaxed">
                  Courier arrives at your gate. Open, inspect your dress, and pay via cash, POS, or transfer!
                </p>
              </div>
            </div>
          </div>

          {/* Action to continue browsing */}
          <div className="mt-8 text-center pt-6 border-t border-[#FFE4EC] flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto bg-[#E75480] hover:bg-[#C2185B] text-white text-xs font-mono font-bold px-6 py-3 rounded-[5px] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>EXPLORE MORE LOOKS</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto bg-white hover:bg-[#FFE4EC]/50 text-[#2D2430] text-xs font-mono font-bold px-6 py-3 rounded-[5px] border border-[#FFE4EC] transition-colors flex items-center justify-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
