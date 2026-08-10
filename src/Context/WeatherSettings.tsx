import { Children, createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type TemperatureUnit = "C" | "F";
type Theme = "light" | "dark";

type WeatherSettingsContextType = {
    temperatureUnite: TemperatureUnit;
    theme: Theme;
    toggleTemperatureUnit: () => void;
    toggleTheme: () => void;
};

const WeatherSettings = createContext<WeatherSettingsContextType | undefined>(undefined);

const TEMPERATURE_UNIT_KEY = "temperatureUnit";
const THEME_KEY = "theme";

type WeatherSettingsProviderProps = {
    children: ReactNode;
};

export const WeatherSettingsProvider = ({ children }: WeatherSettingsProviderProps) => {
    const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => {
        const saved = localStorage.getItem(TEMPERATURE_UNIT_KEY);
        return saved === "F" ? "F" : "C";
    });

    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem(THEME_KEY);
        return saved === "dark" ? "dark" : "light";
    });
}