import React from 'react';
import { WeatherMap } from './WeatherMap';
import { ModelComparison } from './ModelComparison';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <WeatherMap />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ModelComparison />
      </div>
    </div>
  );
};
