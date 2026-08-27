import "../Styles/Forecast.css";

export type ForecastView = "hourly" | "daily";

type Props = {
  view: ForecastView;
  onChange: (view: ForecastView) => void;
};

export const ForecastToggle = ({ view, onChange }: Props) => {
  return (
    <div className="forecast-toggle" role="tablist" aria-label="Forecast range">
      <button
        type="button"
        role="tab"
        aria-selected={view === "hourly"}
        className={view === "hourly" ? "forecast-toggle-btn active" : "forecast-toggle-btn"}
        onClick={() => onChange("hourly")}
      >
        Hourly
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === "daily"}
        className={view === "daily" ? "forecast-toggle-btn active" : "forecast-toggle-btn"}
        onClick={() => onChange("daily")}
      >
        Daily
      </button>
    </div>
  );
};
