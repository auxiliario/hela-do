"use client";

import { useEffect, useRef } from "react";

interface MapPin {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  score: number | null;
}

interface MapViewProps {
  pins: MapPin[];
  centerLat: number;
  centerLng: number;
  zoom?: number;
  height?: string;
}

export function MapView({
  pins,
  centerLat,
  centerLng,
  zoom = 12,
  height = "400px",
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    let cancelled = false;

    import("mapbox-gl").then((mapboxgl) => {
      if (cancelled || !mapContainer.current) return;

      // @ts-ignore
      mapboxgl.accessToken = token;

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [centerLng, centerLat],
        zoom: zoom,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.on("load", () => {
        // Add markers
        pins.forEach((pin) => {
          // Create custom marker element
          const el = document.createElement("div");
          el.className = "hela-marker";
          el.innerHTML = "🍦";
          el.style.fontSize = "24px";
          el.style.cursor = "pointer";
          el.style.lineHeight = "1";
          el.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.2))";
          el.style.transition = "transform 0.2s";
          el.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.3)";
          });
          el.addEventListener("mouseleave", () => {
            el.style.transform = "scale(1)";
          });

          // Popup
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            maxWidth: "220px",
          }).setHTML(
            `<div style="font-family: 'DM Sans', sans-serif; padding: 4px;">
              <a href="/heladeria/${pin.slug}" style="text-decoration: none; color: #1A0A1F;">
                <strong style="font-size: 13px; display: block; margin-bottom: 2px;">${pin.name}</strong>
                ${pin.score ? `<span style="font-size: 11px; color: #FF3B7A;">⭐ ${pin.score}</span>` : ""}
              </a>
            </div>`
          );

          new mapboxgl.Marker({ element: el })
            .setLngLat([pin.lng, pin.lat])
            .setPopup(popup)
            .addTo(map);
        });

        // Fit bounds if multiple pins
        if (pins.length > 1) {
          const bounds = new mapboxgl.LngLatBounds();
          pins.forEach((pin) => bounds.extend([pin.lng, pin.lat]));
          map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
        }
      });

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [pins, centerLat, centerLng, zoom]);

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.9.3/mapbox-gl.css"
        rel="stylesheet"
      />
      <div
        ref={mapContainer}
        style={{ height, width: "100%" }}
        className="rounded-2xl border border-hela-dark/5 overflow-hidden"
      />
    </>
  );
}
