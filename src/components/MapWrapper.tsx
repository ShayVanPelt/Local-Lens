"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper({ center }: { center: [number, number] }) {
  return <DynamicMap center={center} />;
}
