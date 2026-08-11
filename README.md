<img src="https://socialify.git.ci/siyamthandagwamanda/CodeTribe_Weather_App_Task/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="CodeTribe_Weather_App_Task" width="640" height="320" />

# Weather App 🌤️

A simple React + TypeScript weather application that allows users to search for a city and view current weather information.

## Features

* Search weather by city
* Current temperature
* Weather condition
* Daily high and low temperatures
* Humidity
* Wind speed
* Save cities to **My Locations
* **
* Saved cities remain after refreshing using `localStorage`
* Responsive layout

## Technologies

* React
* TypeScript
* React Router
* Open-Meteo API
* CSS
* LocalStorage

## Project Structure

```text
src/
├── Api/
├── Components/
├── Pages/
├── Router/
├── Styles/
└── Types/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## API

Weather data is provided by **Open-Meteo**. The application uses the Open-Meteo Geocoding API to find a city's coordinates and the Forecast API to retrieve weather information.

## Author

Siyamthanda Gwamanda @Mlab CodeTribe 26/27
