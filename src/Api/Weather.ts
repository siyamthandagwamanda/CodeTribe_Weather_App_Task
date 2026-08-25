import type { WeatherData } from "../Types/Weather";

const weatherConditions: Record<number, string> = {
  0: "Clear sky",
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

type City = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type CityResponse = {
  results?: City[];
};

type WeatherResponse = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };

  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

export async function getWeather(city: string): Promise<WeatherData> {
  const cityName = city.trim();

  if (!cityName) {
    throw new Error("City name cannot be empty");
  }

 
  const cityUrl =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(cityName)}` +
    `&count=1` +
    `&language=en` +
    `&format=json`;

  const cityResponse = await fetch(cityUrl);

  if (!cityResponse.ok) {
    throw new Error(
      "Couldn't reach the city service, try again in a moment"
    );
  }

  const cityData: CityResponse = await cityResponse.json();

  const location = cityData.results?.[0];

  if (!location) {
    throw new Error(`No city found matching "${cityName}"`);
  }

 
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=auto`;

  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Weather data is unavailable right now");
  }

  const weatherData: WeatherResponse = await weatherResponse.json();

  return {
    cityName: location.name,
    country: location.country,
    temperature: weatherData.current.temperature_2m,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    high: weatherData.daily.temperature_2m_max[0],
    low: weatherData.daily.temperature_2m_min[0],
    condition: weatherConditions[weatherData.current.weather_code] ?? "Unknown",
  };
}