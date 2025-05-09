import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchLocation, selectedDate, setSelectedDate } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchLocation(query);
    }
  };

  return (
    <div className="flex gap-4 w-full">
      <form onSubmit={handleSubmit} className="relative flex-1">
        <input
          type="text"
          placeholder="Search locations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
        >
          <Search size={18} />
        </button>
      </form>

      <div className="relative flex items-center min-w-[200px]">
        <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};