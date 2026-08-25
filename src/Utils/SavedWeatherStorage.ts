import type { WeatherData } from "../Types/Weather";

const STORAGE_KEY = "saved_weather_locations";

export const getSavedLocations = (): WeatherData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing saved locations:", error);
    return [];
  }
};

export const saveWeather = (weather: WeatherData): void => {
  const currentSaved = getSavedLocations();
  const exists = currentSaved.some(
    (item) => item.city.toLowerCase() === weather.city.toLowerCase()
  );

  if (!exists) {
    const updated = [...currentSaved, weather];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};

export const removeSavedLocation = (cityName: string): void => {
  const currentSaved = getSavedLocations();
  const updated = currentSaved.filter(
    (item) => item.city.toLowerCase() !== cityName.toLowerCase()
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};