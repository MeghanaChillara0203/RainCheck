import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { WeatherElement } from '../types';

export const WeatherElements: React.FC = () => {
  const { selectedElement, setSelectedElement } = useWeather();

  const elements: { id: WeatherElement; label: string; color: string }[] = [
    { id: 'temperature', label: 'Temperature', color: 'bg-gradient-to-r from-yellow-200 to-yellow-400' },
    { id: 'wind', label: 'Wind', color: 'bg-gradient-to-r from-blue-200 to-blue-400' },
    { id: 'precipitation', label: 'Precipitation', color: 'bg-gradient-to-r from-green-200 to-green-400' },
    { id: 'soilMoisture', label: 'Soil Moisture', color: 'bg-gradient-to-r from-teal-200 to-teal-400' },
    { id: 'humidity', label: 'Humidity', color: 'bg-gradient-to-r from-yellow-200 to-yellow-400' },
    { id: 'seaLevelPressure', label: 'Sea Level Pressure', color: 'bg-gradient-to-r from-purple-200 to-orange-400' }
  ];

  return (
    <div className="grid grid-cols-6 gap-2">
      {elements.map((element) => (
        <motion.button
          key={element.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedElement(element.id)}
          className={`${element.color} py-2 px-3 rounded-lg text-sm font-medium text-slate-800 text-center transition-all ${
            selectedElement === element.id 
              ? 'ring-2 ring-sky-400 shadow-lg brightness-110' 
              : 'opacity-80 hover:opacity-100'
          }`}
        >
          {element.label}
        </motion.button>
      ))}
    </div>
  );
};