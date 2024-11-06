
"use client"

import mapData from '../data/office_geojson.json'
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useRef } from 'react';
import '../app/globals.css'

const position = [
  48.115969,
  11.589522,
]


export default function MapWrapper() {
  return (

    <MapContainer style={{ height: '100vh' }} center={position} zoom={20} maxZoom={30}  >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />
      <GeoJSON data={mapData} />
    </MapContainer>

  )
}