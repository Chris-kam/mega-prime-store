export const NIGERIAN_STATES = [
  "Abia",
  "Abuja (FCT)",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export function getDeliveryEstimate(state: string): string {
  const s = (state || "").toLowerCase();
  if (s.includes("lagos")) {
    return "24–48 Hours (Fast Lagos Hub Courier Dispatch)";
  }
  if (
    s.includes("abuja") ||
    s.includes("fct") ||
    s.includes("ogun") ||
    s.includes("oyo") ||
    s.includes("rivers")
  ) {
    return "2–3 Business Days (Direct Priority Delivery)";
  }
  return "2–4 Business Days (100% Free Nationwide Delivery)";
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
