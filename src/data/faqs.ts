export interface FAQCategoryItem {
  id: string;
  category: string;
  popular?: boolean;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES = [
  "All Questions",
  "Sizing & Fit Guide",
  "Ordering & Pay on Delivery",
  "Nationwide Delivery",
  "Fabric Care & Materials",
  "Exchanges & Returns",
];

export const ALL_FAQS: FAQCategoryItem[] = [
  {
    id: "size-1",
    category: "Sizing & Fit Guide",
    popular: true,
    question: "How do I choose the correct size for Nigerian curves?",
    answer:
      "All Blush & Bloom by Megaprime apparel follows standard UK sizing (UK 6 through UK 20), thoughtfully tailored with generous allowances across the bust, hips, and thighs. Each product description includes exact fabric stretch details, bust-waist measurements, and model fit notes. Wrap styles and smocked bodices offer generous flexibility, while structured items like corset gowns provide exact measurements. If you are between sizes, our verification desk can assist you when they call to confirm your order.",
  },
  {
    id: "size-2",
    category: "Sizing & Fit Guide",
    popular: true,
    question: "What if an item arrives and does not fit my size perfectly?",
    answer:
      "We provide a hassle-free 7-Day Sizing Exchange Guarantee. If an outfit feels too tight or loose, simply notify our WhatsApp support desk within 7 days of receiving your package. We will dispatch the alternative size directly to your doorstep with zero replacement fees.",
  },
  {
    id: "order-1",
    category: "Ordering & Pay on Delivery",
    popular: true,
    question: "Do I need to create an account or password to order?",
    answer:
      "No! Blush & Bloom operates on a direct-response checkout model. You do not need to register, remember passwords, or navigate complicated shopping carts. Simply select the piece you love, choose your package (1 Piece or multi-piece bundles to save more), enter your delivery address, and submit. You'll receive instant order confirmation.",
  },
  {
    id: "order-2",
    category: "Ordering & Pay on Delivery",
    popular: true,
    question: "Is Pay on Delivery really available across Nigeria?",
    answer:
      "Yes, Pay on Delivery is available across all major cities in Nigeria. Once your order is placed, our Lagos dispatch desk phones or WhatsApps you to verify your availability. When the courier arrives at your doorstep, you can inspect the package before completing payment via POS or instant bank transfer.",
  },
  {
    id: "del-1",
    category: "Nationwide Delivery",
    popular: true,
    question: "Is delivery truly 100% free with no courier waybill fees?",
    answer:
      "Yes! 100% free nationwide delivery across all 36 States of Nigeria and the FCT (Abuja). The price you see on the product page is your final total. Our courier partners are strictly forbidden from charging fuel surcharges or additional drop-off fees.",
  },
  {
    id: "del-2",
    category: "Nationwide Delivery",
    popular: true,
    question: "How quickly will my fashion order arrive?",
    answer:
      "Lagos State deliveries arrive within 24 to 48 hours. Orders to Abuja (FCT), Port Harcourt, Ibadan, Abeokuta, and Asaba typically arrive within 2 to 3 business days. Deliveries to all other states across Nigeria arrive in 2 to 4 business days via verified logistics routes.",
  },
  {
    id: "fabric-1",
    category: "Fabric Care & Materials",
    popular: false,
    question: "How do I care for delicate fabrics like liquid satin and corded lace?",
    answer:
      "We recommend hand washing our liquid satin and corded lace garments in cool water with a gentle detergent, or using a mesh laundry bag on a delicate machine cycle. Always hang to air dry in shaded breeze and use a cool steam iron on the reverse side to preserve satin luster and lace elasticity.",
  },
  {
    id: "fabric-2",
    category: "Fabric Care & Materials",
    popular: false,
    question: "Will the African Wax Print (Ankara) bleed color when washed?",
    answer:
      "No. We use 100% premium grade, colorfast African wax cotton with high-density dyes. We advise washing with mild soap in cold water on the first wash and pressing with a medium iron on the reverse side to keep colors radiant for years.",
  },
  {
    id: "fabric-3",
    category: "Fabric Care & Materials",
    popular: false,
    question: "Is your gold jewelry truly anti-tarnish in humid weather?",
    answer:
      "Yes! Our jewelry pieces are crafted from 316L medical-grade stainless steel with 18K Real Gold vacuum PVD plating. Unlike cheap brass plating that turns skin green, PVD gold is 100% sweat-proof, perfume-resistant, and shower-safe.",
  },
  {
    id: "order-3",
    category: "Ordering & Pay on Delivery",
    popular: false,
    question: "Can I order for bridal parties or multiple bridesmaids?",
    answer:
      "Yes! We offer special bridal train packages—such as our Multi-Tonal Infinity Gowns and Silk Kimono sets with volume discounts. You can select bundle packages on the product page or request bridesmaid coordination when our customer care desk calls to verify your order.",
  },
];
