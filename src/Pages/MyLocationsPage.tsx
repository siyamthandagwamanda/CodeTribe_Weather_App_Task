import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../Components/WeatherCard";
import { getSavedWeather, removeWeather, clearSavedWeather, } from "../Utils/SavedWeatherStorage";
import type { WeatherData } from "../Types/Weather";
import "../Styles/MyLocationsPage.css";

export const MyLocationsPage = () => {
   const navigate = useNavigate();

   const [savedWeather, setSavedWeather] = useState<WeatherData[]>(() => getSavedWeather());

  const handleRemove = (weather: WeatherData) => { 
    const updatedWeather = removeWeather(weather); setSavedWeather(updatedWeather); 
  };

  const handleClearAll = () => { 
    clearSavedWeather(); setSavedWeather([]); 
  };

  const handleView = (weather: WeatherData) => {
    navigate("/", { state: { weather } });
  };

  return(
    <main className="my-locations">

      <div className="saved-header"> 
        <h2>My Locations</h2>
        {savedWeather.length > 0 && ( <button type="button" onClick={handleClearAll}> Clear All </button> )} 
      </div>

        {savedWeather.length === 0 ? ( 
          <p className="empty-message"> 
              No saved cities yet. Search for a city and save it here. 
          </p> ) : ( 
            
          <div className="saved-weather-list">
            {savedWeather.map((weather) => ( 
              <div className="saved-weather-item" key={`${weather.cityName}-${weather.country}`} 
              > 
                <WeatherCard {...weather} /> 

                <div className="saved-weather-actions">
                  <button type="button" className="view-button"
                    onClick={() => handleView(weather)} > View 
                  </button> 

                  <button type="button" 
                    onClick={() => handleRemove(weather)} > Remove 
                  </button> 
                </div>
              </div>
            ))} 
          </div> 
        )}
        
    </main>
  )
}