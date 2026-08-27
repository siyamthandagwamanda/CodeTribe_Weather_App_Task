import { useState } from "react";
import type { WeatherData } from "../Types/Weather";
import { ForecastToggle, type ForecastView } from "./ForecastToggle";
import { HourlyForecast } from "./HourlyForecast"
import { DailyForecast } from "./DailyForecast";
import "../Styles/Forecast.css";

type Props = {
  weather: WeatherData;
};

export const WeatherForecastPanel = ({ weather }: Props) => {
  const [view, setView] = useState<ForecastView>("daily");

  return (
    <section className="forecast-panel" aria-label="Weather forecast">
      <div className="forecast-panel-header">
        <h3>Forecast</h3>
        <ForecastToggle view={view} onChange={setView} />
      </div>

      {view === "hourly" ? (
        <HourlyForecast hours={weather.hourly ?? []} />
      ) : (
        <DailyForecast days={weather.daily ?? []} />
      )}
    </section>
  );
};
