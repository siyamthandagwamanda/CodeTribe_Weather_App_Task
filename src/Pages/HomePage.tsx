import { useState } from "react";
import { SearchBar } from "../Components/SearchBar";
import WeatherCard from "../Components/WeatherCard";
import { getWeather } from "../Api/Weather";
<<<<<<< HEAD
import { WeatherCardContainer } from "../Components/WeatherCardContainer";
=======
import { saveWeather } from "../Utils/SavedWeatherStorage";
>>>>>>> 7f77826bb0e3c4fb80aabd1a65a9250b70e0dc72
import type { WeatherData } from "../Types/Weather";

export const HomePage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const weatherData = await WeatherCardContainer(trimmedCity);
      setWeather(weather);
    } catch (err) {
      setWeather(null);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="home-page">
      <SearchBar city={city} onCityChange={setCity} onSearch={handleSearch} />

      {isLoading && <p className="loading">Loading weather...</p>}
      {error && <p className="error-message">{error}</p>}
      {weather && !isLoading && (
        <>
          <WeatherCard {...weather} />
          <button type="button" className="save-city-button" onClick={() => saveWeather(weather)}>
            Save City
          </button>
        </>
      )}
    </main>
  );
};