"use client";

import { useState } from "react";
import { Container, TextInput, Button, Group } from "@mantine/core";
//import { IconSearch } from "@tabler/icons-react";
import MapWrapper from "@/components/MapWrapper";

export default function MapData() {
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState<[number, number]>([48.4284, -123.3656]); // Default to Victoria, BC

  const handleSearch = async () => {
    if (!search) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}&countrycodes=ca&limit=1`
      );
      const data = await res.json();
      if (data?.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setCenter([lat, lon]);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Failed to fetch location.");
    }
  };

  return (
    <>
      <Container size={"xl"} className="py-4">
        <Group grow>
          <TextInput
            placeholder="Search for a Canadian city or neighborhood..."
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Group>
      </Container>
      <MapWrapper center={center} />
    </>
  );
}
