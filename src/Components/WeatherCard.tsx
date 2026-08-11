import type { WeatherData } from "../Types/Weather";
import "../Styles/WeatherCard.css";

const round = (value: number) => Math.round(value);

const WeatherCard = ({
  cityName,
  country,
  temperature,
  condition,
  high,
  low,
  humidity,
  windSpeed,
}: WeatherData) => {
  const details = [
    { label: "High", value: `${round(high)}°C` },
    { label: "Low", value: `${round(low)}°C` },
    { label: "Humidity", value: `${humidity}%` },
    { label: "Wind", value: `${windSpeed} km/h` },
  ];

  return (
    <section className="weather-card">
      <div className="weather-card-header">
        <h2>{cityName}, {country}</h2>
        <p className="condition">{condition}</p>
      </div>

      <div className="weather-main">
        <p className="temperature">{round(temperature)}°C</p>
      </div>

      <div className="weather-details">
        {details.map(({ label, value }) => (
          <div className="weather-detail" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherCard;