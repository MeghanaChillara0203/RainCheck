import React from 'react';
import { WeatherMap } from './WeatherMap';
import { ModelComparison } from './ModelComparison';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl shadow-2xl p-4">
        <WeatherMap />
      </div>
      <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
        <ModelComparison />
      </div>
    </div>
  );
};