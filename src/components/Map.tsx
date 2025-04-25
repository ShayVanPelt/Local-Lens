"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";

// Move the map on center change
function MapUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function Map({ center }: { center: [number, number] }) {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const query = `
      [out:json];
      node["amenity"="restaurant"](around:1000,${center[0]},${center[1]});
      out;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setElements(data.elements);
      })
      .catch((err) => console.error("Overpass error:", err));
  }, [center]);

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={true}
      className="h-[700px] w-full z-0 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapUpdater center={center} />

      <Marker position={center}>
        <Popup>This is the center</Popup>
      </Marker>

      {elements.map((el, idx) => (
        <Circle
          key={idx}
          center={[el.lat, el.lon]}
          radius={20}
          pathOptions={{ color: "red" }}
        >
          <Popup>{el.tags?.name || "Unnamed restaurant"}</Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
