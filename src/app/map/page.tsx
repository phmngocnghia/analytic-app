"use client"

import dynamic from 'next/dynamic';

const Map = dynamic(() => import("./components/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});



export default function MapPage() {
  return (
    <div>
      <Map />
    </div>
  )
}