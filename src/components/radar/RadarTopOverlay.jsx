import { CatIcon } from "../../data/CatIcon.jsx";
import { CATEGORIES } from "../../data/categories.js";
import { BrandMark, Wordmark } from "../common/Brand.jsx";
import { Chip } from "../common/Chip.jsx";
import { BellIcon, UserIcon } from "../common/icons.jsx";

export function RadarTopOverlay({ activeCategory, onSelectCategory, onOpenProfile, onOpenNotifications }) {
  return (
    <div className="re-radar-topbar">
      <div className="re-radar-topbar__row">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BrandMark size={30} />
          <Wordmark size={20} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="re-radar-iconbtn" onClick={onOpenNotifications}>
            <BellIcon size={19} />
            <span className="re-radar-iconbtn__dot" />
          </button>
          <button className="re-radar-iconbtn" onClick={onOpenProfile}>
            <UserIcon size={19} />
          </button>
        </div>
      </div>
      <div className="re-cat-carousel">
        <Chip
          active={activeCategory === "todos"}
          label="Todos"
          onClick={() => onSelectCategory("todos")}
        />
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            active={activeCategory === c.id}
            tint={c.tint}
            icon={<CatIcon id={c.id} size={16} />}
            label={c.label}
            onClick={() => onSelectCategory(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
