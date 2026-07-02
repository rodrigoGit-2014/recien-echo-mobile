export const CATEGORIES = [
  { id: "pan", label: "Pan", tint: "#E8A23D", prefix: "PAN" },
  { id: "empanadas", label: "Empanadas", tint: "#E5673B", prefix: "EMP" },
  { id: "pizza", label: "Pizza", tint: "#D94C3D", prefix: "PIZ" },
  { id: "cafe", label: "Café", tint: "#B07A4F", prefix: "CAF" },
  { id: "pasteles", label: "Pasteles", tint: "#E86B9E", prefix: "PAS" },
  { id: "sopaipillas", label: "Sopaipillas", tint: "#CC8A3C", prefix: "SOP" },
  { id: "tortas", label: "Tortas", tint: "#9B7BD4", prefix: "TOR" },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
