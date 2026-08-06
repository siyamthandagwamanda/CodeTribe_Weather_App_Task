import type { WeatherData } from "../Types/Weather";

export const getWeather = async (city: string): Promise<WeatherData> => {
  if (!city.trim()) {
    throw new Error("City name cannot be empty");
  }

 
  const geoUrl = `https://open-meteo.com{encodeURIComponent(city)}&count=1&language=en&format=json`;
  const geoResponse = await fetch(geoUrl);
  
  if (!geoResponse.ok) {
    throw new Error("Failed to connect to the geocoding service");
  }
  
  const geoData = await geoResponse.json();
  
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`Could not find coordinates for city: "${city}"`);
  }

  const { name: formattedName, country } = geoData.results[0];

  
  const weatherUrl = `https://open-meteo.com&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Failed to retrieve atmospheric telemetry data");
  }

  const weatherData = await weatherResponse.json();
  console.log(weatherData);
  const current = weatherData.current;
  
  return {
    cityName: city,
    country: country,
    temperature: weatherData.current.temperature_2m,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    high: weatherData.daily.temperature_2m_max[0],
    low: weatherData.daily.temperature_2m_min[0],
    condition: "Current Weather",
  };
};