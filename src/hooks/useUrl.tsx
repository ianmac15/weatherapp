import { useState } from "react";

export function useUrl(city: string): [string, () => void] {

    const [url, setUrl] = useState<string>('')

    const apiParameters = {
        cityOrLatLon: city,
        days: 3,
        aqi: "no",
        alerts: "no"
  
      }

    const createUrl = () => {
        const newUrl = `http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParameters.cityOrLatLon}&days=${apiParameters.days}&aqi=${apiParameters.aqi}&alerts=${apiParameters.alerts}`
        setUrl(newUrl)
    }

    return [url, createUrl]
}