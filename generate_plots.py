import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import requests
import os

class Config:
    start_date = "2024-05-01"
    end_date = "2025-05-09"
    n_models = 5
    bias_range = (0.85, 1.10)
    noise_frac_range = (0.01, 0.10)
    temp_min = -5.0
    temp_max = 25.0
    precip_mean = 3.0
    precip_std = 2.0
    wind_mean = 5.0
    wind_std = 1.5

cfg = Config()
model_names = ["ECMWF", "GFS", "HRRR", "NAM", "WRF"]
feature_key_map = {"temperature": "temp", "precipitation": "precip", "wind_speed": "wind"}

def get_location_name(lat, lon):
    try:
        res = requests.get(
            f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json",
            headers={'User-Agent': 'RainCheckApp/1.0'}
        )
        return res.json().get("display_name", f"{lat:.2f}, {lon:.2f}")
    except:
        return f"{lat:.2f}, {lon:.2f}"

def generate_data():
    N = 100
    times = pd.date_range(cfg.start_date, periods=N)
    true_temp = np.linspace(cfg.temp_min, cfg.temp_max, N) + np.random.normal(0, 1, N)
    true_precip = np.abs(np.random.normal(cfg.precip_mean, cfg.precip_std, N))
    true_wind = np.abs(np.random.normal(cfg.wind_mean, cfg.wind_std, N))
    return times, true_temp, true_precip, true_wind

def save_plots_for_location(lat, lon, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    times, true_temp, true_precip, true_wind = generate_data()
    maes = {}
    model_data = {}
    for model in model_names:
        bias = np.random.uniform(*cfg.bias_range)
        noise = np.random.uniform(*cfg.noise_frac_range)
        temp = true_temp * bias + np.random.normal(0, noise, len(true_temp))
        precip = true_precip * bias + np.random.normal(0, noise, len(true_precip))
        wind = true_wind * bias + np.random.normal(0, noise, len(true_wind))

        mae = np.mean(np.abs(true_temp - temp)) + np.mean(np.abs(true_precip - precip)) + np.mean(np.abs(true_wind - wind))
        maes[model] = mae
        model_data[model] = {"temp": temp, "precip": precip, "wind": wind}

    # Plot per feature and residuals → fixed filenames
    for feature, true_values in zip(["temperature", "precipitation", "wind_speed"], [true_temp, true_precip, true_wind]):
        key = feature_key_map[feature]

        plt.figure(figsize=(10, 4))
        for model in model_names:
            plt.plot(times, model_data[model][key], label=f"{model}")
        plt.plot(times, true_values, label="Truth", color='black', linewidth=2)
        plt.legend()
        plt.title(f"{feature.capitalize()}")
        plt.savefig(os.path.join(out_dir, f"{feature}.png"))
        plt.close()

        plt.figure(figsize=(10, 4))
        for model in model_names:
            residual = model_data[model][key] - true_values
            plt.plot(times, residual, label=f"{model}")
        plt.axhline(0, color='black', linewidth=2)
        plt.legend()
        plt.title(f"{feature.capitalize()} Residuals")
        plt.savefig(os.path.join(out_dir, f"{feature}_residual.png"))
        plt.close()

    # Best model summary plot → fixed name
    best_model = min(maes, key=maes.get)
    plt.figure(figsize=(10, 4))
    plt.plot(times, model_data[best_model]["temp"], label='Temperature', color='red')
    plt.plot(times, model_data[best_model]["precip"], label='Precipitation', color='blue')
    plt.plot(times, model_data[best_model]["wind"], label='Wind Speed', color='green')
    plt.legend()
    plt.title(f"{best_model} Summary")
    plt.savefig(os.path.join(out_dir, f"{best_model.lower()}_summary.png"))
    plt.close()

    return maes, best_model
