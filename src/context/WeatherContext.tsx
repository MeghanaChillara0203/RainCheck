import React, { useRef, createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { WeatherElement, Location, WeatherData } from '../types';
import { mockWeatherData } from '../data/mockData';

interface WeatherContextType {
  selectedLocation: Location | null;
  weatherData: WeatherData | null;
  selectedElement: WeatherElement;
  selectedDate: string;
  bestModel: string;
  plotUrls: Record<string, string>;
  searchLocation: (location: Location | string) => void;
  setSelectedElement: (element: WeatherElement) => void;
  setSelectedDate: (date: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(mockWeatherData);
  const [selectedElement, setSelectedElement] = useState<WeatherElement>('temperature');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bestModel, setBestModel] = useState<string>('HRRR');
  const [plotUrls, setPlotUrls] = useState<Record<string, string>>({});
  const didRunRef = useRef(false);

  const searchLocation = async (query: Location | string, force: boolean = false) => {
    let lat = 0, lon = 0;
    if (typeof query === 'string') {
      console.log(`Searching for location: ${query}`);
      // fallback lat/lon for Seattle
      lat = 47.6;
      lon = -122.33;
    } else {
      lat = query.lat;
      lon = query.lon;
    }

    try {
      const res = await fetch(`http://localhost:8000/generate?lat=${lat}&lon=${lon}${force ? '&force=1' : ''}`);
      const data = await res.json();

      setSelectedLocation({
        name: data.location,
        state: '',
        country: '',
        lat,
        lon,
      });
      setBestModel(data.best_model);
      setPlotUrls(data.plots);
      setWeatherData(mockWeatherData);
    } catch (err) {
      console.error('API fetch error:', err);
    }
  };

  useEffect(() => {
    if (!didRunRef.current) {
      searchLocation('seattle');
      didRunRef.current = true;
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        selectedLocation,
        weatherData,
        selectedElement,
        selectedDate,
        bestModel,
        plotUrls,
        searchLocation,
        setSelectedElement,
        setSelectedDate,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within a WeatherProvider');
  return context;
};
