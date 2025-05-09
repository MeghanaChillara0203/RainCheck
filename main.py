from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from generate_plots import save_plots_for_location, get_location_name

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files under /plots
app.mount("/plots", StaticFiles(directory="public/plots"), name="plots")

@app.get("/generate")
async def generate(lat: float, lon: float):
    out_dir = "./public/plots"
    maes, best_model = save_plots_for_location(lat, lon, out_dir)
    location_name = get_location_name(lat, lon)
    plots = {
        "temperature": f"http://localhost:8000/plots/temperature.png",
        "temperature_residual": f"http://localhost:8000/plots/temperature_residual.png",
        "precipitation": f"http://localhost:8000/plots/precipitation.png",
        "precipitation_residual": f"http://localhost:8000/plots/precipitation_residual.png",
        "wind_speed": f"http://localhost:8000/plots/wind_speed.png",
        "wind_speed_residual": f"http://localhost:8000/plots/wind_speed_residual.png",
        "best_model_summary": f"http://localhost:8000/plots/{best_model.lower()}_summary.png"
    }
    return {"location": location_name, "best_model": best_model, "plots": plots}
