interface MapPin {
  lat: number;
  lng: number;
  label?: string;
}

interface StaticMapProps {
  pins: MapPin[];
  centerLat: number;
  centerLng: number;
  zoom?: number;
  width?: number;
  height?: number;
}

export function StaticMap({
  pins,
  centerLat,
  centerLng,
  zoom = 12,
  width = 800,
  height = 400,
}: StaticMapProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return null;

  const pinOverlay = pins
    .slice(0, 50)
    .map((pin) => `pin-s+FF3B7A(${pin.lng},${pin.lat})`)
    .join(",");

  let position: string;
  if (pins.length > 1) {
    position = "auto";
  } else {
    position = `${centerLng},${centerLat},${zoom}`;
  }

  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${pinOverlay}/${position}/${width}x${height}@2x?access_token=${token}&padding=40`;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-hela-dark/5">
      <img
        src={url}
        alt="Mapa de heladerías"
        width={width}
        height={height}
        className="w-full h-auto"
        loading="lazy"
      />
      
        href={`https://www.google.com/maps/search/heladeria/@${centerLat},${centerLng},${zoom}z`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-hela-dark text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
      >
        Abrir en Google Maps →
      </a>
    </div>
  );
}