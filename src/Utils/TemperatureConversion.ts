export function celsiusToFahrenheit(celcsius: number): number{
    return (celcsius * 9) / 5 + 32;
}

export function formatTemperature(
    celcsius: number,
    unit: "C" | "F"

): string
{
    if (unit === "F"){
        return `${Math.round(celsiusToFahrenheit(celcsius))}°F`
    }
    return `${Math.round(celcsius)}°C`;
}