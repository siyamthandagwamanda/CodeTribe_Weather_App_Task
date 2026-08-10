import { NavLink } from "react-router-dom";
import "../Styles/Navigation.css";
// import { useState } from "react";
// import { useWeatherSettings } from "../Context/WeatherSettings";

const navLinkClass = ({ isActive}: {isActive: boolean}) => isActive ? "nav-link active" : "nav-link";

const links = [
    { to: "/", label: "Home" },
    { to: "/my-locations", label: "My Locations"},
];

export const Navigation = () => {
    // const [menuOpen, setMenuOpen] = useState(false);
    // const { theme, temperatureUnit, toggleTheme, toggleTemperatureUnit } = useWeatherSettings();
    
    // const closeMenu = () => setMenuOpen(false);

    return(
        <nav className="navigation">
            <div className="navigation-container"> 
                <div className="navigation-links">
                    {links.map(({ to, label }) => (
                    <NavLink key={to} to={to} className={navLinkClass}>
                        {label}
                    </NavLink>
                    ))}
                </div>

            </div>
          
          
        </nav>
   );
}
