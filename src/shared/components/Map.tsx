"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = 'pk.eyJ1IjoiaGlqaWFuZ3RhbyIsImEiOiJjampxcjFnb3E2NTB5M3BvM253ZHV5YjhjIn0.WneUon5qFigfJRJ3oaZ3Ow';

interface MapProps {
  initialCenter: { lat: number; lng: number }
  onClick?: (lat: number, lng: number) => void
  markerPosition?: { lat: number; lng: number }
}

export default function Map({ initialCenter, onClick, markerPosition }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [initialCenter.lng, initialCenter.lat],
        zoom: 12,
      })

      if (onClick) {
        map.on("click", (e) => {
          const { lng, lat } = e.lngLat
          onClick(lat, lng)
        })
      }

      return () => map.remove()
    }
  }, [initialCenter, onClick])

  useEffect(() => {
    if (markerPosition && mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [markerPosition.lng, markerPosition.lat],
        zoom: 12,
      })

      if (markerRef.current) {
        markerRef.current.remove()
      }

      markerRef.current = new mapboxgl.Marker()
        .setLngLat([markerPosition.lng, markerPosition.lat])
        .addTo(map)
    }
  }, [markerPosition])

  return <div ref={mapRef} className="w-full h-full" />
}