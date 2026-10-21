import React from 'react';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

interface PrivacyPageProps {
  navigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-2 bg-[#FFE4EC] border border-[#E75480]/30 px-3 py-1 rounded-[5px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E75480]" />
            <span>NDPA • GDPR • CCPA Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D2430] tracking-tight font-display">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#8A7F8E] mt-2">
            Effective Date: Updated for 2026. Blush &amp; Bloom by Megaprime, Lagos State, Nigeria.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#2D2430]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#E75480]" />
              <span>1. Direct Commerce & Zero Account Philosophy</span>
            </h2>
            <p>
              At <strong>Megaprime</strong>, we operate strictly on a direct-response commerce model designed to maximize consumer privacy. Unlike traditional marketplaces, we do <strong>not</strong> require user registration, account passwords, login profiles, or credit card storage.
            </p>
            <p>
              We only collect the minimum personal data strictly necessary to fulfill your doorstep package delivery across Nigeria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E75480]" />
              <span>2. Information We Collect</span>
            </h2>
            <p>When you submit an order form on our website, we collect:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#8A7F8E]">
              <li><strong className="text-[#2D2430]">Contact Name:</strong> To address the package to you.</li>
              <li><strong className="text-[#2D2430]">Telephone & WhatsApp Number:</strong> For our dispatch officer to call and verify your physical delivery location before courier transport.</li>
              <li><strong className="text-[#2D2430]">Delivery Address, State & City:</strong> To transport your parcel to your door.</li>
              <li><strong className="text-[#2D2430]">Email Address (Optional):</strong> To send a digital confirmation receipt if provided.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display">
              3. Purpose of Processing (Nigeria Data Protection Act 2023)
            </h2>
            <p>
              In compliance with the Nigeria Data Protection Act (NDPA 2023) and global privacy standards, your information is processed strictly for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#8A7F8E]">
              <li>Pre-dispatch telephone and WhatsApp verification.</li>
              <li>Couriers navigating to your specified home or office landmark.</li>
              <li>7-Day replacement warranty tracking in the event of transit defect.</li>
            </ul>
            <p>
              We do <strong>not sell, rent, or trade</strong> your phone numbers or personal records to any third-party advertisers or marketing data brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display">
              4. Data Security & Storage
            </h2>
            <p>
              All interactions on megaprime.store are encrypted over modern SSL/TLS protocols. Order records are stored in secure access-controlled fulfillment dashboards and automatically archived after delivery completion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2430] font-display">
              5. Your Rights & Data Officer Contact
            </h2>
            <p>
              Under NDPA guidelines, you have the right to request deletion or modification of your order history once dispatch is fulfilled. To exercise your privacy rights, email our Data Protection Desk at:
            </p>
            <div className="bg-[#FFF5F8] border border-[#FFE4EC] p-4 rounded-[5px] font-mono text-xs text-[#2D2430]">
              <strong>Email:</strong> privacy@megaprime.store<br />
              <strong>Fulfillment Hub:</strong> Plot 14, Commercial Avenue, Ikeja, Lagos State, Nigeria.<br />
              <strong>Customer Line:</strong> +234 806 851 5242
            </div>
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
