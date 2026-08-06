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

  const { latitude, longitude, name: formattedName, country } = geoData.results[0];

  // Step 2: Request current forecast using Weather API
  const weatherUrl = `https://open-meteo.com{latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Failed to retrieve atmospheric telemetry data");
  }

  const weatherData = await weatherResponse.json();
  const current = weatherData.current;

  // Step 3 & 4: Transform the API response and return WeatherData object
  return {
    cityName: `${formattedName}, ${country}`,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    weatherCode: current.weather_code,
  };
};
