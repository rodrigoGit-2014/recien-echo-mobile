import { walkMinutes } from "./formatters.js";

export const MOCK_BUSINESSES = [
  { id: "b1", name: "Panadería Los Aromos", category: "pan", address: "Av. Los Aromos 1230, Ñuñoa", code: "PAN-4821" },
  { id: "b2", name: "Empanadas Doña Rosa", category: "empanadas", address: "Pje. Las Rosas 88, Providencia", code: "EMP-2093" },
  { id: "b3", name: "Pizzería Barrio Italia", category: "pizza", address: "Av. Italia 1542, Providencia", code: "PIZ-7715" },
  { id: "b4", name: "Café del Parque", category: "cafe", address: "Av. Bustamante 220, Providencia", code: "CAF-3364" },
  { id: "b5", name: "Pastelería Dulce Vecina", category: "pasteles", address: "Irarrázaval 3401, Ñuñoa", code: "PAS-1187" },
  { id: "b6", name: "Sopaipillas Tía Marta", category: "sopaipillas", address: "Pje. Los Copihues 45, Ñuñoa", code: "SOP-5540" },
  { id: "b7", name: "Tortas La Esquina", category: "tortas", address: "Av. Grecia 2110, Ñuñoa", code: "TOR-9902" },
  { id: "b8", name: "Panadería El Trigal", category: "pan", address: "Manuel Montt 780, Providencia", code: "PAN-3308" },
];

export const PRODUCTS_BY_CATEGORY = {
  pan: ["Pan amasado", "Hallulla caliente", "Marraqueta recién horneada", "Pan de molde integral"],
  empanadas: ["Empanadas de pino", "Empanadas de queso", "Empanadas napolitanas", "Empanaditas de manzana"],
  pizza: ["Pizza a la piedra margarita", "Pizza pepperoni", "Pizza napolitana", "Pizza de la casa"],
  cafe: ["Café de grano recién molido", "Cortado doble", "Café helado de la casa", "Capuccino cremoso"],
  pasteles: ["Torta de tres leches", "Kuchen de manzana", "Cheesecake de frutos rojos", "Brownie recién horneado"],
  sopaipillas: ["Sopaipillas pasadas", "Sopaipillas recién fritas", "Sopaipillas con pebre", "Sopaipillas rellenas"],
  tortas: ["Torta de mil hojas", "Torta selva negra", "Torta de manjar y nuez", "Torta helada"],
};

function randomPin(id, business, overrides = {}) {
  const products = PRODUCTS_BY_CATEGORY[business.category];
  const product = products[Math.floor(Math.random() * products.length)];
  const minutesAgo = overrides.minutesAgo ?? Math.floor(Math.random() * 25);
  const distanceM = overrides.distanceM ?? Math.floor(80 + Math.random() * 1200);
  return {
    id,
    businessId: business.id,
    businessName: business.name,
    category: business.category,
    address: business.address,
    product,
    quantity: overrides.quantity ?? [6, 8, 12, 20, 1][Math.floor(Math.random() * 5)],
    publishedAt: Date.now() - minutesAgo * 60 * 1000,
    distanceM,
    walkMin: walkMinutes(distanceM),
    x: overrides.x ?? 10 + Math.random() * 80,
    y: overrides.y ?? 12 + Math.random() * 70,
  };
}

function buildMockPins() {
  const fixed = [
    { x: 32, y: 28, minutesAgo: 2 },
    { x: 58, y: 22, minutesAgo: 6 },
    { x: 70, y: 40, minutesAgo: 14 },
    { x: 40, y: 52, minutesAgo: 19 },
    { x: 22, y: 62, minutesAgo: 23 },
    { x: 60, y: 60, minutesAgo: 9 },
    { x: 78, y: 65, minutesAgo: 27 },
    { x: 46, y: 38, minutesAgo: 4 },
    // clúster cercano
    { x: 63, y: 30, minutesAgo: 3 },
    { x: 66, y: 32, minutesAgo: 7 },
    { x: 64, y: 34, minutesAgo: 11 },
  ];
  return fixed.map((f, i) =>
    randomPin(`pin-${i}`, MOCK_BUSINESSES[i % MOCK_BUSINESSES.length], f)
  );
}

export { randomPin, buildMockPins };
