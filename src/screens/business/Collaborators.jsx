import { useState } from "react";
import { TopBar } from "../../components/common/TopBar.jsx";
import { TextField } from "../../components/common/TextField.jsx";
import { Button } from "../../components/common/Button.jsx";
import { ModalSheet } from "../../components/common/ModalSheet.jsx";
import { Chip } from "../../components/common/Chip.jsx";
import { ShareIcon, PlusIcon, PencilIcon, PowerIcon, TrashIcon, TeamIcon } from "../../components/common/icons.jsx";

export const CARGOS = ["Panadero", "Pastelero", "Cocinero", "Vendedor", "Barista", "Maestro pizzero", "Encargado de producción"];

// Colores vibrantes para avatares basados en el nombre
const AVATAR_COLORS = [
  { bg: "#6366F1", text: "#fff" }, // Indigo
  { bg: "#8B5CF6", text: "#fff" }, // Violet
  { bg: "#EC4899", text: "#fff" }, // Pink
  { bg: "#F59E0B", text: "#fff" }, // Amber
  { bg: "#10B981", text: "#fff" }, // Emerald
  { bg: "#06B6D4", text: "#fff" }, // Cyan
  { bg: "#F97316", text: "#fff" }, // Orange
  { bg: "#EF4444", text: "#fff" }, // Red
];

function getAvatarColor(name) {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function CollaboratorsScreen({ nav, business, collaborators, onAdd, onEdit, onToggleActive, onDelete, onRegenerateCode }) {
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

        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)",
          borderRadius: 16,
          padding: "16px 18px",
          marginBottom: 16,
          border: "1px solid rgba(99,102,241,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <TeamIcon size={28} color="var(--accent)" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text)" }}>
                  Mi Equipo
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{
                    background: activeCount > 0 ? "linear-gradient(135deg, #10B981 0%, #059669 100%)" : "var(--surface-alt)",
                    color: activeCount > 0 ? "#fff" : "var(--text-dim)",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 20,
                    letterSpacing: "0.02em",
                  }}>
                    {activeCount} {activeCount === 1 ? "activo" : "activos"}
                  </span>
                  <span style={{ color: "var(--text-dim)", fontSize: 12 }}>
                    · {collaborators.length} total
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={openAdd}
              style={{
                background: "var(--accent)",
                border: "none",
                borderRadius: 12,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "var(--on-accent)",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(232,162,61,0.3)",
              }}
            >
              <PlusIcon size={16} color="var(--on-accent)" /> Añadir
            </button>
          </div>
        </div>

        {collaborators.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "50px 24px",
            color: "var(--text-dim)",
            fontSize: 14,
            background: "var(--surface)",
            borderRadius: 16,
            border: "1px dashed var(--line)",
          }}>
            <TeamIcon size={40} color="var(--text-dim)" style={{ opacity: 0.4, marginBottom: 12 }} />
            <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--text)" }}>Sin colaboradores</div>
            <div>Añade a tu equipo para que puedan publicar contigo.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {collaborators.map((c) => {
              const avatarColor = getAvatarColor(c.name);
              return (
                <div
                  key={c.id}
                  style={{
                    background: "var(--surface)",
                    borderRadius: 14,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: "1px solid var(--line)",
                    opacity: c.active ? 1 : 0.6,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: c.active ? avatarColor.bg : "var(--surface-alt)",
                    color: c.active ? avatarColor.text : "var(--text-dim)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 18,
                    fontFamily: "var(--font-display)",
                    boxShadow: c.active ? `0 4px 12px ${avatarColor.bg}40` : "none",
                  }}>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12.5, color: "var(--text-dim)" }}>{c.cargo}</span>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: 6,
                        background: c.active ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)",
                        color: c.active ? "#10B981" : "#EF4444",
                      }}>
                        {c.active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => openEdit(c)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        border: "none",
                        background: "rgba(6,182,212,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <PencilIcon size={16} color="#06B6D4" />
                    </button>
                    <button
                      onClick={() => onToggleActive(c.id)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        border: "none",
                        background: c.active ? "rgba(16,185,129,0.12)" : "rgba(156,163,175,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <PowerIcon size={16} color={c.active ? "#10B981" : "#9CA3AF"} />
                    </button>
                    <button
                      onClick={() => onDelete(c.id)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        border: "none",
                        background: "rgba(239,68,68,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <TrashIcon size={16} color="#EF4444" />
                    </button>
                  </div>
                </div>
              );
            })}
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
