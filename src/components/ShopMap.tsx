"use client";

import { useEffect, useRef } from "react";

interface ShopMapProps {
  lat: number;
  lng: number;
  name: string;
}

export function ShopMap({ lat, lng, name }: ShopMapProps) {
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
        center: [lng, lat],
        zoom: 15,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.scrollZoom.disable();

      map.on("load", () => {
        const el = document.createElement("div");
        el.innerHTML = "🍦";
        el.style.fontSize = "32px";
        el.style.filter = "drop-shadow(0 2px 6px rgba(0,0,0,0.3))";
        el.style.animation = "float 3s ease-in-out infinite";

        new mapboxgl.Marker({ element: el })
          .setLngLat([lng, lat])
          .addTo(map);
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
  }, [lat, lng, name]);

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.9.3/mapbox-gl.css"
        rel="stylesheet"
      />
      <div
        ref={mapContainer}
        style={{ height: "250px", width: "100%" }}
        className="rounded-2xl border border-hela-dark/5 overflow-hidden"
      />
    </>
  );
}
