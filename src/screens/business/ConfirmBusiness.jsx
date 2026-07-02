import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORY_BY_ID } from "../../data/categories.js";
import { TopBar } from "../../components/common/TopBar.jsx";
import { Button } from "../../components/common/Button.jsx";

export function ConfirmBusinessScreen({ nav, business, onJoin }) {
  const cat = CATEGORY_BY_ID[business.category];
  return (
    <div className="re-screen re-screen-enter">
      <TopBar onBack={() => nav.back()} />
      <div className="re-permission">
        <div className="re-icon-circle" style={{ width: 96, height: 96, background: `${cat.tint}22` }}>
          <CatIcon id={business.category} size={40} color={cat.tint} />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 23, marginBottom: 8 }}>
            {business.name}
          </h1>
          <div className="re-code" style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 14 }}>{business.code}</div>
          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.55, maxWidth: 280 }}>
            Te unirás como colaborador y podrás publicar productos recién hechos en nombre de este negocio.
          </p>
        </div>
      </div>
      <div className="re-pad" style={{ paddingBottom: 40 }}>
        <Button variant="primary" onClick={onJoin}>Unirme a {business.name}</Button>
      </div>
    </div>
  );
}
