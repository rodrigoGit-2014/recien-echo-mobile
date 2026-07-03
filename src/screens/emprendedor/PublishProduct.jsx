import { useState, useRef } from "react";
import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { TopBar } from "../../components/common/TopBar.jsx";
import { Button } from "../../components/common/Button.jsx";
import { BoltIcon, CameraIcon, PlusIcon, MinusIcon, CheckIcon } from "../../components/common/icons.jsx";

const API_BASE = "/api";

export function PublishProductScreen({ nav, business, onPublish }) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(12);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [identifiedProduct, setIdentifiedProduct] = useState(null);
  const fileInputRef = useRef(null);
  const cat = CATEGORY_BY_ID[business.category];

  // Manejar selección de imagen
  async function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
    };
    reader.readAsDataURL(file);

    // Enviar a identificación
    setIsIdentifying(true);
    setIdentifiedProduct(null);
    setProduct("");

    try {
      // Convertir a base64
      const base64 = await fileToBase64(file);
      const mimeType = file.type || "image/jpeg";

      const res = await fetch(`${API_BASE}/identify-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mimeType }),
      });

      const data = await res.json();

      if (data.product) {
        setIdentifiedProduct(data);
        setProduct(data.product);
      }
    } catch (err) {
      console.error("Error identificando producto:", err);
    } finally {
      setIsIdentifying(false);
    }
  }

  // Convertir archivo a base64 (sin el prefijo data:...)
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Click en el área de foto
  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  const canPublish = product.trim().length > 0 && photoPreview;

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-scroll re-pad" style={{ paddingBottom: 32 }}>
        <div style={{ marginTop: 4, marginBottom: 8 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em" }}>
            ¿Qué hiciste hoy?
          </h1>
        </div>
        <p style={{
          fontSize: 13, color: "var(--accent)", background: "rgba(255,224,61,0.1)",
          border: "1px solid rgba(255,224,61,0.25)", borderRadius: 12, padding: "10px 14px", marginBottom: 24,
        }}>
          Tu publicación estará visible en el radar durante 30 minutos.
        </p>

        {/* Input file oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />

        {/* Área de foto clickeable */}
        <button
          className="re-photo-picker"
          onClick={handlePhotoClick}
          disabled={isIdentifying}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            ...(photoPreview ? {
              border: "none",
              padding: 0,
              overflow: "hidden",
            } : {}),
          }}
        >
          {isIdentifying ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div className="re-spinner" />
              <span style={{ fontSize: 14, color: "var(--text-dim)" }}>Identificando producto...</span>
            </div>
          ) : photoPreview ? (
            <img
              src={photoPreview}
              alt="Producto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "var(--surface-alt)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <CameraIcon size={28} color="var(--text-dim)" />
              </div>
              <span style={{ fontSize: 14, color: "var(--text-dim)" }}>Toma una foto del producto</span>
              <span style={{ fontSize: 12, color: "var(--text-dim)", opacity: 0.6 }}>La IA identificará automáticamente qué es</span>
            </div>
          )}
        </button>

        {/* Producto identificado - Estilo destacado */}
        {identifiedProduct && (
          <div style={{
            marginTop: 20,
            background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 16,
            padding: "18px 20px",
            textAlign: "center",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 8,
            }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                background: identifiedProduct.confidence === "high" ? "#10B981" :
                  identifiedProduct.confidence === "medium" ? "#F59E0B" : "#6B7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <CheckIcon size={14} color="#fff" />
              </div>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: identifiedProduct.confidence === "high" ? "#10B981" :
                  identifiedProduct.confidence === "medium" ? "#F59E0B" : "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                {identifiedProduct.confidence === "high" ? "Producto identificado" :
                  identifiedProduct.confidence === "medium" ? "Producto probable" : "Sugerencia"}
              </span>
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 28,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}>
              {identifiedProduct.product}
            </div>
            {identifiedProduct.category && (
              <div style={{
                marginTop: 6,
                fontSize: 13,
                color: "var(--text-dim)",
              }}>
                Categoría: {identifiedProduct.category}
              </div>
            )}
          </div>
        )}

        {/* Mensaje si no hay foto */}
        {!photoPreview && !isIdentifying && (
          <div style={{
            marginTop: 20,
            padding: "16px",
            background: "var(--surface)",
            borderRadius: 12,
            border: "1px solid var(--line)",
            textAlign: "center",
          }}>
            <CatIcon id={business.category} size={32} color={cat.tint} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 13, color: "var(--text-dim)" }}>
              Sube una foto para que la IA identifique tu producto
            </div>
          </div>
        )}

        <div className="re-field" style={{ marginTop: 24, alignItems: "center" }}>
          <label className="re-field__label" style={{ textAlign: "center" }}>Cantidad aproximada</label>
          <div className="re-stepper" style={{ marginTop: 10 }}>
            <button className="re-stepper__btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><MinusIcon size={18} /></button>
            <div className="re-stepper__value">{quantity}</div>
            <button className="re-stepper__btn" onClick={() => setQuantity((q) => q + 1)}><PlusIcon size={18} /></button>
          </div>
        </div>
      </div>

      <div className="re-pad" style={{ paddingBottom: 40 }}>
        <Button
          variant="fresh"
          icon={<BoltIcon size={18} />}
          disabled={!canPublish}
          onClick={() => onPublish({
              product,
              quantity,
              hasPhoto: true,
              category: identifiedProduct?.category,
              confidence: identifiedProduct?.confidence,
            })}
        >
          ¡Recién hecho!
        </Button>
        {!canPublish && (
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-dim)", marginTop: 10 }}>
            Toma una foto para publicar
          </p>
        )}
      </div>
    </div>
  );
}
