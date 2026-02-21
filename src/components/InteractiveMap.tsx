"use client";

import { useEffect, useRef } from "react";

interface MapPin {
  lat: number;
  lng: number;
  name: string;
  slug: string;
  score?: number;
}

interface InteractiveMapProps {
  pins: MapPin[];
  centerLat: number;
  centerLng: number;
  zoom?: number;
}

export function InteractiveMap({ pins, centerLat, centerLng, zoom = 12 }: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return null;

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js";
    script.onload = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
      document.head.appendChild(link);

      const mapboxgl = (window as any).mapboxgl;
      mapboxgl.accessToken = token;

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [centerLng, centerLat],
        zoom: zoom,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      const bounds = new mapboxgl.LngLatBounds();

      pins.forEach((pin) => {
        const el = document.createElement("div");
        el.style.width = "28px";
        el.style.height = "28px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = "#FF3B7A";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)";
        el.style.cursor = "pointer";

        const popupHTML =
          '<div style="font-family:system-ui;padding:4px 2px;">' +
          '<a href="/heladeria/' + pin.slug + '" style="font-weight:600;font-size:14px;color:#1a1a2e;text-decoration:none;">' +
          pin.name +
          "</a>" +
          (pin.score ? '<div style="font-size:12px;color:#888;margin-top:2px;">⭐ ' + pin.score + "</div>" : "") +
          "</div>";

        const popup = new mapboxgl.Popup({ offset: 18, closeButton: false }).setHTML(popupHTML);

        new mapboxgl.Marker({ element: el })
          .setLngLat([pin.lng, pin.lat])
          .setPopup(popup)
          .addTo(map);

        bounds.extend([pin.lng, pin.lat]);
      });

      if (pins.length > 1) {
        map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
      }

      mapRef.current = map;
    };
    document.head.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-hela-dark/5">
      <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />
      <a
        href={"https://www.google.com/maps/search/heladeria/@" + centerLat + "," + centerLng + "," + zoom + "z"}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-hela-dark text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-white transition-colors z-10"
      >
        Abrir en Google Maps
      </a>
    </div>
  );
}
