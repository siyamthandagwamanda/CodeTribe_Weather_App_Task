import type { HourlyForecast as HourlyForecastEntry } from "../Types/Weather";
import { useWeatherSettings } from "../Context/WeatherSettingsContext";
import { formatTemperature } from "../Utils/TemperatureConversion";
import { getWeatherIcon } from "../Utils/WeatherIcons";
import "../Styles/Forecast.css";

type Props = {
  hours: HourlyForecastEntry[];
};

export const HourlyForecast = ({ hours }: Props) => {
  const { temperatureUnit } = useWeatherSettings();

  if (hours.length === 0) {
    return <p className="forecast-empty">Hourly forecast isn't available for this location.</p>;
  }

  return (
    <div className="forecast-scroll" role="list">
      {hours.map((hour) => {
        const IconComponent = getWeatherIcon(hour.conditionCode);

        return (
          <div className="forecast-item" role="listitem" key={hour.time}>
            <span className="forecast-time">
              {new Date(hour.time).toLocaleTimeString([], { hour: "numeric" })}
            </span>
            <span className="forecast-icon" aria-hidden="true">
              <IconComponent size={20} />
            </span>
            <span className="forecast-temp">{formatTemperature(hour.temperature, temperatureUnit)}</span>
            <span className="forecast-rain">💧 {hour.precipitationChance}%</span>
          </div>
        );
      })}
    </div>
  );
};