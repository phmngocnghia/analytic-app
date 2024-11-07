
"use client"

import type { GeoJsonObject } from 'geojson';
import mapData from '../../../data/office_geojson.json'
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L, { LatLngBounds, LatLngTuple } from 'leaflet'
import { useMemo, useState } from 'react';

const centerPosition = new L.LatLng(
  48.115969,
  11.589522,
)

const labels = mapData.features.map(f => {
  // geojson coord is lng,lat instead of lat,lng
  const coords = f.geometry.coordinates[0].map(coord => [coord[1], coord[0]]) as LatLngTuple[]
  const polygonBounds = new LatLngBounds(coords)
  return ({
    name: f.properties.name,
    coordinates: polygonBounds.getCenter()
  })
})



const GeoLabel = () => {
  const [zoomLevel, setZoomLevel] = useState(23);
  const shouldShowLabel = useMemo(() => zoomLevel > 20, [zoomLevel])



  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  // the polygon is very small to accommodate for label 
  if (shouldShowLabel) {
    return labels.map(l => {
      const i = L.divIcon({
        className: 'label',
        html: l.name,
        iconSize: [100, 40]
      })
      return (
        <Marker position={l.coordinates} icon={i} />
      )
    })
  }

  return null
}


export default function MapWrapper() {

  return (
    <div>
      <MapContainer style={{ height: '80vh' }} center={centerPosition} zoom={23} maxZoom={24}    >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />
        <GeoJSON data={mapData as GeoJsonObject} />
        <GeoLabel />

      </MapContainer>
    </div>

  )
}