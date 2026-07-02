import { TopBar } from "../components/common/TopBar.jsx";
import { ChevronRightIcon, UserIcon, SettingsIcon, CardIcon } from "../components/common/icons.jsx";

export function ModeSelectScreen({ nav }) {
  const modes = [
    {
      id: "vecino", title: "Soy vecino", tint: "var(--accent)", onColor: "var(--on-accent)",
      desc: "Quiero descubrir lo recién hecho cerca de mí.", icon: <UserIcon size={22} />,
      onClick: () => nav.go("vecinoSignup"),
    },
    {
      id: "negocio", title: "Tengo un negocio", tint: "var(--fresh)", onColor: "var(--on-fresh)",
      desc: "Quiero avisar a mis vecinos cuando algo esté listo.", icon: <SettingsIcon size={22} />,
      onClick: () => nav.go("createBusinessAccount"),
    },
    {
      id: "colaborador", title: "Soy colaborador", tint: "#E5673B", onColor: "#2b0f05",
      desc: "Me uno a un negocio con un código para publicar.", icon: <CardIcon size={22} />,
      onClick: () => nav.go("joinWithCode"),
    },
  ];
  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-pad" style={{ marginTop: 8, marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 27, letterSpacing: "-0.02em" }}>
          ¿Cómo quieres usar ReciénEcho?
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8 }}>Elige tu rol para empezar.</p>
      </div>
      <div className="re-pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {modes.map((m) => (
          <div key={m.id} className="re-mode-card" onClick={m.onClick}>
            <div className="re-icon-circle" style={{ width: 48, height: 48, background: m.tint, color: m.onColor, flexShrink: 0 }}>
              {m.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div className="re-mode-card__title">{m.title}</div>
              <div className="re-mode-card__desc">{m.desc}</div>
            </div>
            <ChevronRightIcon size={18} color="var(--text-dim)" />
          </div>
        ))}
      </div>
    </div>
  );
}
