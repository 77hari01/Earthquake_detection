import React, { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";

function magColor(m) {
  if (m >= 6) return "#443e3eff";
  if (m >= 5) return "#a52d2dff";
  if (m >= 4) return "#e75a5aff";
  if (m >= 3) return "#f98c3eff";
  if (m >= 2) return "#facc15";
  return "#a3e635";
}

// Helper to move the map when selectedQuake changes
function FlyToQuake({ quake }) {
  const map = useMap();

  useEffect(() => {
    if (quake?.coords) {
      map.flyTo(quake.coords, 6, { duration: 1.5 });
    }
  }, [quake, map]);

  return null;
}

export default function EarthquakeMap({ quakes, selectedQuake }) {
  const center = [20, 0];

  return (
    <MapContainer
      center={center}
      zoom={2}
      minZoom={2}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {quakes.map((q) => {
        if (!q.coords) return null;
        const size = Math.max(4, (q.mag ?? 0) * 3);
        return (
          <CircleMarker
            key={q.id}
            center={q.coords}
            radius={size}
            pathOptions={{
              color: magColor(q.mag),
              fillColor: magColor(q.mag),
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div>
                <strong>M {q.mag ?? "—"}</strong>
                <div>{q.place}</div>
                <div>{q.time ? new Date(q.time).toLocaleString() : ""}</div>
                <div>Depth: {q.depth ?? "N/A"} km</div>
                <div style={{ marginTop: 6 }}>
                  <a href={q.url} target="_blank" rel="noreferrer">
                    USGS details
                  </a>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
      <FlyToQuake quake={selectedQuake} />
    </MapContainer>
  );
}
