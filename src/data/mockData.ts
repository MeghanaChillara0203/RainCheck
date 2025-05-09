import { Location, WeatherData } from '../types';

export const mockLocationData: Location = {
  name: 'Hockley County',
  state: 'Texas',
  country: 'United States',
  lat: 33.7974,
  lon: -102.3047
};

export const mockWeatherData: WeatherData = {
  temp: 18.9,
  feelsLike: 18.9,
  humidity: 56,
  windSpeed: 11.2,
  windDirection: 'N',
  description: 'Partly cloudy'
};

export const mockWeatherModels = {
  ECMWF: [
    { name: 'Item 1', value: 10, color: '#93c5fd' },
    { name: 'Item 2', value: 15, color: '#93c5fd' },
    { name: 'Item 3', value: 25, color: '#93c5fd' },
    { name: 'Item 4', value: 40, color: '#93c5fd' }
  ],
  GFS: [
    { name: 'Item 1', value: 10, color: '#93c5fd' },
    { name: 'Item 2', value: 20, color: '#93c5fd' },
    { name: 'Item 3', value: 40, color: '#93c5fd' },
    { name: 'Item 4', value: 60, color: '#93c5fd' },
    { name: 'Item 5', value: 80, color: '#93c5fd' }
  ],
  HRRR: [
    { name: 'Item 1', value: 80, color: '#3b82f6' },
    { name: 'Item 2', value: 70, color: '#3b82f6' },
    { name: 'Item 3', value: 60, color: '#3b82f6' },
    { name: 'Item 4', value: 90, color: '#3b82f6' },
    { name: 'Item 5', value: 85, color: '#3b82f6' }
  ],
  NAM: [
    { 
      name: 'Item 1', 
      series: [15, 10, 5]
    },
    { 
      name: 'Item 2', 
      series: [20, 25, 15]
    },
    { 
      name: 'Item 3', 
      series: [25, 30, 35]
    },
    { 
      name: 'Item 4', 
      series: [30, 40, 20]
    },
    { 
      name: 'Item 5', 
      series: [45, 50, 40]
    }
  ]
};