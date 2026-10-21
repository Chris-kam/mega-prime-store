import React from 'react';
import { CheckCircle2, MessageCircle, Phone, Truck, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
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
          <div className="w-20 h-20 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5] text-[#E75480]" />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 bg-[#FFE4EC] text-[#C2185B] text-xs font-mono font-bold uppercase tracking-wider px-4 py-1 rounded-[5px] border border-[#E75480]/30 mb-4">
              <span>Order Received Successfully</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#2D2430] tracking-tight font-display">
              Thank You, {firstName}!
            </h1>
            <p className="text-base sm:text-lg text-[#2D2430] mt-2">
              Your order details have been recorded with <strong className="text-[#C2185B]">Megaprime</strong>.
            </p>
            <p className="text-sm text-[#8A7F8E] mt-1 font-semibold">
              <span className="text-[#C2185B]">Recommended final step:</span> click below to confirm your order directly on WhatsApp for priority dispatch.
            </p>
          </div>

          {/* Reference Banner */}
          <div className="mt-8 border-t border-[#FFE4EC] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFF5F8] border border-[#FFE4EC] p-4 rounded-[5px]">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A7F8E]">
                Order Reference Code
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#C2185B] font-mono tracking-wider mt-0.5">
                {orderRef}
              </div>
            </div>
            <div className="text-xs font-mono text-[#C2185B] bg-[#FFE4EC] border border-[#E75480]/30 px-3 py-1.5 rounded-[5px] font-bold">
              100% Free Nationwide Delivery
            </div>
          </div>

          {/* WhatsApp Confirmation CTA */}
          <div className="mt-6">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base sm:text-lg py-4 px-6 rounded-[5px] flex items-center justify-center gap-3 transition-all shadow-md active:scale-[0.99]"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              <span>CONFIRM ORDER ON WHATSAPP (INSTANT QUEUE)</span>
            </a>
            <p className="text-[11px] text-center text-[#8A7F8E] font-mono mt-2">
              Opens WhatsApp with your pre-formatted order receipt ready to send to our Lagos dispatch desk.
            </p>
          </div>

          {/* Receipt Details Table */}
          {details && (
            <div className="mt-8 bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm">
              <h3 className="font-bold text-[#2D2430] border-b border-[#FFE4EC] pb-2 text-sm font-display flex items-center justify-between">
                <span>Digital Order Receipt</span>
                <span className="text-[#C2185B] font-mono text-xs">{details.orderDate}</span>
              </h3>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]">
                <span className="text-[#8A7F8E]">Product:</span>
                <span className="font-bold text-[#2D2430] text-right">{details.productName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]">
                <span className="text-[#8A7F8E]">Selected Package:</span>
                <span className="font-semibold text-[#2D2430] text-right">{details.packageName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]">
                <span className="text-[#8A7F8E]">Delivery Fee:</span>
                <span className="font-bold text-[#C2185B] font-mono text-right">₦0 (100% Free)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]">
                <span className="text-[#8A7F8E] font-bold">Total Amount Payable:</span>
                <span className="font-black text-[#C2185B] text-base font-display text-right">
                  {details.totalFormatted}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]">
                <span className="text-[#8A7F8E]">Delivery Contact:</span>
                <span className="font-medium text-[#2D2430] text-right font-mono">
                  {details.customerName} ({details.phone})
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]">
                <span className="text-[#8A7F8E]">Destination State:</span>
                <span className="font-bold text-[#2D2430] text-right">{details.state}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#FFE4EC]">
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

          {/* Next Steps 3-Box Timeline */}
          <div className="mt-8 pt-6 border-t border-[#FFE4EC]">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-4 text-center sm:text-left">
              What Happens Next?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 text-xs">
                <div className="w-7 h-7 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] font-mono font-bold flex items-center justify-center mb-2">
                  1
                </div>
                <div className="font-bold text-[#2D2430] font-display">Verification Call</div>
                <p className="text-[#8A7F8E] mt-1 text-[11px] leading-relaxed">
                  Our dispatch officer will phone or WhatsApp you to verify your delivery address and schedule.
                </p>
              </div>

              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 text-xs">
                <div className="w-7 h-7 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] font-mono font-bold flex items-center justify-center mb-2">
                  2
                </div>
                <div className="font-bold text-[#2D2430] font-display">Hub Inspection</div>
                <p className="text-[#8A7F8E] mt-1 text-[11px] leading-relaxed">
                  Your parcel is tested and securely packed at our central Ikeja distribution facility.
                </p>
              </div>

              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 text-xs">
                <div className="w-7 h-7 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] font-mono font-bold flex items-center justify-center mb-2">
                  3
                </div>
                <div className="font-bold text-[#2D2430] font-display">Doorstep Delivery</div>
                <p className="text-[#8A7F8E] mt-1 text-[11px] leading-relaxed">
                  Courier delivers straight to your hands with 100% free delivery across Nigeria.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons: Call Support or Browse More */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+2348068515242"
              className="w-full sm:w-auto bg-[#FFE4EC] hover:bg-[#FFE4EC]/70 text-[#2D2430] font-bold text-xs sm:text-sm py-3 px-6 rounded-[5px] border border-[#E75480]/30 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C2185B]" />
              <span>Call Dispatch Hub (+234 8160844108)</span>
            </a>
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-[5px] flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Other Products</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
