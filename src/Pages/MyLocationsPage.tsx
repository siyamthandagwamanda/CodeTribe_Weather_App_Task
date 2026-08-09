import { useEffect, useState } from "react";
import WeatherCard from "../Components/WeatherCard";
import { getSavedWeather, removeWeather, clearSavedWeather } from "../Utils/SavedWeatherStorage";
import type { WeatherData } from "../Types/Weather";

export const MyLocationsPage = () => {
  const [savedWeather, setSavedWeather] = useState<WeatherData[]>([]);

  useEffect(() => {
    setSavedWeather(getSavedWeather());
  }, []);

  const handleRemove = (weather: WeatherData) => {
    setSavedWeather(removeWeather(weather));
  };

  const handleClearAll = () => {
    clearSavedWeather();
    setSavedWeather([]);
  };

  return (
    <main className="my-locations">
      <div className="saved-header">
        <h2>My Locations</h2>
        {savedWeather.length > 0 && (
          <button type="button" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {savedWeather.length === 0 ? (
        <p className="empty-message">No saved cities yet. Search for a city and save it here.</p>
      ) : (
        <div className="saved-weather-list">
          {savedWeather.map((weather) => (
            <div className="saved-weather-item" key={`${weather.cityName}-${weather.country}`}>
              <WeatherCard {...weather} />
              <button type="button" onClick={() => handleRemove(weather)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};