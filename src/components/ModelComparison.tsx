import React from 'react';
import { useWeather } from '../context/WeatherContext';

const explanations: { [key: string]: string } = {
  temperature: "Temperature trend over time.",
  temperature_residual: "Deviation from truth for temperature.",
  precipitation: "Precipitation trend over time.",
  precipitation_residual: "Deviation from truth for precipitation.",
  wind_speed: "Wind speed trend over time.",
  wind_speed_residual: "Deviation from truth for wind speed.",
};

export const ModelComparison: React.FC = () => {
  const { plotUrls, bestModel } = useWeather();
  if (!bestModel || !plotUrls || Object.keys(plotUrls).length === 0) return null;

  return (
    <div className="max-w-screen-xl mx-auto px-4 space-y-8">
      {/* Best Model Banner */}
      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white items-center justify-between transform hover:scale-[1.02] transition duration-300">
        <div className="mb-4 lg:mb-0 lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 tracking-wide">
            Based on AI confidence intervals and live weather data, we recommend
          </h2>
          <h1 className="text-6xl font-extrabold tracking-tight">{bestModel}</h1>
          <p className="mt-3 text-lg opacity-90">as the most accurate model for your location.</p>
        </div>
        <div className="lg:w-1/2">
          {plotUrls['best_model_summary'] && (
            <img
              src={plotUrls['best_model_summary']}
              alt={`${bestModel} summary`}
              className="w-full rounded-xl shadow-xl"
            />
          )}
        </div>
      </div>

      {/* Weather Story Box */}
      <div className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-2xl shadow-lg p-6 text-center text-gray-900 transform hover:scale-[1.02] transition duration-300">
        <p className="text-lg font-semibold mb-2">Right now, it looks like it’s partly cloudy ☁️.</p>
        <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-2 sm:space-y-0 text-base">
          <span>🌡 Temperature: About 19°C (~66°F), feels the same.</span>
          <span>💨 Wind: Light breeze from the north at 7 mph (11 kph).</span>
          <span>💧 Humidity: Moderate at 56%, not too dry or sticky.</span>
        </div>
      </div>

      {/* Feature + Residual Plots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(plotUrls)
          .filter(([key]) => key !== 'best_model_summary' && explanations[key])
          .map(([key, url]) => (
            url && (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-xl p-4 transform hover:scale-[1.02] transition duration-300"
              >
                <h3 className="text-xl font-bold text-center mb-2 text-gray-800 uppercase tracking-wider">
                  {key.replace('_', ' ')}
                </h3>
                <img src={`${url}?t=${Date.now()}`} alt={key} className="w-full rounded-lg" />
                <p className="mt-3 text-sm text-gray-500 text-center">{explanations[key]}</p>
              </div>
            )
          ))}
      </div>
    </div>
  );
};
