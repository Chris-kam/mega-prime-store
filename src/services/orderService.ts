import { PackageOption, Product } from '../types/index';
import { formatNaira, getDeliveryEstimate } from '../data/states';


export const GOOGLE_APPS_SCRIPT_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL) ||
  'https://script.google.com/macros/s/AKfycbzeKiBVm174kks7lY4fZbZ4ETSfmwGOmbKKwEtFVrG4dYfo6mRwf-oIsr9h8evTX6co/exec';


export interface OrderCustomerInput {
  customerName: string;
  phone: string;
  whatsappPhone?: string;
  email?: string;
  state: string;
  city: string;
  deliveryAddress: string;
  landmark?: string;
  additionalNotes?: string;
}

export interface SubmitOrderParams {
  customer: OrderCustomerInput;
  product: Product;
  selectedPackage: PackageOption;
  orderRef: string;
  orderDate?: string;
}

export interface GoogleSheetsOrderPayload {
  // Spreadsheet column headers (exact matches)
  'Order Date': string;
  'Order ID': string;
  'Customer Name': string;
  Phone: string;
  WhatsApp: string;
  Email: string;
  Package: string;
  Quantity: number;
  'Total Price': number;
  'Delivery State': string;
  'City/Area': string;
  'Street Address': string;
  Landmark: string;
  'Delivery Notes': string;
  'Order Status': string;

  // Additional camelCase and metadata fields for safety & rich record keeping
  orderDate: string;
  orderId: string;
  orderRef: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  productId: string;
  productSlug: string;
  productName: string;
  package: string;
  packageName: string;
  packageId: string;
  quantity: number;
  totalPrice: number;
  totalFormatted: string;
  deliveryState: string;
  state: string;
  city: string;
  cityArea: string;
  streetAddress: string;
  deliveryAddress: string;
  landmark: string;
  deliveryNotes: string;
  additionalNotes: string;
  orderStatus: string;
  estimatedDelivery: string;
}

export interface OrderSubmissionResult {
  success: boolean;
  orderRef: string;
  orderObject: GoogleSheetsOrderPayload;
  rawResponse?: any;
  error?: string;
}

/**
 * Validates a Nigerian phone number format.
 * Accepts formats like 08012345678, 09012345678, +2348012345678, 2348012345678, etc.
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Must be between 10 and 14 digits (with optional leading +)
  return /^\+?[0-9]{10,14}$/.test(cleaned);
}

/**
 * Formats submission date/time in a clear, readable Nigerian/locale format.
 */
