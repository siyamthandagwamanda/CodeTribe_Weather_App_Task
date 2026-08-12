import { NavLink } from "react-router-dom";
import { useWeatherSettings } from "../Context/WeatherSettingsContext";
import "../Styles/Navigation.css";

export const Navigation = () => {
  const { temperatureUnit, theme, toggleTemperatureUnit, toggleTheme} = useWeatherSettings();

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/my-locations"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Locations
          </NavLink>
        </div>

        <div className="navigation-settings">
            <button type="button" className="settings-toggle" onClick={toggleTemperatureUnit}>
              switch to °{temperatureUnit === "C" ? "F" : "C"}
            </button>

            <button type="button" className="settings-toggle" onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </div>
      </div>
    </nav>
  );
};