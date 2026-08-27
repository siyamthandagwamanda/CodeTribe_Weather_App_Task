import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Save, WifiOff } from "lucide-react";
import { SearchBar } from "../Components/SearchBar";
import WeatherCard from "../Components/WeatherCard";
import { WeatherForecastPanel } from "../Components/WeatherForecastPanel";
import { getWeather, getWeatherByCoordinates } from "../Api/Weather";
import { saveWeather } from "../Utils/SavedWeatherStorage";
import { getCurrentPosition } from "../Utils/Geolocation";
import { notifyIfSevere } from "../Utils/WeatherAlerts";
import { cacheLastWeather, getCachedWeather } from "../Utils/OfflineCache";
import type { WeatherData } from "../Types/Weather";

export const HomePage = () => {
  const routerLocation = useLocation();

  const weatherFromNavigation = (routerLocation.state as { weather?: WeatherData } | null)?.weather;

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(() => weatherFromNavigation ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const showFreshWeather = useCallback(async (fetchWeather: () => Promise<WeatherData>) => {
    try {
      const weatherData = await fetchWeather();
      setWeather(weatherData);
      cacheLastWeather(weatherData);
      void notifyIfSevere(weatherData);
    } catch (err) {
      const cached = getCachedWeather();

      if (cached && !navigator.onLine) {
        setWeather(cached);
        setError("You're offline. Showing the last saved weather instead.");
        return;
      }

      setWeather(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }, []);

  const handleUseLocation = useCallback(async (silent = false) => {
    setIsLocating(true);
    setSavedMessage(null);

    if (!silent) {
      setError(null);
    }

    try {
      const position = await getCurrentPosition();
      setIsLoading(true);
      setError(null);
      await showFreshWeather(() =>
        getWeatherByCoordinates(position.coords.latitude, position.coords.longitude)
      );
    } catch {
      const cached = getCachedWeather();

      if (cached) {
        setWeather(cached);
      } else if (!silent) {
        setError("Couldn't access your location. Please allow location access or search for a city instead.");
      }
    } finally {
      setIsLoading(false);
      setIsLocating(false);
    }
  }, [showFreshWeather]);

  useEffect(() => {
    if (!weatherFromNavigation) {
      void handleUseLocation(true);
    }
  }, []);

  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const handleSearch = async () => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSavedMessage(null);

    await showFreshWeather(() => getWeather(trimmedCity));

    setIsLoading(false);
  };

  const handleSave = () => {
    if (!weather) {
      return;
    }

    saveWeather(weather);
    setSavedMessage(`${weather.cityName} saved to My Locations.`);
  };

  return (
    <main className="home-page">
      <SearchBar
        city={city}
        onCityChange={setCity}
        onSearch={handleSearch}
        onUseLocation={() => handleUseLocation(false)}
        isLocating={isLocating}
      />

      {isOffline && (
        <p className="offline-banner" role="status">
          <WifiOff size={18} className="banner-icon" /> You're currently offline. Weather data may be out of date.
        </p>
      )}

      {isLoading && <p className="loading">Loading weather...</p>}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {savedMessage && (
        <p className="success-message" role="status">
          {savedMessage}
        </p>
      )}

      {weather && !isLoading && (
        <div className="weather-grid">
          <div className="weather-card-wrapper">
            <WeatherCard {...weather} />

            <div className="home-actions">
              <button type="button" className="save-city-button" onClick={handleSave}>
                <Save size={18} className="button-icon" /> Save City
              </button>
            </div>
          </div>

          <div className="weather-panel-wrapper">
            <WeatherForecastPanel weather={weather} />
          </div>
        </div>
      )}
    </main>
  );
};