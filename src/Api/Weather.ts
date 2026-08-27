import type { WeatherData, HourlyForecast, DailyForecast } from "../Types/Weather";
import { getWeatherCondition } from "../Utils/WeatherIcons";

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

  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };

  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};


const FORECAST_QUERY =
  `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
  `&hourly=temperature_2m,weather_code,precipitation_probability` +
  `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
  `&timezone=auto`;

function buildHourlyForecast(weatherData: WeatherResponse): HourlyForecast[] {
  const now = Date.now();

  return weatherData.hourly.time
    .map((time, index) => ({
      time,
      temperature: weatherData.hourly.temperature_2m[index],
      conditionCode: weatherData.hourly.weather_code[index],
      condition: getWeatherCondition(weatherData.hourly.weather_code[index]),
      precipitationChance: weatherData.hourly.precipitation_probability[index],
    }))
   
    .filter((hour) => new Date(hour.time).getTime() >= now - 60 * 60 * 1000)
    .slice(0, 24);
}

function buildDailyForecast(weatherData: WeatherResponse): DailyForecast[] {
  return weatherData.daily.time.map((date, index) => ({
    date,
    high: weatherData.daily.temperature_2m_max[index],
    low: weatherData.daily.temperature_2m_min[index],
    conditionCode: weatherData.daily.weather_code[index],
    condition: getWeatherCondition(weatherData.daily.weather_code[index]),
  }));
}

async function fetchForecast(latitude: number, longitude: number): Promise<WeatherResponse> {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    FORECAST_QUERY;

  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Weather data is unavailable right now");
  }

  return weatherResponse.json();
}

function toWeatherData(
  cityName: string,
  country: string,
  latitude: number,
  longitude: number,
  weatherData: WeatherResponse,
  isCurrentLocation = false
): WeatherData {
  return {
    cityName,
    country,
    latitude,
    longitude,
    temperature: weatherData.current.temperature_2m,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    conditionCode: weatherData.current.weather_code,
    condition: getWeatherCondition(weatherData.current.weather_code),
    high: weatherData.daily.temperature_2m_max[0],
    low: weatherData.daily.temperature_2m_min[0],
    hourly: buildHourlyForecast(weatherData),
    daily: buildDailyForecast(weatherData),
    fetchedAt: new Date().toISOString(),
    isCurrentLocation,
  };
}

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
    throw new Error("Couldn't reach the city service, try again in a moment");
  }

  const cityData: CityResponse = await cityResponse.json();
  const location = cityData.results?.[0];

  if (!location) {
    throw new Error(`No city found matching "${cityName}"`);
  }

  const weatherData = await fetchForecast(location.latitude, location.longitude);

  return toWeatherData(location.name, location.country, location.latitude, location.longitude, weatherData);
}

export async function getWeatherByCoordinates(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const [weatherData, place] = await Promise.all([
    fetchForecast(latitude, longitude),
    resolvePlaceName(latitude, longitude),
  ]);

  return toWeatherData(place.name, place.country, latitude, longitude, weatherData, true);
}

async function resolvePlaceName(
  latitude: number,
  longitude: number
): Promise<{ name: string; country: string }> {
  try {
    const url =
      `https://api.bigdatacloud.net/data/reverse-geocode-client` +
      `?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("reverse geocoding failed");
    }

    const data = await response.json();
    const name = data.city || data.locality || data.principalSubdivision || "Current Location";

    return { name, country: data.countryName || "" };
  } catch {
    return { name: "Current Location", country: "" };
  }
}
