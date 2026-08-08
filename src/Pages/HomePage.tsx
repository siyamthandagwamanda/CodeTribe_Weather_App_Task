import { useState } from "react";
import { SearchBar } from "../Components/SearchBar";
import WeatherCard from "../Components/WeatherCard";
import { getWeather } from "../Api/Weather";
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
      const weatherData = await getWeather(trimmedCity);
      setWeather(weatherData);
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
      {weather && !isLoading && <WeatherCard {...weather} />}
    </main>
  );
};