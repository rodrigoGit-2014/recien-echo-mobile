import { useEffect, useMemo, useState } from "react";
import { RealMap } from "../../components/radar/RealMap.jsx";
import { RadarTopOverlay } from "../../components/radar/RadarTopOverlay.jsx";
import { ProductCard } from "../../components/radar/ProductCard.jsx";
import { ChevronDownIcon, CrosshairIcon } from "../../components/common/icons.jsx";

const API_BASE = "/api";

// Calcular distancia entre dos puntos en metros
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calcular tiempo caminando (aprox 5 km/h)
function walkMinutes(meters) {
  return Math.max(1, Math.round(meters / 83));
}

export function RadarScreen({ userLocation, onOpenDetail, onOpenProfile, onOpenNotifications }) {
  const [category, setCategory] = useState("todos");
  const [selectedId, setSelectedId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recenterTrigger, setRecenterTrigger] = useState(0);

  const sheetHeight = expanded ? "64%" : "188px";

  // Cargar publicaciones del backend
  useEffect(() => {
    async function loadPublications() {
      try {
        const res = await fetch(`${API_BASE}/radar/publications`);
        const data = await res.json();
        if (data.ok && data.publications) {
          const pubs = data.publications.map(pub => {
            const distanceM = userLocation
              ? calculateDistance(userLocation.lat, userLocation.lng, pub.lat, pub.lng)
              : 0;
            return {
              ...pub,
              distanceM: Math.round(distanceM),
              walkMin: walkMinutes(distanceM),
            };
          });
          setPublications(pubs);
        }
      } catch (err) {
        console.error("Error cargando publicaciones:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPublications();
    const interval = setInterval(loadPublications, 30000);
    return () => clearInterval(interval);
  }, [userLocation]);

  const visiblePubs = category === "todos"
    ? publications
    : publications.filter((p) => p.category === category);

  const sortedByDistance = useMemo(
    () => [...visiblePubs].sort((a, b) => a.distanceM - b.distanceM),
    [visiblePubs]
  );

  function handleSelectPublication(pub) {
    setSelectedId(pub.id);
  }

  function handleCardClick(pub) {
    setSelectedId(pub.id);
    onOpenDetail(pub);
  }

  function handleCenterMap() {
    setSelectedId(null);
    setRecenterTrigger((t) => t + 1);
  }

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg)"
    }}>
      {/* Área del mapa */}
      <div style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        minHeight: 0
      }}>
        <RealMap
          userLocation={userLocation}
          publications={visiblePubs}
          selectedId={selectedId}
          onSelectPublication={handleSelectPublication}
          onOpenDetail={onOpenDetail}
          recenterTrigger={recenterTrigger}
        />

        {/* Overlay superior con categorías */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <RadarTopOverlay
            activeCategory={category}
            onSelectCategory={(c) => setCategory(c)}
            onOpenProfile={onOpenProfile}
            onOpenNotifications={onOpenNotifications}
          />
        </div>

        {/* Botón centrar */}
        <button
          className="re-center-btn"
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
            zIndex: 1000
          }}
          onClick={handleCenterMap}
        >
          <CrosshairIcon size={20} />
        </button>
      </div>

      {/* Sheet de productos */}
      <div style={{
        height: sheetHeight,
        background: "var(--bg)",
        borderTopLeftRadius: 27,
        borderTopRightRadius: 27,
        border: "1px solid var(--line)",
        borderBottom: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
        transition: "height 340ms cubic-bezier(.3,.8,.3,1)",
        zIndex: 1000
      }}>
        <div className="re-sheet__handle" />
        <div className="re-nearby-header" onClick={() => setExpanded((e) => !e)}>
          <div>
            <div className="re-nearby-title">Cerca de ti</div>
            <div className="re-nearby-count">
              {loading ? "Cargando..." : `${visiblePubs.length} recién hechos`}
            </div>
          </div>
          <ChevronDownIcon size={20} className={`re-nearby-chevron ${expanded ? "re-nearby-chevron--up" : ""}`} />
        </div>
        <div className="re-scroll re-pad" style={{ paddingBottom: 20 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-dim)", fontSize: 14 }}>
              Buscando productos cerca de ti...
            </div>
          ) : sortedByDistance.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-dim)", fontSize: 14 }}>
              No hay publicaciones recién hechas en esta categoría por ahora. Prueba con "Todos" o vuelve en unos minutos.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sortedByDistance.map((pub) => (
                <ProductCard
                  key={pub.id}
                  pin={pub}
                  now={Date.now()}
                  active={selectedId === pub.id}
                  onClick={() => handleCardClick(pub)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
