import { db } from "./db.js";
import { AuthError } from "./errors.js";

function generateId() {
  return `c${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
}

function normalizeEmail(email) {
  return email?.toLowerCase().trim();
}

/**
 * Obtiene todos los colaboradores de un negocio.
 */
export function getCollaborators(businessEmail) {
  if (!businessEmail) {
    throw new AuthError("EMAIL_REQUIRED", "Se requiere email del negocio", 400);
  }
  const email = normalizeEmail(businessEmail);
  const collaborators = db.collaborators.get(email) || [];
  return { ok: true, collaborators };
}

/**
 * Añade un colaborador a un negocio.
 */
export function addCollaborator({ businessEmail, name, cargo }) {
  if (!businessEmail) {
    throw new AuthError("EMAIL_REQUIRED", "Se requiere email del negocio", 400);
  }
  if (!name || name.trim().length < 2) {
    throw new AuthError("NAME_REQUIRED", "El nombre debe tener al menos 2 caracteres", 400);
  }
  if (!cargo) {
    throw new AuthError("CARGO_REQUIRED", "Se requiere el cargo", 400);
  }

  const email = normalizeEmail(businessEmail);
  const collaborators = db.collaborators.get(email) || [];

  const newCollaborator = {
    id: generateId(),
    name: name.trim(),
    cargo,
    active: true,
    createdAt: Date.now(),
  };

  collaborators.push(newCollaborator);
  db.collaborators.set(email, collaborators);

  // eslint-disable-next-line no-console
  console.log(`[collaborator] Añadido "${name}" a ${email}`);

  return { ok: true, collaborator: newCollaborator };
}

/**
 * Edita un colaborador existente.
 */
export function editCollaborator({ businessEmail, collaboratorId, name, cargo }) {
  if (!businessEmail) {
    throw new AuthError("EMAIL_REQUIRED", "Se requiere email del negocio", 400);
  }
  if (!collaboratorId) {
    throw new AuthError("ID_REQUIRED", "Se requiere ID del colaborador", 400);
  }

  const email = normalizeEmail(businessEmail);
  const collaborators = db.collaborators.get(email) || [];
  const index = collaborators.findIndex((c) => c.id === collaboratorId);

  if (index === -1) {
    throw new AuthError("NOT_FOUND", "Colaborador no encontrado", 404);
  }

  if (name) collaborators[index].name = name.trim();
  if (cargo) collaborators[index].cargo = cargo;
  collaborators[index].updatedAt = Date.now();

  db.collaborators.set(email, collaborators);

  // eslint-disable-next-line no-console
  console.log(`[collaborator] Editado "${collaborators[index].name}" en ${email}`);

  return { ok: true, collaborator: collaborators[index] };
}

/**
 * Activa o desactiva un colaborador.
 */
export function toggleCollaboratorActive({ businessEmail, collaboratorId }) {
  if (!businessEmail) {
    throw new AuthError("EMAIL_REQUIRED", "Se requiere email del negocio", 400);
  }
  if (!collaboratorId) {
    throw new AuthError("ID_REQUIRED", "Se requiere ID del colaborador", 400);
  }

  const email = normalizeEmail(businessEmail);
  const collaborators = db.collaborators.get(email) || [];
  const index = collaborators.findIndex((c) => c.id === collaboratorId);

  if (index === -1) {
    throw new AuthError("NOT_FOUND", "Colaborador no encontrado", 404);
  }

  collaborators[index].active = !collaborators[index].active;
  collaborators[index].updatedAt = Date.now();

  db.collaborators.set(email, collaborators);

  // eslint-disable-next-line no-console
  console.log(`[collaborator] "${collaborators[index].name}" ahora está ${collaborators[index].active ? "activo" : "inactivo"}`);

  return { ok: true, collaborator: collaborators[index] };
}

/**
 * Elimina un colaborador.
 */
export function deleteCollaborator({ businessEmail, collaboratorId }) {
  if (!businessEmail) {
    throw new AuthError("EMAIL_REQUIRED", "Se requiere email del negocio", 400);
  }
  if (!collaboratorId) {
    throw new AuthError("ID_REQUIRED", "Se requiere ID del colaborador", 400);
  }

  const email = normalizeEmail(businessEmail);
  const collaborators = db.collaborators.get(email) || [];
  const index = collaborators.findIndex((c) => c.id === collaboratorId);

  if (index === -1) {
    throw new AuthError("NOT_FOUND", "Colaborador no encontrado", 404);
  }

  const deleted = collaborators.splice(index, 1)[0];
  db.collaborators.set(email, collaborators);

  // eslint-disable-next-line no-console
  console.log(`[collaborator] Eliminado "${deleted.name}" de ${email}`);

  return { ok: true, deleted };
}
