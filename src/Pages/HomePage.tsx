import React from "react";
import { useState } from "react";
import { SearchBar } from "../Components/SearchBar";

export const HomePage = () => {
    const [city, setCity] = useState("");

    return(
        <main>
            <h1>Weather Application.</h1>
            <p>Search for weather information by city.</p>
        </main>
    )
}