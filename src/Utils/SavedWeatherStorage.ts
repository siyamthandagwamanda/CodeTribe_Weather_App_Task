import type { WeatherData } from "../Types/Weather";

const SAVED_WEATHER_KEY = "savedWeather";

function isSameCity(first: WeatherData, second: WeatherData) {
  return (
    first.cityName === second.cityName &&
    first.country === second.country
  );
}

export function getSavedWeather(): WeatherData[] {
  const savedWeather = localStorage.getItem(SAVED_WEATHER_KEY);

  if (!savedWeather) {
    return [];
  }

  try {
    return JSON.parse(savedWeather) as WeatherData[];
  } catch {
    localStorage.removeItem(SAVED_WEATHER_KEY);
    return [];
  }
}

export function saveWeather(weather: WeatherData) {
  const savedWeather = getSavedWeather();

  const alreadySaved = savedWeather.some(function (saved) {
    return isSameCity(saved, weather);
  });

  if (alreadySaved) {
    return;
  }

  const updatedWeather = [...savedWeather, weather];

  localStorage.setItem(
    SAVED_WEATHER_KEY,
    JSON.stringify(updatedWeather)
  );
}

export function removeWeather(weatherToRemove: WeatherData) {
  const savedWeather = getSavedWeather();

  const updatedWeather = savedWeather.filter(function (weather) {
    return !isSameCity(weather, weatherToRemove);
  });

  localStorage.setItem(
    SAVED_WEATHER_KEY,
    JSON.stringify(updatedWeather)
  );

  return updatedWeather;
}

export function clearSavedWeather() {
  localStorage.removeItem(SAVED_WEATHER_KEY);
}