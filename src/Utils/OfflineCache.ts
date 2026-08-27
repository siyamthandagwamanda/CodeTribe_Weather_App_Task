import type { WeatherData } from "../Types/Weather";

const LAST_WEATHER_KEY = "lastViewedWeather";


export function cacheLastWeather(weather: WeatherData) {
  localStorage.setItem(LAST_WEATHER_KEY, JSON.stringify(weather));
}

export function getCachedWeather(): WeatherData | null {
  const cached = localStorage.getItem(LAST_WEATHER_KEY);

  if (!cached) {
    return null;
  }

  try {
    return JSON.parse(cached) as WeatherData;
  } catch {
    localStorage.removeItem(LAST_WEATHER_KEY);
    return null;
  }
}
