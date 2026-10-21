export interface Benefit {
  title: string;
  description: string;
  iconName: string;
}

export interface UseCase {
  title: string;
  description: string;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified?: boolean;
  packageBought?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PackageOption {
  id: string;
  name: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  savings?: number;
  badge?: string;
  freeDelivery: boolean;
}

export interface ProductImageItem {
  url: string;
  photographer: string;
  source: 'Unsplash' | 'Pexels' | 'Imagen AI Studio' | string;
  sourceUrl: string;
  alt: string;
  blurPlaceholder?: string;
}

export interface FashionBulletDetails {
  fabric: string;
  fit: string;
  length: string;
  care: string;
  sizes?: string | string[];
  availableSizes?: string[];
  colors?: string | string[];
  availableColors?: string[];
}

export interface StyleSuggestion {
  productSlug?: string;
  productId?: string;
  productName: string;
  reason?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  category: string;
  tag?: string;
  rating: number;
  reviewCount: number;
  headline?: string;
  shortBenefit?: string;
  tagline?: string;
  description: string | string[];
  bulletDetails: FashionBulletDetails;
  sizeAndFitNote?: string;
  styleItWith?: StyleSuggestion[];
  styleWith?: StyleSuggestion[];
  startingPrice: number;
  oldPrice?: number;
  stockCount: number;
  offerSummary?: string;
  specs?: Record<string, string>;
  features?: string[];
  benefits?: Benefit[];
  useCases?: UseCase[];
  reviews: Review[];
  faqs?: FAQ[];
  packages: PackageOption[];
  images: (string | ProductImageItem)[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface OrderFormInput {
  customerName: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  state: string;
  city: string;
  deliveryAddress: string;
  landmark: string;
  additionalNotes: string;
  packageId: string;
}

export interface OrderDetails {
  orderRef: string;
  customerName: string;
  phone: string;
  whatsappPhone?: string;
  email?: string;
  state: string;
  city: string;
  deliveryAddress: string;
  landmark?: string;
  additionalNotes?: string;
  productId: string;
  productSlug: string;
  productName: string;
  packageId: string;
  packageName: string;
  quantity: number;
  totalPrice: number;
  totalFormatted: string;
  orderDate: string;
  estimatedDelivery: string;
}

export interface OrderResult {
  orderId: string;
  orderDetails: OrderDetails;
}
