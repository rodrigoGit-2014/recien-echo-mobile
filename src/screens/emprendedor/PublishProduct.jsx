import { useState } from "react";
import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { PRODUCTS_BY_CATEGORY } from "../../data/mockData.js";
import { TopBar } from "../../components/common/TopBar.jsx";
import { Button } from "../../components/common/Button.jsx";
import { Chip } from "../../components/common/Chip.jsx";
import { BoltIcon, CameraIcon, PlusIcon, MinusIcon } from "../../components/common/icons.jsx";

export function PublishProductScreen({ nav, business, onPublish }) {
  const products = PRODUCTS_BY_CATEGORY[business.category];
  const [product, setProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(12);
  const [hasPhoto, setHasPhoto] = useState(false);
  const cat = CATEGORY_BY_ID[business.category];

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

        <button className="re-photo-picker" onClick={() => setHasPhoto((h) => !h)}
          style={hasPhoto ? { border: "1.5px solid transparent", background: `linear-gradient(150deg, ${cat.tint}55, ${cat.tint}22)` } : undefined}>
          {hasPhoto ? <CatIcon id={business.category} size={40} color={cat.tint} /> : <><CameraIcon size={24} /><span>Añadir foto (opcional)</span></>}
        </button>

        <div className="re-field" style={{ marginTop: 24 }}>
          <label className="re-field__label">Producto</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {products.map((p) => (
              <Chip key={p} active={product === p} tint={cat.tint} label={p} onClick={() => setProduct(p)} />
            ))}
          </div>
        </div>

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
        <Button variant="fresh" icon={<BoltIcon size={18} />} onClick={() => onPublish({ product, quantity, hasPhoto })}>
          ¡Recién hecho!
        </Button>
      </div>
    </div>
  );
}
