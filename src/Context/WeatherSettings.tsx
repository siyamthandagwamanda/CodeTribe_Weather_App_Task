import { createContext, useContext, useEffect, useState } from "react";

type Settings = { 
    temperatureUnit: "C" | "F"; 
    theme: "light" | "dark"; 
    toggleTemperatureUnit: () => void; 
    toggleTheme: () => void; 
};

type Props = { 
    children: 
    React.ReactNode; 
};

const WeatherSettings = createContext<Settings | undefined>(undefined);

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

export function useWeatherSettings() {
    const settings = useContext(WeatherSettings);

    if (settings === undefined){ 
        throw new Error( "useWeatherSettings must be used inside WeatherSettingsProvider" ); 
    }
    return settings;
}