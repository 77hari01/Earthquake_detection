import React, { useEffect, useState, useMemo } from "react";
import EarthquakeMap from "./components/EarthquakeMap";

const API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [minMag, setMinMag] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedQuake, setSelectedQuake] = useState(null);

  // Fetch data
  async function fetchQuakes() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const features = json.features || [];
      const normalized = features.map((f) => ({
        id: f.id,
        mag: f.properties.mag,
        place: f.properties.place,
        time: f.properties.time,
        url: f.properties.url,
        depth: f.geometry?.coordinates?.[2] || null,
        coords: f.geometry?.coordinates
          ? [f.geometry.coordinates[1], f.geometry.coordinates[0]]
          : null,
      }));
      setData(normalized);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuakes();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(fetchQuakes, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  // Search & filter logic
  const handleSearchClick = () => setSearchSubmitted(searchQuery.trim());
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") setSearchSubmitted(searchQuery.trim());
    if (e.key === "Escape") {
      setSearchQuery("");
      setSearchSubmitted("");
    }
  };

  const filtered = useMemo(() => {
    let filteredData = data.filter((d) => (d.mag ?? 0) >= minMag);
    if (searchSubmitted !== "") {
      filteredData = filteredData.filter((d) =>
        d.place.toLowerCase().includes(searchSubmitted.toLowerCase())
      );
    }
    return filteredData;
  }, [data, minMag, searchSubmitted]);

  // -------------------------------
  // UI Layout
  // -------------------------------
  return (
    <div className="app">
      <header className="header">
        <h1>🌍 Earthquake Visualizer</h1>
        <div className="controls">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="text"
              placeholder="Search by country or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button onClick={handleSearchClick}>Search</button>
            {searchSubmitted && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchSubmitted("");
                }}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
          </div>

          <label>
            Min magnitude:
            <input
              type="number"
              step="0.1"
              min="0"
              value={minMag}
              onChange={(e) => setMinMag(Number(e.target.value))}
            />
          </label>
          <label>
            Auto-refresh (5 min)
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
          </label>
          <button onClick={fetchQuakes}>Refresh</button>
        </div>
      </header>

      {searchSubmitted && (
        <div
          style={{
            padding: "8px 20px",
            background: "#f3f4f6",
            color: "#374151",
            fontSize: "14px",
          }}
        >
          Showing earthquakes related to:{" "}
          <strong>{searchSubmitted}</strong>
        </div>
      )}

      <main className="main">
        <section className="map-section">
          <EarthquakeMap quakes={filtered} selectedQuake={selectedQuake} />
        </section>

        <aside className="list-section">
          <div className="meta">
            {loading ? <span>Loading...</span> : <span>{filtered.length} events</span>}
            {lastUpdated && (
              <small>Last update: {lastUpdated.toLocaleString()}</small>
            )}
            {error && <div className="error">Error: {error}</div>}
          </div>

          <ul className="quake-list">
            {filtered.length === 0 && !loading && (
              <li>No earthquakes found for your search.</li>
            )}
            {filtered.map((q) => (
              <li
                key={q.id}
                className="quake-item"
                onClick={() => setSelectedQuake(q)}
                style={{
                  cursor: "pointer",
                  background:
                    selectedQuake?.id === q.id ? "#dbeafe" : "transparent",
                }}
              >
                <div className="q-row">
                  <div className="q-left">
                    <h3 className="q-city">{q.place}</h3>
                    <p className="q-coords">
                      🌐{" "}
                      {q.coords
                        ? `${q.coords[1].toFixed(2)}, ${q.coords[0].toFixed(2)}`
                        : "N/A"}
                    </p>
                    <p className="q-depth">Depth: {q.depth ?? "N/A"} km</p>
                    <a
                      className="q-link"
                      href={q.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Details →
                    </a>
                  </div>
                  <div className="q-right">
                    <h2 className="q-mag">M {q.mag ?? "—"}</h2>
                    <p className="q-time">
                      {q.time
                        ? new Date(q.time).toLocaleString()
                        : "Time unavailable"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      <footer className="footer">Data from USGS • GeoJSON feed</footer>
    </div>
  );
}
