import type { WeatherData } from "../Types/Weather";
import "../Styles/WeatherCard.css";

function WeatherCard({
  cityName,
  country,
  temperature,
  condition,
  high,
  low,
  humidity,
  windSpeed,

}: WeatherData) {
  return (
    <section className="weather-card">

      <div className="weather-card-header">
        <h2>
          {cityName}, {country}
        </h2>
        <p className="condition">{condition}</p>
      </div>

      <div className="weather-main">
        <p className="temperature">{Math.round(temperature)}°C</p>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <span>High</span>
          <strong>{Math.round(high)}°C</strong>
        </div>

        <div className="weather-detail">
          <span>Low</span>
          <strong>{Math.round(low)}°C</strong>
        </div>

        <div className="weather-detail">
          <span>Humidity</span>
          <strong>{humidity}%</strong>
        </div>

        <div className="weather-detail">
          <span>Wind</span>
          <strong>{windSpeed} km/h</strong>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;
