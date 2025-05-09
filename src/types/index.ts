export type WeatherElement = 
  | 'temperature' 
  | 'wind' 
  | 'precipitation' 
  | 'soilMoisture' 
  | 'humidity' 
  | 'seaLevelPressure';

export interface Location {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  description: string;
}