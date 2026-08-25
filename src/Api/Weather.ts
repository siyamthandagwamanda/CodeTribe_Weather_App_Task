import type { WeatherData } from "../Types/Weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "YOUR_OPENWEATHER_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const formatWeatherData = (current: any, forecast: any, unit: "metric" | "imperial"): WeatherData => {
  
  const hourly = forecast.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    condition: item.weather[0].main,
  }));

 
  const daily = forecast.list
    .filter((_: any, index: number) => index % 8 === 0)
    .map((item: any) => ({
      day: new Date(item.dt * 1000).toLocaleDateString([], { weekday: "short" }),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      icon: item.weather[0].icon,
      condition: item.weather[0].main,
    }));

  return {
    city: current.name,
    country: current.sys.country,
    temp: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    condition: current.weather[0].main,
    description: current.weather[0].description,
    icon: current.weather[0].icon,
    unit,
    hourly,
    daily,
  };
};

export const getWeather = async (city: string, unit: "metric" | "imperial" = "metric"): Promise<WeatherData> => {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`),
    fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error(`City "${city}" not found. Please try another search.`);
  }

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  return formatWeatherData(currentData, forecastData, unit);
};

export const getWeatherByCoords = async (
  lat: number,
  lon: number,
  unit: "metric" | "imperial" = "metric"
): Promise<WeatherData> => {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
    fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error("Failed to fetch weather data for your current location.");
  }

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  return formatWeatherData(currentData, forecastData, unit);
};