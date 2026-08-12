import {  useEffect, useState } from "react";
import { WeatherSettings} from "../Context/WeatherSettingsContext"

type Props = { 
    children: 
    React.ReactNode; 
};

export function WeatherSettingsProvider({ children }: Props) {

    const [temperatureUnit, setTemperatureUnit] = useState<"C" | "F">( localStorage.getItem("temperatureUnit") === "F" ? "F" : "C" );
    const [theme, setTheme] = useState<"light" | "dark">( localStorage.getItem("theme") === "dark" ? "dark" : "light" );

    useEffect(() => { localStorage.setItem("temperatureUnit", temperatureUnit); }, [temperatureUnit]);

    useEffect(() => { localStorage.setItem("theme", theme); document.body.setAttribute("dark-theme", theme); }, [theme]);

    function toggleTemperatureUnit() { 
        if (temperatureUnit === "C"){ 
            setTemperatureUnit("F");
        } 
        else 
        { 
            setTemperatureUnit("C"); 
        } 
    }

    function toggleTheme() { 
        if (theme === "light") { 
            setTheme("dark"); 
        } else 
        { 
          setTheme("light"); 
        } 
    }

    return ( 
        <WeatherSettings.Provider 
            value={{ temperatureUnit, theme, toggleTemperatureUnit, toggleTheme, }} > 
            {children} 
        </WeatherSettings.Provider>
    );
}

