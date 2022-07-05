import { useEffect, useState } from "react"
import { Weather } from "../Models/Weather"
import { weatherType, linkProperties } from "../types-interfaces"

export function useWeather(apiParameters: linkProperties): [weatherType, (e: React.FormEvent<HTMLFormElement>) => Promise<void>] {

    const [weather, setWeather] = useState<weatherType>(
        {
            location: {
                name: '',
                region: '',
                country: '',
                lat: 0,
                lon: 0,
                tz_id: '',
                localtime_epoch: 0,
                localtime: ''
            },
            current:{

            },
            forecast:{
                
            }
        }
    )



    const getWeatherFromApi = async () => {
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParameters.cityOrLatLon}&days=${apiParameters.days}&aqi=${apiParameters.aqi}&alerts=${apiParameters.alerts}`)
        const data = res.json()
        return data
    }




    const weatherCall = async (e: React.FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault()

            if (!apiParameters.cityOrLatLon) {
                alert("Enter a valid city!")
                return
            }

            const data: weatherType = await getWeatherFromApi()
            // const data2: forecastType = await getForecastFromApi(apiParameters)

            if (data.location.name === null) {
                alert("Enter a valid city!")
                return
            }


            setWeather(data)
            // setForecast(data2)

            apiParameters = {
                cityOrLatLon: "",
                days: 3,
                aqi: "no",
                alerts: "no"
            }


            // navigate("/city")

        } catch {
            alert("Enter a valid city!")
            apiParameters = {
                cityOrLatLon: "",
                days: 3,
                aqi: "no",
                alerts: "no"
            }
        }
    }

    return [weather, weatherCall]
}