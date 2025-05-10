import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

const deepDiveExplanations: { [key: string]: string } = {
  temperature: "This plot shows how each weather model tracks actual temperature over time. Notice which lines stay closest to the bold black line (truth) — these models consistently capture seasonal patterns, peaks, and drops.",
  temperature_residual: "Residual plots highlight the prediction error (forecast minus truth) across time. Watch for lines that stay near zero with minimal fluctuation — this signals models that consistently nail the temperature trends.",
  precipitation: "Here, you can compare rainfall or snow forecasts across models. Models that match the black truth line even during sudden rain spikes or dry stretches are better at handling real-world variability.",
  precipitation_residual: "This chart reveals under- or overprediction of precipitation. Lines hovering close to zero show precise models, while larger swings indicate less reliable rain/snow forecasts.",
  wind_speed: "This plot compares how models track wind speeds — critical for aviation, marine, and renewable energy. Look for models that capture both gentle breezes and sudden gusts smoothly.",
  wind_speed_residual: "Residuals reveal which models regularly over- or under-predict wind. Flatter, centered lines show models with fewer surprises, boosting confidence in wind-sensitive applications."
};

export const ModelComparison: React.FC = () => {
  const { plotUrls, bestModel } = useWeather();
  const [expandedPlot, setExpandedPlot] = useState<string | null>(null);

  if (!bestModel || !plotUrls || Object.keys(plotUrls).length === 0) return null;

  return (
    <div className="px-2 space-y-8">
      {/* Best Model Banner */}
      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-6 text-white items-center justify-between">
        <div className="mb-4 lg:mb-0 lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 tracking-wide">
            Recommended Weather Model
          </h2>
          <h1 className="text-6xl font-extrabold">{bestModel}</h1>
          <p className="mt-3 text-lg opacity-90">
            This model consistently delivers the most accurate performance at your location.
          </p>
        </div>
        <div className="lg:w-1/2">
          {plotUrls['best_model_summary'] && (
            <img
              src={plotUrls['best_model_summary']}
              alt={`${bestModel} summary`}
              className="w-full rounded-xl shadow-2xl border-2 border-gray-700"
            />
          )}
        </div>
      </div>

      {/* Feature + Residual Plots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(plotUrls)
          .filter(([key]) => key !== 'best_model_summary' && deepDiveExplanations[key])
          .map(([key, url]) => (
            url && (
              <div
                key={`${key}-${url}`}
                className={`bg-gray-900 rounded-2xl shadow-xl p-4 transform hover:scale-[1.02] transition duration-300 text-white`}
              >
                <h3
                  className="text-xl font-bold text-center mb-2 uppercase tracking-wider cursor-pointer text-cyan-400"
                  onClick={() => setExpandedPlot(expandedPlot === key ? null : key)}
                >
                  {key.replace('_', ' ')} {expandedPlot === key ? '▲' : '▼'}
                </h3>
                <img
                  src={url}
                  alt={key}
                  className="w-full rounded-lg cursor-pointer"
                  onClick={() => setExpandedPlot(expandedPlot === key ? null : key)}
                />
                {expandedPlot === key && (
                  <div className="mt-3 bg-gray-800 p-3 rounded text-sm text-gray-300">
                    <h4 className="font-semibold mb-1 text-cyan-300">What this plot shows:</h4>
                    <p className="mb-2">{deepDiveExplanations[key]}</p>
                    <h4 className="font-semibold mb-1 text-cyan-300">Why it matters:</h4>
                    <p>
                      Understanding this helps you trust which model best fits local conditions.
                      It can guide agriculture, travel, energy, and safety decisions — and soon,
                      ML will help flag systematic model weaknesses.
                    </p>
                  </div>
                )}
              </div>
            )
        ))}
      </div>
    </div>
  );
};
