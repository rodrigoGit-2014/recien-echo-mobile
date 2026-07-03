import { db } from "./db.js";

/**
 * Crea una nueva publicación de producto para un negocio.
 * Las publicaciones expiran después de 30 minutos.
 */
export function createPublication({ businessEmail, product, quantity, category, confidence, photoBase64 }) {
  const email = businessEmail.toLowerCase().trim();

  if (!db.publications.has(email)) {
    db.publications.set(email, []);
  }

  const publications = db.publications.get(email);
  const now = Date.now();
  const expiresAt = now + 30 * 60 * 1000; // 30 minutos

  const publication = {
    id: `pub_${now}_${Math.random().toString(36).slice(2, 8)}`,
    product,
    quantity,
    category: category || null,
    confidence: confidence || null,
    hasPhoto: !!photoBase64,
    createdAt: now,
    expiresAt,
    active: true,
  };

  publications.unshift(publication); // Más reciente primero

  // eslint-disable-next-line no-console
  console.log(`[publication] Nueva publicación para ${email}: ${product} x${quantity}`);

  return { ok: true, publication };
}

/**
 * Obtiene las publicaciones activas (no expiradas) de un negocio.
 */
export function getActivePublications(businessEmail) {
  const email = businessEmail.toLowerCase().trim();
  const publications = db.publications.get(email) || [];
  const now = Date.now();

  // Filtrar solo las que no han expirado
  const active = publications.filter(p => p.expiresAt > now && p.active);

  return { ok: true, publications: active };
}

/**
 * Obtiene todas las publicaciones de un negocio (historial).
 */
export function getAllPublications(businessEmail) {
  const email = businessEmail.toLowerCase().trim();
  const publications = db.publications.get(email) || [];

  return { ok: true, publications };
}

/**
 * Desactiva una publicación antes de que expire.
 */
export function deactivatePublication(businessEmail, publicationId) {
  const email = businessEmail.toLowerCase().trim();
  const publications = db.publications.get(email) || [];

  const pub = publications.find(p => p.id === publicationId);
  if (!pub) {
    return { ok: false, error: "Publicación no encontrada" };
  }

  pub.active = false;

  // eslint-disable-next-line no-console
  console.log(`[publication] Publicación ${publicationId} desactivada`);

  return { ok: true };
}

/**
 * Obtiene todas las publicaciones activas de todos los negocios (para el radar).
 */
export function getAllActivePublicationsForRadar() {
  const now = Date.now();
  const allActive = [];

  for (const [businessEmail, publications] of db.publications.entries()) {
    const business = db.businesses.get(businessEmail);
    if (!business) continue;

    const active = publications.filter(p => p.expiresAt > now && p.active);

    for (const pub of active) {
      allActive.push({
        ...pub,
        business: {
          name: business.name,
          category: business.category,
          lat: business.lat,
          lng: business.lng,
          code: business.code,
        },
      });
    }
  }

  // Ordenar por más reciente primero
  allActive.sort((a, b) => b.createdAt - a.createdAt);

  return { ok: true, publications: allActive };
}
