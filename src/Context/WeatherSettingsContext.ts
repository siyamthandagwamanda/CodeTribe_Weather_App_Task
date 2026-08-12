import { createContext, useContext } from "react";

export type Settings = {
    temperatureUnit: "C" | "F";
    theme: "light" | "dark";
    toggleTemperatureUnit: () => void;
    toggleTheme: () => void;
};