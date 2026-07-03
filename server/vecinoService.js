// server/vecinoService.js — lógica para gestión de vecinos

import { db } from "./db.js";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export async function saveVecino({ email, lat, lng }) {
  const normalized = normalizeEmail(email);

  const existing = db.vecinos.get(normalized);
  const vecino = {
    email: normalized,
    lat: lat ?? existing?.lat ?? null,
    lng: lng ?? existing?.lng ?? null,
    createdAt: existing?.createdAt || Date.now(),
    updatedAt: Date.now(),
  };

  db.vecinos.set(normalized, vecino);
  return { ok: true, vecino };
}

export async function getVecinoByEmail(email) {
  const normalized = normalizeEmail(email);
  const vecino = db.vecinos.get(normalized);
  if (!vecino) {
    return { ok: false, vecino: null };
  }
  return { ok: true, vecino };
}

export async function updateVecinoLocation(email, lat, lng) {
  const normalized = normalizeEmail(email);
  const existing = db.vecinos.get(normalized);

  if (!existing) {
    // Crear nuevo si no existe
    return saveVecino({ email, lat, lng });
  }

  existing.lat = lat;
  existing.lng = lng;
  existing.updatedAt = Date.now();
  db.vecinos.set(normalized, existing);

  return { ok: true, vecino: existing };
}
