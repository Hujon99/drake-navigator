import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const OFFICES = [
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Göteborg", lat: 57.7089, lng: 11.9746 },
  { name: "Linköping", lat: 58.4108, lng: 15.6214 },
  { name: "Jönköping", lat: 57.7826, lng: 14.1618 },
];

/** Premium Nordics map for slide 2. Carto "Positron (no labels)" tiles give a
 * clean, monochrome look that fits the Drake palette. */
export function NordicsMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    const map = L.map(ref.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      touchZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    // Frame Sweden + a touch of neighbours
    map.fitBounds(
      [
        [55.2, 10.5],
        [64.5, 22.5],
      ],
      { padding: [10, 10] }
    );

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    // Custom branded marker
    const makeIcon = () =>
      L.divIcon({
        className: "drake-marker",
        html: `
          <span class="drake-marker__ring"></span>
          <span class="drake-marker__dot"></span>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

    OFFICES.forEach((o) => {
      const marker = L.marker([o.lat, o.lng], { icon: makeIcon() }).addTo(map);
      marker.bindTooltip(o.name, {
        permanent: true,
        direction: "right",
        offset: [10, 0],
        className: "drake-marker__label",
      });
    });

    mapRef.current = map;

    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);
    // Re-fit after first layout
    setTimeout(handleResize, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 w-full h-full" aria-label="Drake Analytics kontor i Norden" />;
}
