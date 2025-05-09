import React from 'react';
import { Sun, Cloud } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const Header: React.FC = () => {
  const { selectedLocation } = useWeather();

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="text-yellow-400 mr-2">
            <Sun size={32} />
          </div>
          <div className="text-blue-200 -ml-2 -mt-1">
            <Cloud size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 ml-2">Your Local Algo</h1>
        </div>
        <p className="text-blue-600 italic text-center md:text-right">
          We don't predict the weather—we tell you which forecast is best suited for you, and how sure we are!!
        </p>
      </div>
    </header>
  );
};