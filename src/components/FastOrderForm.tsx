import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Truck,
  ShieldCheck,
  Loader2,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { Product, PackageOption, OrderResult } from '../types';
import { NIGERIAN_STATES, getDeliveryEstimate, formatNaira } from '../data/states';
import {
  submitOrderToGoogleSheets,
  isValidPhoneNumber,
  formatSubmissionDateTime,
} from '../services/orderService';

interface FastOrderFormProps {
  product: Product;
  selectedPackage: PackageOption;
  onSelectPackage: (pkg: PackageOption) => void;
  onOrderSuccess: (result: OrderResult) => void;
  navigate: (path: string) => void;
}

export const FastOrderForm: React.FC<FastOrderFormProps> = ({
  product,
  selectedPackage,
  onSelectPackage,
  onOrderSuccess,
  navigate,
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsappPhone: '',
    email: '',
    state: 'Lagos',
    city: '',
    deliveryAddress: '',
    landmark: '',
    additionalNotes: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field once user starts correcting it
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName || formData.customerName.trim().length < 2) {
      errors.customerName = 'Please enter your full name (at least 2 characters).';
    }

    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (e.g. 0803 123 4567 or +234...).';
    }

    if (formData.whatsappPhone && formData.whatsappPhone.trim().length > 0) {
      if (!isValidPhoneNumber(formData.whatsappPhone)) {
        errors.whatsappPhone = 'Please enter a valid WhatsApp number or leave it blank.';
      }
    }

    if (formData.email && formData.email.trim().length > 0) {
      if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    if (!formData.state || formData.state.trim().length === 0) {
      errors.state = 'Please select your delivery state.';
    }

    if (!formData.city || formData.city.trim().length < 2) {
      errors.city = 'Please enter your city, town, or area.';
    }

    if (!formData.deliveryAddress || formData.deliveryAddress.trim().length < 5) {
      errors.deliveryAddress =
        'Please enter a detailed street address (house/office number and street name).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting || hasSubmitted) {
      return;
    }

    setSubmitError(null);

    // Validate inputs
    if (!validateForm()) {
      const firstErrorElement = document.querySelector('[aria-invalid="true"]');
      firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderRef = `MEGA-ORD-${randomNum}`;
    const submissionDateTime = formatSubmissionDateTime();
    const estimatedDelivery = getDeliveryEstimate(formData.state);

    try {
      const result = await submitOrderToGoogleSheets({
        customer: formData,
        product,
        selectedPackage,
        orderRef,
        orderDate: submissionDateTime,
      });

      if (result.success) {
        setHasSubmitted(true);
        setIsSubmitting(false);

        const orderDetails = {
          orderRef,
          customerName: formData.customerName.trim(),
          phone: formData.phone.trim(),
          whatsappPhone: (formData.whatsappPhone.trim() || formData.phone.trim()),
          email: formData.email.trim(),
          state: formData.state,
          city: formData.city.trim(),
          deliveryAddress: formData.deliveryAddress.trim(),
          landmark: formData.landmark.trim(),
          additionalNotes: formData.additionalNotes.trim(),
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          quantity: selectedPackage.quantity,
          totalPrice: selectedPackage.price,
          totalFormatted: formatNaira(selectedPackage.price),
          orderDate: submissionDateTime,
          estimatedDelivery,
        };

        onOrderSuccess({
          orderId: orderRef,
          orderDetails,
        });
      } else {
        setIsSubmitting(false);
        const detailedMsg =
          result.error ||
          'Your order could not be recorded in our Google Sheets tracker. Please try again or tap the WhatsApp button below to complete your order directly with our dispatch team.';
        setSubmitError(detailedMsg);

        const errElement = document.getElementById('order-submit-error');
        errElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err?.message ||
          'An unexpected network error occurred while submitting your order. Please try again or complete order via WhatsApp.'
      );
    }
  };

  const getWhatsAppFallbackUrl = () => {
    const msg = `Hello Megaprime Dispatch, I would like to confirm my order:
*Product:* ${product.name}
*Package:* ${selectedPackage.name} (${selectedPackage.quantity} pc${selectedPackage.quantity > 1 ? 's' : ''})
*Total Payable:* ${formatNaira(selectedPackage.price)} (Free Delivery)
*Customer Name:* ${formData.customerName || 'N/A'}
*Phone:* ${formData.phone || 'N/A'}
*WhatsApp:* ${formData.whatsappPhone || formData.phone || 'N/A'}
*State:* ${formData.state}
*City/Area:* ${formData.city || 'N/A'}
*Address:* ${formData.deliveryAddress || 'N/A'}
*Landmark:* ${formData.landmark || 'N/A'}
*Notes:* ${formData.additionalNotes || 'N/A'}`;

    return `https://wa.me/2348068515242?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      className="bg-white border-2 border-[#E75480] rounded-[5px] p-6 sm:p-8 shadow-md"
      id="order-form-container"
    >
      {/* Header */}
      <div className="border-b border-[#FFE4EC] pb-5 mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-2 bg-[#FFE4EC] border border-[#E75480]/30 px-3 py-1 rounded-[5px]">
          <Truck className="w-3.5 h-3.5 text-[#E75480]" />
          <span>Step 2: Enter Delivery Details</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#2D2430] font-display">
          Fast Doorstep Order Form
        </h3>
        <p className="text-xs sm:text-sm text-[#8A7F8E] mt-1">
          No sign-up or passwords required. 100% Free Nationwide Delivery across Nigeria.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Package Selector */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2.5">
            Select Offer Package <span className="text-[#E75480]">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.packages.map((pkg) => {
              const isSelected = selectedPackage.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => !isSubmitting && onSelectPackage(pkg)}
                  className={`p-4 rounded-[5px] border-2 cursor-pointer transition-all relative ${
                    isSelected
                      ? 'border-[#E75480] bg-[#FFE4EC]/50 shadow-xs'
                      : 'border-[#FFE4EC] bg-white hover:border-[#E75480]/40'
                  } ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
                >
                  {pkg.badge && (
                    <span className="absolute -top-2.5 right-3 bg-[#D4A373] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-[5px] shadow-xs">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-bold text-[#2D2430] font-display">
                      {pkg.name}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-black text-[#C2185B] font-display">
                      {formatNaira(pkg.price)}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-xs text-[#8A7F8E] line-through font-mono">
                        {formatNaira(pkg.originalPrice)}
                      </span>
                    )}
                  </div>
                  {pkg.savings && pkg.savings > 0 && (
                    <div className="text-[11px] text-[#D4A373] font-mono font-bold mt-1">
                      Sale Highlight: Save {formatNaira(pkg.savings)}
                    </div>
                  )}
                  <div className="text-[11px] text-[#8A7F8E] font-mono mt-1 flex items-center gap-1">
                    <Truck className="w-3 h-3 text-[#E75480]" />
                    <span>Free Nationwide Delivery</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Name & Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div>
            <label
              htmlFor="customerName"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              Full Name <span className="text-[#E75480]">*</span>
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              aria-invalid={!!fieldErrors.customerName}
              placeholder="e.g. Adebayo Johnson"
              className={`w-full bg-white border text-[#2D2430] rounded-[5px] px-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors ${
                fieldErrors.customerName
                  ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                  : 'border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20'
              } ${isSubmitting ? 'bg-slate-50 cursor-not-allowed' : ''}`}
            />
            {fieldErrors.customerName && (
              <p className="text-xs text-red-600 font-mono mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.customerName}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              Phone Number (For Delivery Call) <span className="text-[#E75480]">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#8A7F8E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                aria-invalid={!!fieldErrors.phone}
                placeholder="e.g. 0803 123 4567 or 090..."
                className={`w-full bg-white border text-[#2D2430] rounded-[5px] pl-10 pr-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors font-mono ${
                  fieldErrors.phone
                    ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                    : 'border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20'
                } ${isSubmitting ? 'bg-slate-50 cursor-not-allowed' : ''}`}
              />
            </div>
            {fieldErrors.phone ? (
              <p className="text-xs text-red-600 font-mono mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.phone}</span>
              </p>
            ) : (
              <p className="text-[11px] text-[#8A7F8E] font-mono mt-1">
                Our dispatch officer will call this number before delivery.
              </p>
            )}
          </div>
        </div>

        {/* WhatsApp & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="whatsappPhone"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              WhatsApp Number (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-[#8A7F8E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                id="whatsappPhone"
                name="whatsappPhone"
                value={formData.whatsappPhone}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={!!fieldErrors.whatsappPhone}
                placeholder="e.g. 0803 123 4567"
                className={`w-full bg-white border text-[#2D2430] rounded-[5px] pl-10 pr-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors font-mono ${
                  fieldErrors.whatsappPhone
                    ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                    : 'border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20'
                } ${isSubmitting ? 'bg-slate-50 cursor-not-allowed' : ''}`}
              />
            </div>
            {fieldErrors.whatsappPhone ? (
              <p className="text-xs text-red-600 font-mono mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.whatsappPhone}</span>
              </p>
            ) : (
              <p className="text-[11px] text-[#8A7F8E] font-mono mt-1">
                For instant dispatch updates and tracking via WhatsApp.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8A7F8E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={!!fieldErrors.email}
                placeholder="e.g. you@example.com"
                className={`w-full bg-white border text-[#2D2430] rounded-[5px] pl-10 pr-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors ${
                  fieldErrors.email
                    ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                    : 'border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20'
                } ${isSubmitting ? 'bg-slate-50 cursor-not-allowed' : ''}`}
              />
            </div>
            {fieldErrors.email ? (
              <p className="text-xs text-red-600 font-mono mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.email}</span>
              </p>
            ) : (
              <p className="text-[11px] text-[#8A7F8E] font-mono mt-1">
                To receive a digital receipt of your order.
              </p>
            )}
          </div>
        </div>

        {/* Delivery State & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="state"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              Delivery State <span className="text-[#E75480]">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#8A7F8E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                className="w-full bg-white border border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] pl-10 pr-4 py-3 text-sm appearance-none transition-colors"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st} className="bg-white text-[#2D2430]">
                    {st} {st === 'Lagos' ? '(Lagos Hub — Fast Dispatch)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-[#C2185B] font-mono mt-1 font-semibold">
              {getDeliveryEstimate(formData.state)}
            </p>
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              City / Town / Area <span className="text-[#E75480]">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              aria-invalid={!!fieldErrors.city}
              placeholder="e.g. Ikeja, Lekki, Garki, Bodija, GRA"
              className={`w-full bg-white border text-[#2D2430] rounded-[5px] px-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors ${
                fieldErrors.city
                  ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                  : 'border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20'
              } ${isSubmitting ? 'bg-slate-50 cursor-not-allowed' : ''}`}
            />
            {fieldErrors.city && (
              <p className="text-xs text-red-600 font-mono mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fieldErrors.city}</span>
              </p>
            )}
          </div>
        </div>

        {/* Detailed Street Address */}
        <div>
          <label
            htmlFor="deliveryAddress"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
          >
            Detailed Street Address (House/Office Number & Street){' '}
            <span className="text-[#E75480]">*</span>
          </label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            rows={2}
            value={formData.deliveryAddress}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            aria-invalid={!!fieldErrors.deliveryAddress}
            placeholder="e.g. No. 14 Admiralty Way, Flat 3B, Opposite Zenith Bank"
            className={`w-full bg-white border text-[#2D2430] rounded-[5px] px-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors resize-none ${
              fieldErrors.deliveryAddress
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20'
            } ${isSubmitting ? 'bg-slate-50 cursor-not-allowed' : ''}`}
          />
          {fieldErrors.deliveryAddress && (
            <p className="text-xs text-red-600 font-mono mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fieldErrors.deliveryAddress}</span>
            </p>
          )}
        </div>

        {/* Landmark & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="landmark"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              Nearest Landmark / Bus Stop (Recommended)
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g. Behind Total Filling Station / Near First Bank"
              className="w-full bg-white border border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] px-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="additionalNotes"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430] mb-2"
            >
              Delivery Notes / Preferred Time (Optional)
            </label>
            <input
              type="text"
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="e.g. Call before coming, deliver in afternoon"
              className="w-full bg-white border border-[#FFE4EC] focus:border-[#E75480] focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] px-4 py-3 text-sm placeholder:text-[#8A7F8E]/60 transition-colors"
            />
          </div>
        </div>

        {/* Policy Box */}
        <div className="bg-[#FFE4EC]/50 border border-[#E75480]/30 rounded-[5px] p-4 text-xs text-[#2D2430] space-y-1.5">
          <div className="flex items-center gap-2 text-[#C2185B] font-bold font-mono">
            <ShieldCheck className="w-4 h-4 text-[#E75480]" />
            <span>Megaprime Free Nationwide Delivery Policy:</span>
          </div>
          <p className="text-[#8A7F8E] leading-relaxed text-[11px]">
            No hidden courier charges will ever be requested. Once you submit this form, our
            customer care representative will call or WhatsApp you directly to verify your address
            and coordinate dispatch.
          </p>
        </div>

        {/* Submission Error Banner with WhatsApp Fallback */}
        {submitError && (
          <div
            id="order-submit-error"
            className="bg-red-50 border-2 border-red-300 rounded-[5px] p-4 text-xs space-y-3 animate-fadeIn"
          >
            <div className="flex items-start gap-2.5 text-red-700">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-red-800">
                  Order Could Not Be Saved to Tracker
                </h4>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  {submitError}
                </p>
                <p className="text-[11px] text-red-600 mt-1">
                  Note: The Google Apps Script endpoint returned a failure status. We do not treat
                  unverified or failed submissions as successful. You can retry submission or
                  confirm your order directly with our dispatch desk on WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-[5px] text-xs transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Submission</span>
              </button>
              <a
                href={getWhatsAppFallbackUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-2 rounded-[5px] text-xs transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Complete Order on WhatsApp Instead</span>
              </a>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || hasSubmitted}
            className={`w-full py-4 px-6 rounded-[5px] font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-sm ${
              isSubmitting || hasSubmitted
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-[#E75480] hover:bg-[#C2185B] text-white active:scale-[0.99]'
            }`}
            id="submit-order-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span>PROCESSING YOUR ORDER...</span>
              </>
            ) : hasSubmitted ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>ORDER SUBMITTED SUCCESSFULLY</span>
              </>
            ) : (
              <>
                <span>SUBMIT ORDER NOW • {formatNaira(selectedPackage.price)}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </>
            )}
          </button>

          <div className="mt-3 text-center text-[11px] text-[#8A7F8E] leading-relaxed">
            <span>By submitting, you agree to our </span>
            <button
              type="button"
              onClick={() => navigate('/terms')}
              className="text-[#C2185B] underline hover:text-[#E75480] font-semibold"
            >
              Terms of Sale
            </button>
            <span> and </span>
            <button
              type="button"
              onClick={() => navigate('/privacy')}
              className="text-[#C2185B] underline hover:text-[#E75480] font-semibold"
            >
              Privacy Policy (NDPA & GDPR)
            </button>
            <div className="mt-1 text-[10px] text-[#8A7F8E] font-mono">
              Phone verification call required before dispatch • 7-Day Replacement Guarantee •
              100% Free Nationwide Delivery
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
