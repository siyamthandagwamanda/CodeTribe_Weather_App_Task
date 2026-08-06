import type { WeatherData } from "../Types/Weather";

const weatherConditions: Record<number, string> = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing Rime Fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  61: "Light Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  80: "Rain Showers",
  81: "Heavy Rain Showers",
  82: "Violent Rain Showers",
  95: "Thunderstorm",
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  if (!city.trim()) {
    throw new Error("City name cannot be empty");
  }

  // Step 1: Get coordinates
  const geoUrl =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`;

  const geoResponse = await fetch(geoUrl);

  if (!geoResponse.ok) {
    throw new Error("Failed to connect to the geocoding service");
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City "${city}" was not found.`);
  }

  const {
    name,
    country,
    latitude,
    longitude,
  } = geoData.results[0];

  // Step 2: Get weather
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=auto`;

  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Failed to retrieve weather information.");
  }

  const weatherData = await weatherResponse.json();

  return {
    cityName: name,
    country,
    temperature: weatherData.current.temperature_2m,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    high: weatherData.daily.temperature_2m_max[0],
    low: weatherData.daily.temperature_2m_min[0],
    condition:
      weatherConditions[weatherData.current.weather_code] ?? "Unknown",
  };
};