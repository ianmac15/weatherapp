import { useEffect, useState } from "react";

export function useUrl(): [string, string, React.Dispatch<React.SetStateAction<string>>, (par: string) => void, React.Dispatch<React.SetStateAction<string>>] {

    const [city, setCity] = useState<string>('')
    const [url, setUrl] = useState<string>('')

    // useEffect(()=>{
    //     window.localStorage.setItem('cityData', JSON.stringify(city))
    // },[city])

    const apiParameters = {

        days: 3,
        aqi: "no",
        alerts: "no"

    }


    const createUrl = (targetValue: string) => {
        setCity(targetValue)
        const newUrl = `https://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${city}&days=${apiParameters.days}&aqi=${apiParameters.aqi}&alerts=${apiParameters.alerts}`
        setUrl(newUrl)
    }

    return [url, city, setUrl, createUrl, setCity]
}