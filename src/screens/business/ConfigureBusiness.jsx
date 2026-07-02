import { useState } from "react";
import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORIES } from "../../data/categories.js";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField, TextAreaField } from "../../components/common/TextField.jsx";
import { Button } from "../../components/common/Button.jsx";
import { CameraIcon, PlusIcon, MapPinIcon } from "../../components/common/icons.jsx";

export function ConfigureBusinessScreen({ nav, initial, editMode, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [category, setCategory] = useState(initial?.category || "pan");
  const [address, setAddress] = useState(initial?.address || "");
  const [description, setDescription] = useState(initial?.description || "");
  const canSubmit = name.trim().length > 1 && address.trim().length > 3;

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} title={editMode ? "Configuración" : undefined} />
      <div className="re-scroll re-pad" style={{ paddingBottom: 32 }}>
        {!editMode && (
          <div className="re-progress" style={{ marginBottom: 22 }}>
            <div className="re-progress__seg re-progress__seg--done" />
            <div className="re-progress__seg re-progress__seg--done" />
            <div className="re-progress__seg" />
          </div>
        )}

        {!editMode && (
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 25, letterSpacing: "-0.02em", marginBottom: 22 }}>
            Configura tu negocio
          </h1>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <button style={{
            width: 72, height: 72, borderRadius: "50%", background: "var(--surface)",
            border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <CameraIcon size={24} color="var(--text-dim)" />
            <span style={{
              position: "absolute", bottom: -2, right: -2, width: 24, height: 24, borderRadius: "50%",
              background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <PlusIcon size={14} color="var(--on-accent)" />
            </span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <TextField label="Nombre del negocio" placeholder="Ej. Panadería Los Aromos" value={name} onChange={(e) => setName(e.target.value)} />

          <div className="re-field">
            <label className="re-field__label">Categoría principal</label>
            <div className="re-cat-grid">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`re-cat-tile ${category === c.id ? "re-cat-tile--active" : ""}`}
                  style={category === c.id ? { background: `${c.tint}26`, borderColor: c.tint } : undefined}
                  onClick={() => setCategory(c.id)}
                >
                  <CatIcon id={c.id} size={22} color={category === c.id ? c.tint : "var(--text-dim)"} />
                  <span className="re-cat-tile__label">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <TextField label="Ubicación" placeholder="Calle, número, comuna" value={address} onChange={(e) => setAddress(e.target.value)} />
            <div style={{
              height: 92, borderRadius: 14, marginTop: 10, position: "relative", overflow: "hidden",
              background: "#21252B", border: "1px solid var(--line)",
            }}>
              {[18, 42, 66].map((p, i) => (
                <div key={i} style={{ position: "absolute", left: 0, top: `${p}%`, width: "100%", height: 1, background: "rgba(255,255,255,0.08)" }} />
              ))}
              {[20, 50, 80].map((p, i) => (
                <div key={"v" + i} style={{ position: "absolute", top: 0, left: `${p}%`, width: 1, height: "100%", background: "rgba(255,255,255,0.08)" }} />
              ))}
              <MapPinIcon size={22} color="var(--accent)" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-100%)" }} />
            </div>
          </div>

          <TextAreaField label="Descripción (opcional)" placeholder="Cuéntale a tus vecinos qué los hace especiales..." value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div style={{ marginTop: 26 }}>
          <Button
            variant="primary"
            disabled={!canSubmit}
            onClick={() => onSave({ name, category, address, description })}
          >
            {editMode ? "Guardar cambios" : "Crear negocio"}
          </Button>
        </div>
      </div>
    </div>
  );
}
