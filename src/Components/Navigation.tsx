import { NavLink } from "react-router-dom";
import "../Styles/Navigation.css";


const navLinkClass = ({ isActive}: {isActive: boolean}) => isActive ? "nav-link active" : "nav-link";

const links = [
    { to: "/", label: "Home" },
    { to: "/my-locations", label: "My Locations"},
];

export const Navigation = () => {
   
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
