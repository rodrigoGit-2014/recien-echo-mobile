import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Fix para iconos de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Icono personalizado para el usuario
const userIcon = L.divIcon({
  className: "user-location-marker",
  html: `
    <div style="position: relative; width: 24px; height: 24px;">
      <div style="position: absolute; inset: 0; background: rgba(66, 133, 244, 0.2); border-radius: 50%; animation: pulse 2s infinite;"></div>
      <div style="position: absolute; inset: 4px; background: #4285F4; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Icono para productos/negocios por categoría
const categoryColors = {
  pan: "#F59E0B",
  empanadas: "#EF4444",
  pizza: "#F97316",
  cafe: "#8B5CF6",
  pasteles: "#EC4899",
  sopaipillas: "#F59E0B",
  tortas: "#EC4899",
  default: "#10B981",
};

function createProductIcon(category, isSelected) {
  const color = categoryColors[category] || categoryColors.default;
  const size = isSelected ? 40 : 32;
  const borderWidth = isSelected ? 4 : 3;

  return L.divIcon({
    className: "product-marker",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: ${borderWidth}px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        ${isSelected ? 'animation: bounce 0.3s ease;' : ''}
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

// Componente para centrar el mapa cuando cambia la ubicación
function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export function RealMap({
  userLocation,
  publications = [],
  selectedId,
  onSelectPublication,
  onOpenDetail
}) {
  // Ubicación por defecto (Santiago, Las Condes)
  const defaultLocation = { lat: -33.4103, lng: -70.5672 };
  const center = userLocation || defaultLocation;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: rotate(-45deg) translateY(0); }
          50% { transform: rotate(-45deg) translateY(-8px); }
        }
        .leaflet-container {
          width: 100%;
          height: 100%;
          font-family: inherit;
          z-index: 1 !important;
        }
        .leaflet-pane {
          z-index: 1 !important;
        }
        .leaflet-top, .leaflet-bottom {
          z-index: 500 !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
        }
        .leaflet-popup-content {
          margin: 0;
          min-width: 180px;
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenterUpdater center={[center.lat, center.lng]} />

        {/* Marcador del usuario */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}

        {/* Marcadores de publicaciones */}
        {publications.map((pub) => (
          <Marker
            key={pub.id}
            position={[pub.lat, pub.lng]}
            icon={createProductIcon(pub.category, selectedId === pub.id)}
            eventHandlers={{
              click: () => {
                onSelectPublication(pub);
                if (onOpenDetail) onOpenDetail(pub);
              },
            }}
          >
            <Popup>
              <div style={{ padding: "8px 4px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  {pub.product}
                </div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
                  {pub.businessName}
                </div>
                <div style={{ fontSize: 11, color: "#999" }}>
                  {pub.quantity} disponibles
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
