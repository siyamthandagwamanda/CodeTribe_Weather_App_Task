import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "../Components/SearchBar";
import WeatherCard from "../Components/WeatherCard";
import { getWeather, getWeatherByCoords } from "../Api/Weather";
import { saveWeather, getSavedLocations, removeSavedLocation } from "../Utils/SavedWeatherStorage";
import type { WeatherData } from "../Types/Weather";

export const HomePage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  
  const [forecastView, setForecastView] = useState<"hourly" | "daily">("hourly");
  const [unit, setUnit] = useState<"metric" | "imperial">(() => 
    (localStorage.getItem("weather_unit") as "metric" | "imperial") || "metric"
  );
  const [theme, setTheme] = useState<"light" | "dark">(() => 
    (localStorage.getItem("weather_theme") as "light" | "dark") || "dark"
  );
  const [savedCities, setSavedCities] = useState<WeatherData[]>(() => getSavedLocations());
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

 
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("weather_theme", theme);
  }, [theme]);

 
  useEffect(() => {
    localStorage.setItem("weather_unit", unit);
  }, [unit]);

  
  const checkWeatherAlerts = useCallback((data: WeatherData) => {
    const highWindThreshold = unit === "metric" ? 15 : 33; 
    if (data.windSpeed > highWindThreshold) {
      setAlertMessage(`⚠️ High Wind Warning in ${data.city}: Wind speeds reaching ${data.windSpeed} ${unit === "metric" ? "m/s" : "mph"}.`);
    } else if (data.condition.toLowerCase().includes("thunderstorm") || data.condition.toLowerCase().includes("rain")) {
      setAlertMessage(`🌧️ Weather Alert: Rainy or stormy weather expected in ${data.city}.`);
    } else {
      setAlertMessage(null);
    }
  }, [unit]);

  const loadFallbackCache = useCallback((defaultErrorMsg: string) => {
    const cached = localStorage.getItem("cached_weather");
    if (cached) {
      const parsed: WeatherData = JSON.parse(cached);
      setWeather(parsed);
      setError("Offline mode: Showing cached weather data.");
    } else {
      setError(defaultErrorMsg);
    }
  }, []);

  const fetchByCityName = useCallback(async (cityName: string) => {
    const trimmedCity = cityName.trim();
    if (!trimmedCity) {
      setError("Please enter a valid city name.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeather(trimmedCity, unit);
      setWeather(data);
      checkWeatherAlerts(data);
      localStorage.setItem("cached_weather", JSON.stringify(data));
    } catch (err) {
      if (err instanceof Error) {
        loadFallbackCache(err.message);
      } else {
        loadFallbackCache("An error occurred while fetching weather.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [unit, checkWeatherAlerts, loadFallbackCache]);

  
  useEffect(() => {
    const initLocation = async () => {
      setIsLoading(true);
      setError(null);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const data = await getWeatherByCoords(
                position.coords.latitude,
                position.coords.longitude,
                unit
              );
              setWeather(data);
              checkWeatherAlerts(data);
              localStorage.setItem("cached_weather", JSON.stringify(data));
            } catch {
              fetchByCityName("Durban");
            } finally {
              setIsLoading(false);
            }
          },
          () => {
           
            fetchByCityName("Durban");
          }
        );
      } else {
        fetchByCityName("Durban");
      }
    };

    initLocation();
  }, [unit, checkWeatherAlerts, fetchByCityName]);

  const handleSaveCity = () => {
    if (weather) {
      saveWeather(weather);
      setSavedCities(getSavedLocations());
    }
  };

  const handleRemoveCity = (cityName: string) => {
    removeSavedLocation(cityName);
    setSavedCities(getSavedLocations());
  };

  return (
    <main className={`home-page container-layout ${theme}`}>
 
      <header className="app-header">
        <h1 className="logo">WeatherPulse</h1>
        <div className="controls-group">
          <button
            type="button"
            className="interactive-btn toggle-btn"
            onClick={() => setUnit((prev) => (prev === "metric" ? "imperial" : "metric"))}
          >
            Unit: °{unit === "metric" ? "C" : "F"}
          </button>

          <button
            type="button"
            className="interactive-btn toggle-btn"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

   
      <SearchBar
        city={city}
        onCityChange={setCity}
        onSearch={() => fetchByCityName(city)}
      />

    
      {alertMessage && (
        <aside className="alert-banner" role="alert">
          <p>{alertMessage}</p>
        </aside>
      )}

      {isLoading && <p className="status-message loading">Loading weather information...</p>}
      {error && <p className="status-message error">{error}</p>}


      {weather && !isLoading && (
        <section className="weather-dashboard">
          <WeatherCard {...weather} />

          <div className="dashboard-actions">
            <button
              type="button"
              className="interactive-btn save-btn"
              onClick={handleSaveCity}
            >
              ⭐ Save Location
            </button>

            <div className="tab-switcher">
              <button
                type="button"
                className={`tab-btn ${forecastView === "hourly" ? "active" : ""}`}
                onClick={() => setForecastView("hourly")}
              >
                Hourly Forecast
              </button>
              <button
                type="button"
                className={`tab-btn ${forecastView === "daily" ? "active" : ""}`}
                onClick={() => setForecastView("daily")}
              >
                Daily Forecast
              </button>
            </div>
          </div>

        
          <div className="forecast-container">
            {forecastView === "hourly" ? (
              <div className="forecast-grid">
                {weather.hourly.map((item, idx) => (
                  <div key={idx} className="forecast-card interactive-card">
                    <span className="time">{item.time}</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                      alt={item.condition}
                    />
                    <span className="temp">{item.temp}°</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="forecast-grid">
                {weather.daily.map((item, idx) => (
                  <div key={idx} className="forecast-card interactive-card">
                    <span className="day">{item.day}</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                      alt={item.condition}
                    />
                    <span className="temp">{item.tempMax}° / {item.tempMin}°</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

    
      {savedCities.length > 0 && (
        <section className="saved-locations-drawer">
          <h3>Saved Locations</h3>
          <div className="saved-chips-wrapper">
            {savedCities.map((saved) => (
              <div key={saved.city} className="saved-chip">
                <button
                  type="button"
                  className="chip-city-btn"
                  onClick={() => fetchByCityName(saved.city)}
                >
                  {saved.city} ({saved.temp}°)
                </button>
                <button
                  type="button"
                  className="chip-delete-btn"
                  onClick={() => handleRemoveCity(saved.city)}
                  title="Remove location"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};