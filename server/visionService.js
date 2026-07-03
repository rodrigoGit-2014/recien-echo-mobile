import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Productos válidos por categoría
const VALID_PRODUCTS = {
  pan: ["Marraqueta", "Hallulla", "Pan de molde", "Dobladitas", "Pan amasado", "Coliza"],
  empanadas: ["De pino", "Queso", "Napolitana", "Pollo", "Mariscos"],
  pizza: ["Pepperoni", "Margarita", "Napolitana", "Hawaiana", "4 quesos"],
  cafe: ["Espresso", "Cappuccino", "Latte", "Americano", "Mocca"],
  pasteles: ["Berlines", "Cachitos", "Cuernos", "Roscas", "Alfajores"],
  sopaipillas: ["Sopaipillas", "Sopaipillas pasadas", "Calzones rotos", "Picarones"],
  tortas: ["Milhojas", "Selva negra", "Tres leches", "Torta de chocolate", "Cheesecake"],
};

// Categorías principales
const CATEGORIES = ["pan", "empanadas", "pizza", "cafe", "pasteles", "sopaipillas", "tortas"];

/**
 * Identifica un producto de panadería/pastelería en una imagen usando OpenAI Vision.
 * @param {string} imageBase64 - Imagen en formato base64 (sin el prefijo data:image/...)
 * @param {string} mimeType - Tipo MIME de la imagen (image/jpeg, image/png, etc.)
 * @returns {Promise<{category: string, product: string, confidence: string}>}
 */
export async function identifyProduct(imageBase64, mimeType = "image/jpeg") {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY no configurada");
  }

  const productList = Object.entries(VALID_PRODUCTS)
    .map(([cat, products]) => `${cat}: ${products.join(", ")}`)
    .join("\n");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres un experto identificador de productos de panadería y pastelería chilena.
Tu tarea es identificar qué producto aparece en la imagen.

Las categorías y productos válidos son:
${productList}

IMPORTANTE:
- Responde SOLO en formato JSON válido
- Si no puedes identificar el producto claramente, usa tu mejor estimación
- El campo "confidence" debe ser "high", "medium" o "low"`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Identifica el producto en esta imagen. Responde SOLO con JSON en este formato exacto:
{"category": "nombre_categoria", "product": "nombre_producto", "confidence": "high|medium|low"}`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 150,
    });

    const content = response.choices[0]?.message?.content?.trim();

    // Parsear la respuesta JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Respuesta no contiene JSON válido");
    }

    const result = JSON.parse(jsonMatch[0]);

    // Validar que la categoría sea válida
    if (!CATEGORIES.includes(result.category)) {
      result.category = "pan"; // Fallback
    }

    // Validar que el producto sea válido para la categoría
    const validProducts = VALID_PRODUCTS[result.category];
    if (!validProducts.includes(result.product)) {
      result.product = validProducts[0]; // Usar el primer producto de la categoría
    }

    // eslint-disable-next-line no-console
    console.log(`[vision] Identificado: ${result.product} (${result.category}) - confianza: ${result.confidence}`);

    return {
      ok: true,
      category: result.category,
      product: result.product,
      confidence: result.confidence,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[vision] Error identificando producto:", error.message);

    return {
      ok: false,
      error: error.message,
      // Fallback: devolver pan como categoría por defecto
      category: "pan",
      product: "Marraqueta",
      confidence: "low",
    };
  }
}
