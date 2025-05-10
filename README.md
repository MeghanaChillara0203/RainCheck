## 🌦 RainCheck — AI-Powered Weather Model Comparator

### 🏔 Overview

RainCheck is an AI-driven weather intelligence web app that helps users **understand, compare, and trust multiple weather models** for their specific location.

In today’s world, weather predictions come from many competing global models — like ECMWF, GFS, HRRR, NAM, and WRF — but end users rarely know **which one performs best in their region or under which conditions.**

RainCheck solves this by:

* Comparing these models across key metrics (temperature, precipitation, wind speed)
* Evaluating historical and synthetic forecast accuracy
* Visualizing error residuals and trends over time
* Recommending the best model for a specific location with confidence

It empowers outdoor enthusiasts, farmers, city planners, and everyday users to make **more informed, weather-dependent decisions**.

---

### 🌟 Project Goals

###### ✅ Compare multiple leading weather forecast models (ECMWF, GFS, HRRR, NAM, WRF)
###### ✅ Calculate key evaluation metrics (e.g., Mean Absolute Error)
###### ✅ Visualize predictions + residuals over time
###### ✅ Provide location-based model recommendations
###### ✅ Deliver an interactive, map-driven web interface
###### ✅ Improve trust in weather forecasts by surfacing **not just what will happen, but how sure we are**

---

### ⚙️ Technical Architecture

| Layer       | Stack                                                                  |
| ----------- | ---------------------------------------------------------------------- |
| 🌐 Frontend | React + TypeScript, Tailwind CSS, MapLibre                             |
| 🌍 Map      | MapLibre GL, OpenStreetMap basemaps                                    |
| ⚡ Backend   | FastAPI (Python), Uvicorn server                                       |
| 📊 Data     | Synthetic weather forecast generator (using NumPy, Matplotlib, Pandas) |
| 📦 State    | React Context API (`WeatherContext.tsx`)                               |
| 💾 Static   | Backend serves plots from `public/plots` as static files               |

---

### 💻 Main Features

* Interactive draggable map to pick locations
* Search bar to find any place globally
* Synthetic data generation + random forecast generation
* Residual error plots per model + weather feature
* Best model banner with a visual summary
* Responsive design with mobile + desktop support

---

### 🚀 How to Run the Project

Here’s a full step-by-step guide to get it working locally.

---

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/raincheck.git
cd raincheck
```

---

#### 2️⃣ Set up the **backend** (FastAPI)

* Go to the backend folder:

```bash
cd backend
```

* Install Python dependencies:

```bash
pip install fastapi uvicorn matplotlib pandas numpy requests
```

* Run the backend server:

```bash
uvicorn main:app --reload
```

✅ The backend will be available at:

```
http://localhost:8000
```

✅ It will also serve plots at:

```
http://localhost:8000/plots/*.png
```

---

#### 3️⃣ Set up the **frontend** (React)

* Go to the frontend folder:

```bash
cd frontend
```

* Install Node.js dependencies:

```bash
npm install
```

* Start the React dev server:

```bash
npm run dev
```

✅ The frontend will be available at:

```
http://localhost:5173
```

---

#### 4️⃣ Use the App

* On first load → Seattle will auto-load
* Drag the map marker or click → triggers a new forecast + refreshes plots
* Search any global location using the search bar
* View dynamic plots + best model recommendations

---

### 📂 Project Folder Structure

```
.
├── backend/
│   ├── main.py               # FastAPI app
│   ├── generate_plots.py     # Synthetic data + plot generator
│   └── public/plots/         # Static plot images
├── frontend/
│   ├── src/
│   │   ├── components/       # React components (Map, SearchBar, ModelComparison)
│   │   ├── context/          # WeatherContext.tsx (state management)
│   │   └── App.tsx           # Main app shell
│   └── public/               # Public assets
├── README.md                 # This file!
```

---

### ✨ Example Use Cases

* 🚴 Cyclists: Plan rides knowing which model predicts wind and rain best
* 🌾 Farmers: Choose optimal planting days based on model confidence
* 🌇 City planners: Anticipate extreme weather events
* 🧭 Outdoor adventurers: Make safer travel plans

---

### ⚡ Future Improvements

✅ Add real weather API integration (e.g., Open-Meteo, NOAA, Meteomatics)
✅ Cache or store historical model performance
✅ Add user login + saved locations
✅ Add unit tests + CI/CD pipeline
✅ Improve accessibility and mobile UX

---

### 🤝 Contributing

We welcome PRs, feedback, and collaborators!

1. Fork this repo
2. Create a feature branch
3. Submit a pull request

---

### 📄 License



---

### 📬 Contact

If you have questions or want to collaborate:
Meghana Chillara
Dean Huang
Gemma O'Connor
Noah Walcutt
Christina Scavuzzo


