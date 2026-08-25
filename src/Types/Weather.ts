export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  condition: string;
}

export interface DailyForecast {
  day: string;
  tempMin: number;
  tempMax: number;
  icon: string;
  condition: string;
}

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
  unit: "metric" | "imperial";
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}