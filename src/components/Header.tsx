import React from 'react';
import { Sun, Cloud } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const Header: React.FC = () => {
  const { selectedLocation } = useWeather();

  return (
    <header className="bg-slate-800 shadow-lg py-4 sticky top-0 z-50">
      <div className="px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="text-yellow-300 mr-2">
            <Sun size={32} />
          </div>
          <div className="text-sky-300 -ml-2 -mt-1">
            <Cloud size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 ml-2">Your Local Algo</h1>
        </div>
        <p className="text-sky-400 italic text-center md:text-right text-sm">
          We don't predict the weather—we tell you which forecast is best suited for you, and how sure we are!!
        </p>
      </div>
    </header>
  );
};