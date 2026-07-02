import { CATEGORIES, CATEGORY_BY_ID } from "./categories.js";

export function generateBusinessCode(categoryId) {
  const cat = CATEGORY_BY_ID[categoryId] || CATEGORIES[0];
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${cat.prefix}-${digits}`;
}
