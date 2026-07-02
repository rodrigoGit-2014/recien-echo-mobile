import { useMemo, useState } from "react";
import { MapBackground, UserMarker } from "../../components/radar/MapBackground.jsx";
import { Pin, ClusterPin } from "../../components/radar/Pin.jsx";
import { RadarTopOverlay } from "../../components/radar/RadarTopOverlay.jsx";
import { ProductCard } from "../../components/radar/ProductCard.jsx";
import { clusterPins } from "../../components/radar/clustering.js";
import { ChevronDownIcon, CrosshairIcon } from "../../components/common/icons.jsx";

export function RadarScreen({ pins, now, onOpenDetail, onOpenProfile, onOpenNotifications }) {
  const [category, setCategory] = useState("todos");
  const [selectedId, setSelectedId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [expandedCluster, setExpandedCluster] = useState(null);
  const userPos = { x: 46, y: 44 };

  const visiblePins = category === "todos" ? pins : pins.filter((p) => p.category === category);
  const sortedByDistance = useMemo(
    () => [...visiblePins].sort((a, b) => a.distanceM - b.distanceM),
    [visiblePins]
  );

  const groups = useMemo(() => clusterPins(pins), [pins]);

  function handleSelectPin(pin) {
    setSelectedId(pin.id);
  }

  function handleExpandCluster(group, cx, cy) {
    setExpandedCluster({ ids: group.map((p) => p.id), cx, cy });
  }

  function handleCardClick(pin) {
    setSelectedId(pin.id);
    onOpenDetail(pin);
  }

  return (
    <div className="re-screen">
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <MapBackground />
        <UserMarker x={userPos.x} y={userPos.y} />

        {groups.map((group, gi) => {
          const isClusterExpanded = expandedCluster && group.every((p) => expandedCluster.ids.includes(p.id));
          if (group.length === 1) {
            const pin = group[0];
            const dim = category !== "todos" && pin.category !== category;
            return (
              <Pin
                key={pin.id}
                pin={pin}
                now={now}
                selected={selectedId === pin.id}
                dim={dim}
                onSelect={handleSelectPin}
              />
            );
          }
          if (!isClusterExpanded) {
            const dim = category !== "todos" && !group.some((p) => p.category === category);
            return (
              <div key={"c" + gi} style={{ opacity: dim ? 0.22 : 1 }}>
                <ClusterPin group={group} onExpand={handleExpandCluster} />
              </div>
            );
          }
          const n = group.length;
          const radiusPct = 11;
          return group.map((pin, i) => {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            const fx = expandedCluster.cx + Math.cos(angle) * radiusPct;
            const fy = expandedCluster.cy + Math.sin(angle) * radiusPct * 0.75;
            const dim = category !== "todos" && pin.category !== category;
            return (
              <Pin
                key={pin.id}
                pin={{ ...pin, x: fx, y: fy }}
                now={now}
                selected={selectedId === pin.id}
                dim={dim}
                onSelect={handleSelectPin}
              />
            );
          });
        })}

        <RadarTopOverlay
          activeCategory={category}
          onSelectCategory={(c) => { setCategory(c); setExpandedCluster(null); }}
          onOpenProfile={onOpenProfile}
          onOpenNotifications={onOpenNotifications}
        />

        <button
          className="re-center-btn"
          style={{ bottom: expanded ? "calc(64% + 16px)" : "204px" }}
          onClick={() => setExpandedCluster(null)}
        >
          <CrosshairIcon size={20} />
        </button>
      </div>

      <div className="re-sheet" style={{ height: expanded ? "64%" : "188px" }}>
        <div className="re-sheet__handle" />
        <div className="re-nearby-header" onClick={() => setExpanded((e) => !e)}>
          <div>
            <div className="re-nearby-title">Cerca de ti</div>
            <div className="re-nearby-count">{visiblePins.length} recién hechos</div>
          </div>
          <ChevronDownIcon size={20} className={`re-nearby-chevron ${expanded ? "re-nearby-chevron--up" : ""}`} />
        </div>
        <div className="re-scroll re-pad" style={{ paddingBottom: 20 }}>
          {sortedByDistance.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-dim)", fontSize: 14 }}>
              No hay publicaciones recién hechas en esta categoría por ahora. Prueba con "Todos" o vuelve en unos minutos.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sortedByDistance.map((pin) => (
                <ProductCard
                  key={pin.id}
                  pin={pin}
                  now={now}
                  active={selectedId === pin.id}
                  onClick={() => handleCardClick(pin)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
