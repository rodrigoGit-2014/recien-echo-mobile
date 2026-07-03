import { db } from "./db.js";
import { AuthError } from "./errors.js";

// Prefijos por categoría para generar códigos
const CATEGORY_PREFIXES = {
  pan: "PAN",
  empanadas: "EMP",
  pizza: "PIZ",
  cafe: "CAF",
  pasteles: "PAS",
  sopaipillas: "SOP",
  tortas: "TOR",
};

function generateBusinessCode(category) {
  const prefix = CATEGORY_PREFIXES[category] || "BIZ";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${random}`;
}

/**
 * Crea o actualiza un negocio asociado a un email de usuario.
 */
export function saveBusiness({ email, name, category, address, description, lat, lng }) {
  if (!email) {
    throw new AuthError("EMAIL_REQUIRED", "Se requiere email", 400);
  }
  if (!name || name.trim().length < 2) {
    throw new AuthError("NAME_REQUIRED", "El nombre debe tener al menos 2 caracteres", 400);
  }
  if (!address || address.trim().length < 4) {
    throw new AuthError("ADDRESS_REQUIRED", "La dirección debe tener al menos 4 caracteres", 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = db.businesses.get(normalizedEmail);

  const business = {
    email: normalizedEmail,
    name: name.trim(),
    category: category || "pan",
    address: address.trim(),
    description: description?.trim() || "",
    lat: lat ?? null,
    lng: lng ?? null,
    code: existing?.code || generateBusinessCode(category),
    createdAt: existing?.createdAt || Date.now(),
    updatedAt: Date.now(),
  };

  db.businesses.set(normalizedEmail, business);

  // eslint-disable-next-line no-console
  console.log(`[business] Negocio guardado para ${normalizedEmail}:`, {
    name: business.name,
    category: business.category,
    lat: business.lat,
    lng: business.lng,
    code: business.code,
  });

  return {
    ok: true,
    business: {
      name: business.name,
      category: business.category,
      address: business.address,
      description: business.description,
      lat: business.lat,
      lng: business.lng,
      code: business.code,
    },
  };
}

/**
 * Obtiene el negocio de un usuario por email.
 */
export function getBusinessByEmail(email) {
  if (!email) {
    throw new AuthError("EMAIL_REQUIRED", "Se requiere email", 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const business = db.businesses.get(normalizedEmail);

  if (!business) {
    return { ok: true, business: null };
  }

  return {
    ok: true,
    business: {
      name: business.name,
      category: business.category,
      address: business.address,
      description: business.description,
      lat: business.lat,
      lng: business.lng,
      code: business.code,
    },
  };
}
