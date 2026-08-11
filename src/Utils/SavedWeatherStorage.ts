import type { WeatherData } from "../Types/Weather";

const SAVED_WEATHER_KEY = "savedWeather";

const isSameCity = (a: WeatherData, b: WeatherData) =>
  a.cityName === b.cityName && a.country === b.country;

export const getSavedWeather = (): WeatherData[] => {
  const stored = localStorage.getItem(SAVED_WEATHER_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    
    localStorage.removeItem(SAVED_WEATHER_KEY);
    return [];
  }
};

export const saveWeather = (weather: WeatherData) => {
  const current = getSavedWeather();
  const alreadySaved = current.some((saved) => isSameCity(saved, weather));
  if (alreadySaved) return;

  localStorage.setItem(SAVED_WEATHER_KEY, JSON.stringify([...current, weather]));
};

export const removeWeather = (cityToRemove: WeatherData) => {
  const updated = getSavedWeather().filter((weather) => !isSameCity(weather, cityToRemove));
  localStorage.setItem(SAVED_WEATHER_KEY, JSON.stringify(updated));
  return updated;
};

export const clearSavedWeather = () => {
  localStorage.removeItem(SAVED_WEATHER_KEY);
};