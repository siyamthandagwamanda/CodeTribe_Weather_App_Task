import { useEffect, useState } from "react";
import WeatherCard from "../Components/WeatherCard";
import type { WeatherData } from "../Types/Weather";

const SAVED_WEATHER_KEY = "savedWeather";

const saveToStorage = (weather: WeatherData[]) => {
  localStorage.setItem(SAVED_WEATHER_KEY, JSON.stringify(weather));
};

const isSameCity = (a: WeatherData, b: WeatherData) =>
  a.cityName === b.cityName && a.country === b.country;

export const MyLocationsPage = () => {
  const [savedWeather, setSavedWeather] = useState<WeatherData[]>([]);

  useEffect(() => {
    const storedWeather = localStorage.getItem(SAVED_WEATHER_KEY);
    if (!storedWeather) return;

    try {
      setSavedWeather(JSON.parse(storedWeather));
    } catch {
     
      localStorage.removeItem(SAVED_WEATHER_KEY);
    }
  }, []);

  const removeCity = (cityToRemove: WeatherData) => {
    const updatedWeather = savedWeather.filter((weather) => !isSameCity(weather, cityToRemove));
    setSavedWeather(updatedWeather);
    saveToStorage(updatedWeather);
  };

  const clearAllCities = () => {
    setSavedWeather([]);
    localStorage.removeItem(SAVED_WEATHER_KEY);
  };

  return (
    <main className="my-locations">
      <div className="saved-header">
        <h2>My Locations</h2>
        {savedWeather.length > 0 && (
          <button type="button" onClick={clearAllCities}>
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
              <button type="button" onClick={() => removeCity(weather)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};