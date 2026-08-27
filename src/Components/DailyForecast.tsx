import type { DailyForecast as DailyForecastEntry } from "../Types/Weather";
import { useWeatherSettings } from "../Context/WeatherSettingsContext";
import { formatTemperature } from "../Utils/TemperatureConversion";
import { getWeatherIcon } from "../Utils/WeatherIcons";
import "../Styles/Forecast.css";

type Props = {
  days: DailyForecastEntry[];
};

function formatDayLabel(dateString: string, index: number): string {
  if (index === 0) {
    return "Today";
  }

  return new Date(dateString).toLocaleDateString([], { weekday: "short" });
}

export const DailyForecast = ({ days }: Props) => {
  const { temperatureUnit } = useWeatherSettings();

  if (days.length === 0) {
    return <p className="forecast-empty">Daily forecast isn't available for this location.</p>;
  }

  return (
    <div className="forecast-list" role="list">
      {days.map((day, index) => {
        const IconComponent = getWeatherIcon(day.conditionCode);

        return (
          <div className="forecast-row" role="listitem" key={day.date}>
            <span className="forecast-day">{formatDayLabel(day.date, index)}</span>
            <span className="forecast-icon" aria-hidden="true">
              <IconComponent size={20} />
            </span>
            <span className="forecast-condition">{day.condition}</span>
            <span className="forecast-range">
              <strong>{formatTemperature(day.high, temperatureUnit)}</strong>{" "}
              / {formatTemperature(day.low, temperatureUnit)}
            </span>
          </div>
        );
      })}
    </div>
  );
};