import React from "react";
import { NavLink } from "react-router-dom";
import '../Styles/Navigation.css';

export const Navigation = () => {
    return(
        <nav className="navigation">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Home
            </NavLink>

              <NavLink to="/Address kept" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Address Kept.
            </NavLink>
        </nav>
    )
}