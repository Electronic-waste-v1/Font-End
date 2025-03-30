import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGlqaWFuZ3RhbyIsImEiOiJjampxcjFnb3E2NTB5M3BvM253ZHV5YjhjIn0.WneUon5qFigfJRJ3oaZ3Ow';

interface Coordinates {
  lat: number;
  lng: number;
}

interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  status: string;
  coordinates: Coordinates;
}

interface CollectionPointMapProps {
  points: CollectionPoint[];
  onPointSelect: (id: string) => void;
  selectedPoint: string | null;
}

export default function CollectionPointMap({
  points,
  onPointSelect,
  selectedPoint,
}: CollectionPointMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);


  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      
      const defaultCenter = [-73.968285, 40.785091]; 
      const center = points.length > 0 
        ? [points[0].coordinates.lng, points[0].coordinates.lat] 
        : defaultCenter;

      mapInstanceRef.current = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 12,
      });

   
      mapInstanceRef.current.addControl(new mapboxgl.NavigationControl());

   
      mapInstanceRef.current.on("load", () => {
        setMapLoaded(true);
        if (points.length > 0) {
          updateMarkers(points, selectedPoint);
          fitMapToPoints(points);
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); 
  useEffect(() => {
    if (mapInstanceRef.current && mapLoaded) {
      updateMarkers(points, selectedPoint);
      if (points.length > 0) {
        fitMapToPoints(points);
      }
    }
  }, [points, selectedPoint, mapLoaded]);

  const fitMapToPoints = (currentPoints: CollectionPoint[]) => {
    if (currentPoints.length === 0 || !mapInstanceRef.current) return;

    const bounds = new mapboxgl.LngLatBounds();
    
    currentPoints.forEach(point => {
      bounds.extend([point.coordinates.lng, point.coordinates.lat]);
    });
    
    mapInstanceRef.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 14
    });
  };

  const updateMarkers = (
    currentPoints: CollectionPoint[],
    currentSelectedPoint: string | null
  ) => {
   
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];


    currentPoints.forEach((point) => {
      const color = point.status === "Open" ? "#10b981" : "#9ca3af";
      const fillColor = currentSelectedPoint === point.id ? color : "white";
      const strokeWidth = currentSelectedPoint === point.id ? "2" : "1";

      
      const svg = `
        <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                fill="${color}" 
                stroke="${color}"
                stroke-width="${strokeWidth}"
                fill-opacity="0.8"
                fill-rule="evenodd"/>
          <circle cx="12" cy="9" r="3" fill="${fillColor}" stroke="${color}" stroke-width="1"/>
        </svg>
      `;

   
      const el = document.createElement("div");
      el.innerHTML = svg;
      el.style.cursor = "pointer";
      el.style.width = "32px";
      el.style.height = "32px";
      
 
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <strong>${point.name}</strong>
          <p>${point.address}</p>
          <p><span style="color: ${point.status === 'Open' ? '#10b981' : '#ef4444'}">${point.status}</span></p>
        `);

      
      el.addEventListener("click", () => onPointSelect(point.id));

 
      const marker = new mapboxgl.Marker(el)
        .setLngLat([point.coordinates.lng, point.coordinates.lat])
        .setPopup(popup)
        .addTo(mapInstanceRef.current!);


      markersRef.current.push(marker);
    });
  };

  return (
    <div
      ref={mapRef}
      className="w-full h-full relative bg-gray-100 rounded-lg overflow-hidden"
    >
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      )}
    </div>
  );
}