import { useEffect, useState } from "react";

export function useUrl(initialCity:string): [string, string, (par:string) => void] {

    const [city, setCity] = useState<string>(initialCity)
    const [url, setUrl] = useState<string>('')

    useEffect(()=>{
        window.localStorage.setItem('cityData', JSON.stringify(city))
    },[city])

    const apiParameters = {
        cityOrLatLon: city,
        days: 3,
        aqi: "no",
        alerts: "no"
  
      }

    const createUrl = (targetValue: string) => {
        const newUrl = `http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParameters.cityOrLatLon}&days=${apiParameters.days}&aqi=${apiParameters.aqi}&alerts=${apiParameters.alerts}`
        setCity(targetValue)
        setUrl(newUrl)
        
    }

    return [url, city, createUrl]
}