import { NavLink } from "react-router-dom";
import "../Styles/Navigation.css";

const navLinkClass = ({ isActive}: {isActive: boolean}) => isActive ? "nav-link active" : "nav-link";

const links = [
    { to: "/", label: "Home" },
    { to: "MyLocations", label: "My Locations"},
];

export const Navigation = () => (
    <nav className="navigation">
        {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
                {label}
            </NavLink>
        ))}
    </nav>
);