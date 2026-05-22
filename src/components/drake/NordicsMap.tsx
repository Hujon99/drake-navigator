import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const OFFICES = [
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Göteborg", lat: 57.7089, lng: 11.9746 },
  { name: "Linköping", lat: 58.4108, lng: 15.6214 },
  { name: "Jönköping", lat: 57.7826, lng: 14.1618 },
];

/** Premium Nordics map for slide 2. Carto "Positron (no labels)" tiles give a
 * clean, monochrome look that fits the Drake palette.
 * Leaflet is imported dynamically so SSR (which has no `window`) is safe. */
export function NordicsMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<unknown>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !ref.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current) return;

      const map = L.map(ref.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        touchZoom: false,
        keyboard: false,
        attributionControl: false,
      });

      map.fitBounds(
        [
          [55.2, 10.5],
          [64.5, 22.5],
        ],
        { padding: [10, 10] }
      );

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      const makeIcon = () =>
        L.divIcon({
          className: "drake-marker",
          html: `<span class="drake-marker__ring"></span><span class="drake-marker__dot"></span>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

      OFFICES.forEach((o) => {
        const m = L.marker([o.lat, o.lng], { icon: makeIcon() }).addTo(map);
        m.bindTooltip(o.name, {
          permanent: true,
          direction: "right",
          offset: [10, 0],
          className: "drake-marker__label",
        });
      });

      mapRef.current = map;
      setTimeout(() => map.invalidateSize(), 50);

      const onResize = () => map.invalidateSize();
      window.addEventListener("resize", onResize);
      (map as unknown as { _drakeCleanup: () => void })._drakeCleanup = () =>
        window.removeEventListener("resize", onResize);
    })();

    return () => {
      cancelled = true;
      const m = mapRef.current as
        | (L.Map & { _drakeCleanup?: () => void })
        | null;
      m?._drakeCleanup?.();
      m?.remove();
      mapRef.current = null;
    };
  }, [mounted]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full"
      aria-label="Drake Analytics kontor i Norden"
    />
  );
}
