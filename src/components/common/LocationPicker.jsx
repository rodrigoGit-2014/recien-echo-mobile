import { useState, useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import { geocodeAddress, reverseGeocode, getCurrentLocation } from "../../services/geocoding.js";
import { TextField } from "./TextField.jsx";

// Fix para íconos de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * LocationPicker - Componente para seleccionar ubicación con mapa interactivo
 */
export function LocationPicker({
  address,
  onAddressChange,
  lat,
  lng,
  onLocationChange,
}) {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const debounceRef = useRef(null);

  // Coordenadas por defecto (Santiago de Chile)
  const defaultCenter = [-33.4489, -70.6693];
  const hasLocation = lat != null && lng != null;

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const center = hasLocation ? [lat, lng] : defaultCenter;
    const map = L.map(mapContainerRef.current, {
      center,
      zoom: hasLocation ? 16 : 12,
      zoomControl: true,
    });

    // Tiles claros estilo Google Maps (CartoDB Voyager)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Click en mapa para colocar marcador
    map.on("click", async (e) => {
      const { lat: newLat, lng: newLng } = e.latlng;
      onLocationChange(newLat, newLng);

      const addressResult = await reverseGeocode(newLat, newLng);
      if (addressResult) {
        onAddressChange({ target: { value: addressResult } });
      }
    });

    mapRef.current = map;

    // Agregar marcador si hay ubicación
    if (hasLocation) {
      markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(map);
      markerRef.current.on("dragend", async (e) => {
        const { lat: newLat, lng: newLng } = e.target.getLatLng();
        onLocationChange(newLat, newLng);

        const addressResult = await reverseGeocode(newLat, newLng);
        if (addressResult) {
          onAddressChange({ target: { value: addressResult } });
        }
      });
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // Solo inicializar una vez

  // Actualizar marcador y vista cuando cambian las coordenadas
  useEffect(() => {
    if (!mapRef.current) return;

    if (hasLocation) {
      mapRef.current.setView([lat, lng], 16, { animate: true });

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(mapRef.current);
        markerRef.current.on("dragend", async (e) => {
          const { lat: newLat, lng: newLng } = e.target.getLatLng();
          onLocationChange(newLat, newLng);

          const addressResult = await reverseGeocode(newLat, newLng);
          if (addressResult) {
            onAddressChange({ target: { value: addressResult } });
          }
        });
      }
    }
  }, [lat, lng, hasLocation, onLocationChange, onAddressChange]);

  // Geocodificar dirección
  const handleGeocode = useCallback(async () => {
    if (!address || address.trim().length < 3) return;

    setIsGeocoding(true);
    setError(null);

    try {
      const result = await geocodeAddress(address);
      if (result) {
        onLocationChange(result.lat, result.lng);
      } else {
        setError("No se encontró la dirección");
      }
    } catch (err) {
      setError("Error al buscar dirección");
    } finally {
      setIsGeocoding(false);
    }
  }, [address, onLocationChange]);

  // Debounce para geocodificación automática
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (address && address.trim().length >= 5) {
      debounceRef.current = setTimeout(() => {
        handleGeocode();
      }, 1000);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [address, handleGeocode]);

  // Usar mi ubicación
  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setError(null);

    try {
      const coords = await getCurrentLocation();
      onLocationChange(coords.lat, coords.lng);

      const addressResult = await reverseGeocode(coords.lat, coords.lng);
      if (addressResult) {
        onAddressChange({ target: { value: addressResult } });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLocating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGeocode();
    }
  };

  return (
    <div className="location-picker">
      <TextField
        label="Ubicación"
        placeholder="Calle, número, comuna"
        value={address}
        onChange={onAddressChange}
        onKeyDown={handleKeyDown}
        onBlur={handleGeocode}
        disabled={isGeocoding}
      />

      <button
        type="button"
        onClick={handleUseMyLocation}
        disabled={isLocating}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: "10px 16px",
          marginTop: 10,
          background: "transparent",
          border: "1px solid var(--line)",
          borderRadius: 10,
          color: "var(--accent)",
          fontSize: 14,
          fontWeight: 500,
          cursor: isLocating ? "wait" : "pointer",
          opacity: isLocating ? 0.7 : 1,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
        {isLocating ? "Obteniendo ubicación..." : "Usar mi ubicación"}
      </button>

      {error && (
        <div style={{
          color: "var(--error)",
          fontSize: 13,
          marginTop: 8,
          textAlign: "center",
        }}>
          {error}
        </div>
      )}

      <div
        ref={mapContainerRef}
        style={{
          height: 180,
          borderRadius: 14,
          marginTop: 12,
          overflow: "hidden",
          border: "1px solid var(--line)",
        }}
      />

      {hasLocation && (
        <div style={{
          fontSize: 11,
          color: "var(--text-dim)",
          marginTop: 6,
          textAlign: "center",
        }}>
          Puedes arrastrar el marcador para ajustar la ubicación
        </div>
      )}
    </div>
  );
}
