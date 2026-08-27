import type { WeatherData } from "../Types/Weather";

const SEVERE_CODES = new Set([1, 65, 75, 82, 95, 96, 99]);

export function isSevereWeather(weather: WeatherData): boolean {
  return weather.conditionCode !== undefined && SEVERE_CODES.has(weather.conditionCode);
}

export async function notifyIfSevere(weather: WeatherData): Promise<void> {
  if (!isSevereWeather(weather)) {
    return;
  }

  if (!("Notification" in window)) {
    return;
  }

  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    return;
  }

  new Notification("⚠️ Severe Weather Alert", {
    body: `${weather.condition} expected in ${weather.cityName}${
      weather.country ? `, ${weather.country}` : ""
    }. Stay safe!`,
  });
}