import React from "react";
import { useState } from "react";
import { SearchBar } from "../Components/SearchBar";

export const HomePage = () => {
    const [city, setCity] = useState("");

    function handleSearch(){
        console.log("Searching for:", city);
    }

    return(
      <>
        <SearchBar
            city={city}
            onCityChange={setCity}
            onSearch={handleSearch}
        />
      </>
    )
}