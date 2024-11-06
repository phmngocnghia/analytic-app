'use client'

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
// import Map from './components/Map'



export const W = () => {
  return (
    <div className="p-5">
      <Map />
    </div>
  )
}