export function formatSubmissionDateTime(date: Date = new Date()): string {
  return date.toLocaleString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Constructs the canonical order payload matching the spreadsheet columns.
 */
export function buildOrderPayload(params: SubmitOrderParams): GoogleSheetsOrderPayload {
  const { customer, product, selectedPackage, orderRef } = params;
  const submissionTime = params.orderDate || formatSubmissionDateTime();
  const whatsappNumber = (customer.whatsappPhone && customer.whatsappPhone.trim())
    ? customer.whatsappPhone.trim()
    : customer.phone.trim();
  const estimatedDelivery = getDeliveryEstimate(customer.state);

  return {
    // Exact match for the 15 Google Sheets columns:
    'Order Date': submissionTime,
    'Order ID': orderRef,
    'Customer Name': customer.customerName.trim(),
    Phone: customer.phone.trim(),
    WhatsApp: whatsappNumber,
    Email: (customer.email || '').trim(),
    Package: selectedPackage.name,
    Quantity: selectedPackage.quantity,
    'Total Price': selectedPackage.price,
    'Delivery State': customer.state,
    'City/Area': customer.city.trim(),
    'Street Address': customer.deliveryAddress.trim(),
    Landmark: (customer.landmark || '').trim(),
    'Delivery Notes': (customer.additionalNotes || '').trim(),
    'Order Status': 'Pending',

    // Compatible camelCase aliases:
    orderDate: submissionTime,
    orderId: orderRef,
    orderRef: orderRef,
    customerName: customer.customerName.trim(),
    phone: customer.phone.trim(),
    whatsapp: whatsappNumber,
    email: (customer.email || '').trim(),
    productId: product.id,
    productSlug: product.slug,
    productName: product.name,
    package: selectedPackage.name,
    packageName: selectedPackage.name,
    packageId: selectedPackage.id,
    quantity: selectedPackage.quantity,
    totalPrice: selectedPackage.price,
    totalFormatted: formatNaira(selectedPackage.price),
    deliveryState: customer.state,
    state: customer.state,
    city: customer.city.trim(),
    cityArea: customer.city.trim(),
    streetAddress: customer.deliveryAddress.trim(),
    deliveryAddress: customer.deliveryAddress.trim(),
    landmark: (customer.landmark || '').trim(),
    deliveryNotes: (customer.additionalNotes || '').trim(),
    additionalNotes: (customer.additionalNotes || '').trim(),
    orderStatus: 'Pending',
    estimatedDelivery,
  };
}

/**
 * Submits the order to Google Apps Script.
 *
 * Sends a POST request with application/x-www-form-urlencoded body containing
 * payload=JSON.stringify(orderObject) so that Apps Script receives e.parameter.payload.
 *
 * It uses the local Vite server proxy (/api/submit-order) when available to completely
 * eliminate browser CORS restrictions and transparently verify the actual JSON response
 * from Google Apps Script. If the proxy is not reachable, it falls back to direct browser fetch.
 *
 * In accordance with strict requirements:
 * NEVER treats an opaque (status 0) or unverified response as successful saving.
 */
export async function submitOrderToGoogleSheets(
  params: SubmitOrderParams
): Promise<OrderSubmissionResult> {
  const orderObject = buildOrderPayload(params);
  const payloadString = JSON.stringify(orderObject);

  const urlEncodedBody = new URLSearchParams();
  urlEncodedBody.append('payload', payloadString);

  // Strategy 1: Attempt submission via local proxy (/api/submit-order)
  // This bypasses browser CORS redirect restrictions and allows reliable JSON inspection.
  try {
    const proxyResponse = await fetch('/api/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncodedBody.toString(),
    });

    if (proxyResponse.ok) {
      const responseText = await proxyResponse.text();
      let responseJson: any = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch {
        // Plain text response
      }

      // Check whether Apps Script reported success or an error
      if (responseJson && (responseJson.success === true || responseJson.status === 'success')) {
        return {
          success: true,
          orderRef: params.orderRef,
          orderObject,
          rawResponse: responseJson,
        };
      }

      // Apps Script explicitly reported failure (e.g. {"success":false,"error":"Order could not be saved."})
      const errorMsg =
        responseJson?.error ||
        responseJson?.message ||
        'Order could not be saved to spreadsheet.';

      return {
        success: false,
        orderRef: params.orderRef,
        orderObject,
        rawResponse: responseJson,
        error: errorMsg,
      };
    }
  } catch {
    // Local proxy not available or failed; fallback to direct fetch below
  }

  // Strategy 2: Direct browser POST to Google Apps Script Web App
  try {
    const directResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncodedBody.toString(),
    });

    // Check if the response is opaque (mode: 'no-cors' artifact)
    if (directResponse.type === 'opaque' || directResponse.status === 0) {
      return {
        success: false,
        orderRef: params.orderRef,
        orderObject,
        error:
          'Browser received an unverified opaque response. Unable to confirm order was saved.',
      };
    }

    if (directResponse.ok) {
      const responseText = await directResponse.text();
      let responseJson: any = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch {
        // Plain text
      }

      if (responseJson && (responseJson.success === true || responseJson.status === 'success')) {
        return {
          success: true,
          orderRef: params.orderRef,
          orderObject,
          rawResponse: responseJson,
        };
      }

      const errorMsg =
        responseJson?.error ||
        responseJson?.message ||
        'Order could not be saved to spreadsheet.';

      return {
        success: false,
        orderRef: params.orderRef,
        orderObject,
        rawResponse: responseJson,
        error: errorMsg,
      };
    }

    return {
      success: false,
      orderRef: params.orderRef,
      orderObject,
      error: `Server responded with HTTP ${directResponse.status}: ${directResponse.statusText}`,
    };
  } catch (err: any) {
    return {
      success: false,
      orderRef: params.orderRef,
      orderObject,
      error:
        err?.message ||
        'Network error while connecting to Google Apps Script order tracker.',
    };
  }
}
