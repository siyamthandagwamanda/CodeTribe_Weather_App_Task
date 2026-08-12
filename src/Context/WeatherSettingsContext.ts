import { createContext, useContext } from "react";

export type Settings = {
    temperatureUnit: "C" | "F";
    theme: "light" | "dark";
    toggleTemperatureUnit: () => void;
    toggleTheme: () => void;
};

export const WeatherSettings = createContext<Settings | undefined>(undefined)

export function useWeatherSettings(){
    const settings = useContext(WeatherSettings);

    if (settings === undefined){
        throw new Error("useWeatherSettings must be used inside WeatherSettingsProvider");
    }
    return settings;
}