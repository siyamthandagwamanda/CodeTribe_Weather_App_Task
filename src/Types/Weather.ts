export type HourlyForecast = {
    time: string;
    temperature: number;
    condition: string;
    conditionCode: number;
    precipitationChance: number;
};

export type DailyForecast = {
    date: string;
    high: number;
    low: number;
    condition: string;
    conditionCode: number;
};

export type WeatherData = {
    cityName: string;
    country: string;
    latitude: number;
    longitude: number;
    temperature: number;
    condition: string;
    conditionCode?: number;
    high: number;
    low: number;
    windSpeed: number;
    humidity: number;
    hourly?: HourlyForecast[];
    daily?: DailyForecast[];
    fetchedAt?: string;
    isCurrentLocation?: boolean;
};