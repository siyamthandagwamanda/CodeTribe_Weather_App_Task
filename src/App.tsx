import "../src/App.css"
import { WeatherAppRouter } from './Router/WeatherAppRouter';
import { WeatherSettingsProvider } from "./Context/WeatherSettings";

export const App = () => {
  return <WeatherAppRouter />
}