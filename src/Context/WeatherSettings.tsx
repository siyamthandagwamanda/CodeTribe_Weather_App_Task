import { createContext, useContext, useEffect, useState } from "react";
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

