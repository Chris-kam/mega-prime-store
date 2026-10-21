import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Order Tracking & Delivery Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C2185B] bg-[#FFE4EC] px-3.5 py-1.5 rounded-[5px] border border-[#E75480]/30 shadow-xs">
            Fashion Concierge &amp; Verification Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D2430] tracking-tight mt-3 font-display">
            Contact Blush &amp; Bloom by Megaprime
          </h1>
          <p className="text-sm sm:text-base text-[#8A7F8E] mt-2">
            Have questions about garment sizing, fabric care, bridal party orders, or delivery dispatch to your state? Our Lagos concierge team is standing by to assist you.
          </p>
        </div>

        {/* Contact info grid & form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Direct Info */}
          <div className="bg-white rounded-[5px] p-6 sm:p-8 border border-[#FFE4EC] shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-[#2D2430] border-b border-[#FFE4EC] pb-3 flex items-center justify-between font-display">
              <span>Customer Care Lines</span>
              <span className="text-[#C2185B] text-xs font-mono">Lagos Hub</span>
            </h2>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#E75480]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#8A7F8E] uppercase font-bold">
                  Order Phone Line
                </div>
                <div className="font-bold text-[#2D2430] text-base mt-0.5 font-display">
                  +234 8160844108
                </div>
                <p className="text-xs text-[#8A7F8E] mt-0.5">
                  Mon – Sat: 8:00 AM – 7:00 PM (Direct Pre-Dispatch Verification)
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-[5px] bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#8A7F8E] uppercase font-bold">
                  WhatsApp Dispatch Desk
                </div>
                <a
                  href="https://wa.me/2348160844108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#C2185B] hover:text-[#E75480] hover:underline text-base mt-0.5 block font-display"
                >
                  Chat with +234 806 851 5242 →
                </a>
                <p className="text-xs text-[#8A7F8E] mt-0.5">
                  Instant order confirmation, status tracking, and dispatch assistance.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#E75480]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#8A7F8E] uppercase font-bold">
                  Electronic Mail
                </div>
                <a
                  href="mailto:support@megaprime.store"
                  className="font-bold text-[#2D2430] hover:text-[#C2185B] transition-colors text-sm mt-0.5 block font-mono"
                >
                  support@megaprime.store
                </a>
                <p className="text-xs text-[#8A7F8E] mt-0.5">
                  Replies typically within 2 to 4 business hours.
                </p>
              </div>
            </div>

            {/* Physical Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#E75480]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#8A7F8E] uppercase font-bold">
                  Fulfillment & Logistics Facility
                </div>
                <div className="font-bold text-[#2D2430] text-sm mt-0.5">
                  Plot 14, Commercial Avenue, Ikeja, Lagos State, Nigeria
                </div>
                <p className="text-xs text-[#8A7F8E] mt-0.5">
                  Central distribution depot serving all 36 Nigerian states & FCT.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="bg-white rounded-[5px] p-6 sm:p-8 border border-[#FFE4EC] shadow-xs">
            <h2 className="text-lg font-bold text-[#2D2430] border-b border-[#FFE4EC] pb-3 mb-6 font-display">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#E75480]" />
                </div>
                <h3 className="font-bold text-[#2D2430] text-lg font-display">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-[#8A7F8E] max-w-sm mx-auto">
                  Thank you! Our customer service representative will review your message and reply via phone call or WhatsApp shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-[#C2185B] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mrs. Funke Johnson"
                    className="w-full bg-white border border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-1.5">
                    Phone or WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full bg-white border border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] px-3.5 py-2.5 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-1.5">
                    Subject / Reason
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] px-3.5 py-2.5 text-sm"
                  >
                    <option value="Order Tracking & Delivery Inquiry">Order Tracking & Delivery Inquiry</option>
                    <option value="Product Details & Compatibility">Product Details & Compatibility</option>
                    <option value="Bulk Purchase or Wholesale Units">Bulk Purchase or Wholesale Units</option>
                    <option value="Warranty & 7-Day Replacement Request">Warranty & 7-Day Replacement Request</option>
                    <option value="General Inquiries">General Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide your Order ID (if applicable) and detailed inquiry..."
                    className="w-full bg-white border border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] px-3.5 py-2.5 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-sm py-3 px-6 rounded-[5px] flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND INQUIRY TO DISPATCH DESK</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
