import { useState } from "react";
import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORIES } from "../../data/categories.js";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField, TextAreaField } from "../../components/common/TextField.jsx";
import { Button } from "../../components/common/Button.jsx";
import { CameraIcon, PlusIcon } from "../../components/common/icons.jsx";
import { LocationPicker } from "../../components/common/LocationPicker.jsx";

export function ConfigureBusinessScreen({ nav, initial, editMode, email, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [category, setCategory] = useState(initial?.category || "pan");
  const [address, setAddress] = useState(initial?.address || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [lat, setLat] = useState(initial?.lat || null);
  const [lng, setLng] = useState(initial?.lng || null);
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
              {CATEGORIES.map((c) => {
                const isSelected = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`re-cat-tile ${isSelected ? "re-cat-tile--active" : ""}`}
                    style={{
                      background: `${c.tint}${isSelected ? "30" : "18"}`,
                      borderColor: isSelected ? c.tint : `${c.tint}40`,
                    }}
                    onClick={() => setCategory(c.id)}
                  >
                    <CatIcon id={c.id} size={22} color={c.tint} />
                    <span className="re-cat-tile__label" style={{ color: isSelected ? c.tint : "var(--text)" }}>
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <LocationPicker
            address={address}
            onAddressChange={(e) => setAddress(e.target.value)}
            lat={lat}
            lng={lng}
            onLocationChange={(newLat, newLng) => {
              setLat(newLat);
              setLng(newLng);
            }}
          />

          <TextAreaField label="Descripción (opcional)" placeholder="Cuéntale a tus vecinos qué los hace especiales..." value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div style={{ marginTop: 26 }}>
          <Button
            variant="primary"
            disabled={!canSubmit}
            onClick={() => onSave({ email, name, category, address, description, lat, lng })}
          >
            {editMode ? "Guardar cambios" : "Crear negocio"}
          </Button>
        </div>
      </div>
    </div>
  );
}
