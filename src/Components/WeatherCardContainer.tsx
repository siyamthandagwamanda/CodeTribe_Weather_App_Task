// import { useEffect } from "react";
// import { useState } from "react";
// import type { WeatherData } from "../Types/Weather";
// import { getWeather } from "../Api/Weather";
// import WeatherCard from "./WeatherCard";

// interface WeatherCardContainerProp{
//     city: string;
// }

// export function WeatherCardContainer({city}: WeatherCardContainerProp){
//     const [weather, setWeather] = useState<WeatherData | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);

//     useEffect(() => {
//         let isMounted = true;

//         const fetchWeatherData = async () => {
//             if (!city.trim()) return;
//             setLoading(true);
//             setError(null);

//             try{
//                 const data = await getWeather(city);
//                 if (isMounted){
//                     setWeather(data);
//                 }
//             } catch(err: any){
//                 if (isMounted){
//                     setError(err.message || "An unknown error occurred");
//                 }
//             } finally{
//                 if (isMounted){
//                     setLoading(false);
//                 }
//             }
//         };
//         fetchWeatherData();

//         return () => {
//             isMounted = false;
//         };
//     }, [city]);

//     if (loading) return <div className="weather-status-msg">Loading weather data....</div>;
//     if (error) return <div className="weather-status-msg-error">Error: {error}</div>;
//     if (!weather) return <div className="weather-status-msg"></div>

//     return <WeatherCard {...weather}/>;
// }