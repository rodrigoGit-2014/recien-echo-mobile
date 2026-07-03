// server/db.js — base de datos en memoria, ahora en el servidor.
//
// Vive únicamente mientras el proceso de Node está corriendo: se pierde si
// reinicias el backend (elección consciente para mantener el prototipo
// simple, sin instalar ni administrar un motor de base de datos real).
// A diferencia de la versión anterior en el navegador, este Map nunca es
// visible para el cliente — solo se exponen los campos que las rutas
// deciden devolver.

import { hashPassword } from "./password.js";

class InMemoryDatabase {
  constructor() {
    this.users = new Map(); // key: email normalizado
    this.businesses = new Map(); // key: email normalizado
    this.collaborators = new Map(); // key: visitorEmail, value: array de colaboradores
  }
}

export const db = new InMemoryDatabase();

function seedDemoUser() {
  if (db.users.has("demo@negocio.cl")) return;
  db.users.set("demo@negocio.cl", {
    email: "demo@negocio.cl",
    passwordHash: hashPassword("1234"),
    role: "negocio",
    verified: true,
    verificationCode: null,
    resetCode: null,
    createdAt: Date.now(),
  });
}

export function resetDatabase() {
  db.users.clear();
  db.businesses.clear();
  db.collaborators.clear();
  seedDemoUser();
}

seedDemoUser();
