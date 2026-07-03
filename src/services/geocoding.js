const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

/**
 * Geocodifica una dirección a coordenadas usando Nominatim (OpenStreetMap).
 * @param {string} address - La dirección a geocodificar
 * @returns {Promise<{lat: number, lng: number, displayName: string} | null>}
 */
export async function geocodeAddress(address) {
  if (!address || address.trim().length < 3) return null;

  try {
    const params = new URLSearchParams({
      q: address,
      format: "json",
      limit: "1",
      addressdetails: "1",
    });

    const response = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
      headers: {
        "Accept-Language": "es",
      },
    });

    if (!response.ok) return null;

    const results = await response.json();
    if (!results || results.length === 0) return null;

    const result = results[0];
    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      displayName: result.display_name,
    };
  } catch (error) {
    console.error("Error geocodificando dirección:", error);
    return null;
  }
}

/**
 * Convierte coordenadas a una dirección legible usando Nominatim.
 * @param {number} lat - Latitud
 * @param {number} lng - Longitud
 * @returns {Promise<string | null>}
 */
export async function reverseGeocode(lat, lng) {
  if (lat == null || lng == null) return null;

  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      format: "json",
      addressdetails: "1",
    });

    const response = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
      headers: {
        "Accept-Language": "es",
      },
    });

    if (!response.ok) return null;

    const result = await response.json();
    if (!result || result.error) return null;

    // Construir dirección corta y legible
    const addr = result.address || {};
    const parts = [];

    if (addr.road) {
      let road = addr.road;
      if (addr.house_number) road += ` ${addr.house_number}`;
      parts.push(road);
    }

    if (addr.suburb || addr.neighbourhood) {
      parts.push(addr.suburb || addr.neighbourhood);
    }

    if (addr.city || addr.town || addr.village) {
      parts.push(addr.city || addr.town || addr.village);
    }

    return parts.length > 0 ? parts.join(", ") : result.display_name;
  } catch (error) {
    console.error("Error en reverse geocoding:", error);
    return null;
  }
}

/**
 * Obtiene la ubicación actual del usuario usando la Geolocation API.
 * @returns {Promise<{lat: number, lng: number}>}
 */
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no soportada por el navegador"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let message = "Error obteniendo ubicación";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Permiso de ubicación denegado";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Ubicación no disponible";
            break;
          case error.TIMEOUT:
            message = "Tiempo de espera agotado";
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}
