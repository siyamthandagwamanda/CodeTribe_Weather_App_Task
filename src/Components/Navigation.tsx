import { NavLink } from "react-router-dom";
import "../Styles/Navigation.css";

export const Navigation = () => {
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
      </div>
    </nav>
  );
};