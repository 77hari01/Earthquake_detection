# 🌍 Earthquake Visualizer

**Earthquake Visualizer** is a React + Vite web application that displays real-time earthquake data from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson).  
It visualizes global seismic activity on an interactive map and provides a searchable, filterable list of earthquake events.

---

## 🚀 Features

### 🗺️ Real-Time Earthquake Map
- Uses **OpenStreetMap** tiles via `react-leaflet`.
- Displays earthquake locations as colored circles.
- Each circle color represents **danger level** based on magnitude.

### 🔎 Search & Filter
- Search earthquakes by **country, region, or city name**.
- Filter by **minimum magnitude**.
- Press **Enter** to search or **Esc** to clear instantly.

### 📍 Interactive Map
- Click on any event in the sidebar to **focus** on that earthquake on the map.
- Each marker shows detailed information in a popup:
  - Magnitude
  - Location
  - Time
  - Depth
  - USGS details link

### ⚡ Live Updates
- Optional **auto-refresh every 5 minutes**.
- Manual **Refresh** button also available.

### 🎨 Danger Level Colors
Earthquake magnitudes are visually classified by color:
| Magnitude | Level | Color |
|------------|--------|--------|
| 0.0 – 2.0 | 🟢 Very Low | `#a3e635` |
| 2.1 – 3.0 | 🟡 Low | `#facc15` |
| 3.1 – 4.0 | 🟠 Moderate | `#f97316` |
| 4.1 – 5.0 | 🟠 Strong | `#fb923c` |
| 5.1 – 6.0 | 🔴 Severe | `#ef4444` |
| 6.1 – 7.0 | 🔴 Very Severe | `#dc2626` |
| 7.1+ | 🟥 Extreme | `#7f1d1d` |

---

## 🧠 Tech Stack

- **React (Vite)** — Frontend framework  
- **React Leaflet** — Interactive map rendering  
- **USGS GeoJSON API** — Earthquake data source  
- **CSS3** — Custom styling  
- **Lucide React** — Modern icon set  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/earthquake-visualizer.git
cd earthquake-visualizer
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### 4️⃣ Build for Production

```bash
npm run build
```

---

## 🧭 Folder Structure

```
earthquake-visualizer/
├
│── earthquake-icon.png      
├── src/
│   ├── components/
│   │   └── EarthquakeMap.jsx    
│   ├── App.jsx                   
│   ├── main.jsx                 
│   └── styles.css                
├── index.html                   
├── package.json
└── README.md
```

---

## 🧩 API Information

**Endpoint:**

```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

**Response Format:** GeoJSON
Each feature contains:

* `id` – Unique ID
* `properties.mag` – Magnitude
* `properties.place` – Location
* `properties.time` – Timestamp
* `geometry.coordinates` – `[longitude, latitude, depth]`

---

## 🏆 Highlights

* Real-world API integration
* Beautiful UI with dynamic color-coding
* Map-centered interactivity
* Responsive & mobile-friendly design
* Clean and maintainable React architecture

---

## 👨‍💻 Author

**AI & DS Developer Project**
* Hariharan K S

---


