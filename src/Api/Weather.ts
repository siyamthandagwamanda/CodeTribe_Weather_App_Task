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

interface GeoResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface GeoResponse{
  results?: GeoResult[];
}

interface ForecastResponse{
  current:{
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily:{
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

async function fetchJson<T>(url: string, errorMessage: string): Promise<T>{
   const response = await fetch(url);
   if (!response.ok){
     throw new Error(errorMessage);
   }
   return response.json();
}

export const getWeather = async (city: string): Promise<WeatherData> => {
  const trimmedCity = city.trim();
  if (!trimmedCity){
    throw new Error("City name cannot be empty");
  }

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                  trimmedCity)}&count=1&language=en&format=json`;
  
  const geoData = await fetchJson<GeoResponse>(
    geoUrl, "Couldn't reach the geocoding service, try again in a moment"
  );

  const match = geoData.results?.[0];
  if (!match){
    throw new Error(`No city found matching "${trimmedCity}"`);
  }

  const { name, country, latitude, longitude } = match;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=auto`;
  
  const forecast = await fetchJson<ForecastResponse>(
    weatherUrl, "Weather data is unavailable right now"
  );

}





