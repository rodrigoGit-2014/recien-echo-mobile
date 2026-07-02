import { useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField } from "../../components/common/TextField.jsx";
import { Button } from "../../components/common/Button.jsx";
import { ModalSheet } from "../../components/common/ModalSheet.jsx";
import { Chip } from "../../components/common/Chip.jsx";
import { ShareIcon, PlusIcon, PencilIcon, PowerIcon } from "../../components/common/icons.jsx";

export const CARGOS = ["Panadero", "Pastelero", "Cocinero", "Vendedor", "Barista", "Maestro pizzero", "Encargado de producción"];

export function CollaboratorsScreen({ nav, business, collaborators, onAdd, onEdit, onToggleActive, onRegenerateCode }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [cargo, setCargo] = useState(CARGOS[0]);

  const activeCount = collaborators.filter((c) => c.active).length;

  function openAdd() {
    setEditing(null);
    setName("");
    setCargo(CARGOS[0]);
    setSheetOpen(true);
  }

  function openEdit(c) {
    setEditing(c);
    setName(c.name);
    setCargo(c.cargo);
    setSheetOpen(true);
  }

  function handleSave() {
    if (!name.trim()) return;
    if (editing) onEdit(editing.id, { name, cargo });
    else onAdd({ name, cargo });
    setSheetOpen(false);
  }

  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} title="Colaboradores" />
      <div className="re-scroll re-pad" style={{ paddingBottom: 32 }}>
        <div className="re-card" style={{ marginTop: 6, marginBottom: 24 }}>
          <div style={{ fontSize: 12.5, color: "var(--text-dim)", fontWeight: 600, marginBottom: 8 }}>CÓDIGO DE INVITACIÓN</div>
          <div className="re-code" style={{ fontSize: 22, color: "var(--accent)", marginBottom: 14 }}>{business.code}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="ghost" style={{ flex: 1 }} onClick={onRegenerateCode}>Regenerar</Button>
            <Button variant="ghost" style={{ flex: 1 }} icon={<ShareIcon size={16} />} onClick={() => {}}>Compartir</Button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17 }}>
            Equipo · {activeCount} activos
          </span>
          <button className="re-btn re-btn--sm re-btn--primary" style={{ width: "auto", padding: "0 16px" }} onClick={openAdd}>
            <PlusIcon size={15} /> Añadir
          </button>
        </div>

        {collaborators.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-dim)", fontSize: 14 }}>
            Aún no tienes colaboradores. Añade a tu equipo para que puedan publicar contigo.
          </div>
        ) : (
          <div>
            {collaborators.map((c) => (
              <div key={c.id} className="re-collab-row" style={{ opacity: c.active ? 1 : 0.5 }}>
                <div className="re-avatar">{c.name.charAt(0).toUpperCase()}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>{c.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-dim)" }}>{c.cargo} · {c.active ? "Activo" : "Inactivo"}</div>
                </div>
                <button className="re-icon-btn-sm" onClick={() => openEdit(c)}><PencilIcon size={15} /></button>
                <button className="re-icon-btn-sm" onClick={() => onToggleActive(c.id)}><PowerIcon size={15} color={c.active ? "var(--fresh)" : "var(--text-dim)"} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, marginBottom: 18 }}>
          {editing ? "Editar colaborador" : "Añadir colaborador"}
        </h2>
        <TextField label="Nombre" placeholder="Ej. Marisol Pérez" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="re-field" style={{ marginTop: 16, marginBottom: 22 }}>
          <label className="re-field__label">Cargo</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CARGOS.map((c) => (
              <Chip key={c} active={cargo === c} label={c} onClick={() => setCargo(c)} />
            ))}
          </div>
        </div>
        <Button variant="primary" disabled={!name.trim()} onClick={handleSave}>
          {editing ? "Guardar cambios" : "Añadir al equipo"}
        </Button>
      </ModalSheet>
    </div>
  );
}
