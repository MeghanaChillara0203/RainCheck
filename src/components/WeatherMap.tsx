import React, { useRef, useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import { MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { SearchBar } from './SearchBar';
import { WeatherElements } from './WeatherElements';
import 'maplibre-gl/dist/maplibre-gl.css';

export const WeatherMap: React.FC = () => {
  const mapRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const { selectedLocation, weatherData, searchLocation } = useWeather();
  const [markerPosition, setMarkerPosition] = useState({
    longitude: selectedLocation?.lon || -96,
    latitude: selectedLocation?.lat || 37.8
  });
  
  const [viewState, setViewState] = useState({
    longitude: selectedLocation?.lon || -96,
    latitude: selectedLocation?.lat || 37.8,
    zoom: 4,
    maxBounds: [[-125.000000, 24.396308], [-66.934570, 49.384358]], // USA bounds
  });

  useEffect(() => {
    if (selectedLocation) {
      setViewState({
        ...viewState,
        longitude: selectedLocation.lon,
        latitude: selectedLocation.lat,
        zoom: 6
      });
      setMarkerPosition({
        longitude: selectedLocation.lon,
        latitude: selectedLocation.lat
      });
      setShowPopup(true);
    }
  }, [selectedLocation]);

  const onMarkerDragEnd = (event: any) => {
    const { lngLat } = event;
    setMarkerPosition({
      longitude: lngLat.lng,
      latitude: lngLat.lat
    });
    searchLocation({
      name: '',
      state: '',
      country: '',
      lat: lngLat.lat,
      lon: lngLat.lng,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Elements Container */}
      <div className="space-y-4">
        {/* Search Bar and Date */}
        <div className="flex gap-4">
          <SearchBar />
        </div>
        
        {/* Weather Elements */}
        <WeatherElements />
      </div>

      {/* Map Container */}
      <div className="h-[400px] w-full relative rounded-lg overflow-hidden">
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          attributionControl={true}
          onClick={(evt) => {
            const { lngLat } = evt;
            setMarkerPosition({
              longitude: lngLat.lng,
              latitude: lngLat.lat
            });
            searchLocation({
              name: 'Selected Location',
              state: '',
              country: 'United States',
              lat: lngLat.lat,
              lon: lngLat.lng
            });
          }}
        >
          <Marker
            longitude={markerPosition.longitude}
            latitude={markerPosition.latitude}
            anchor="bottom"
            draggable
            onDragEnd={onMarkerDragEnd}
          >
            <div className="text-blue-600 animate-bounce cursor-move">
              <MapPin size={36} fill="#dbeafe" />
            </div>
          </Marker>

          {selectedLocation && showPopup && (
            <Popup
              longitude={markerPosition.longitude}
              latitude={markerPosition.latitude}
              anchor="top"
              onClose={() => setShowPopup(false)}
              closeButton={true}
              closeOnClick={false}
              className="z-10"
            >
              <div className="p-2 max-w-[250px]">
                <h3 className="font-semibold text-sm">{selectedLocation.name}, {selectedLocation.state}, {selectedLocation.country}</h3>
                <p className="text-sm">Partly cloudy: Light wind (11.2 kph N)</p>
                <p className="text-sm">Temp: {weatherData?.temp || '18.9'} °C (feels like {weatherData?.feelsLike || '18.9'} °C)</p>
                <p className="text-sm">Humidity: {weatherData?.humidity || '56'}%</p>
                <p className="text-sm">Lat: {markerPosition.latitude.toFixed(4)}, Lon: {markerPosition.longitude.toFixed(4)}</p>
                <div className="mt-1">
                  <span className="text-yellow-500">☀️</span>
                </div>
              </div>
            </Popup>
          )}
        </Map>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-white p-1 shadow-md rounded-md">
            <button 
              className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setViewState({ ...viewState, zoom: viewState.zoom + 1 })}
            >
              +
            </button>
            <button 
              className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setViewState({ ...viewState, zoom: viewState.zoom - 1 })}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};