import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <WeatherProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </WeatherProvider>
  );
}

export default App;