import type { WeatherData } from "../Types/Weather";
import "../styles/weatherCard.css";

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
      <h2>
        {cityName}, {country}
      </h2>

      <p className="temperature">{temperature}°C</p>

      <p className="condition">{condition}</p>

      <div className="weather-details">
        <div>
          <span>High</span>
          <strong>{high}°C</strong>
        </div>

        <div>
          <span>Low</span>
          <strong>{low}°C</strong>
        </div>

        <div>
          <span>Humidity</span>
          <strong>{humidity}%</strong>
        </div>

        <div>
          <span>Wind</span>
          <strong>{windSpeed} km/h</strong>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;