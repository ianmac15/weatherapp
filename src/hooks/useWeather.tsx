import { useEffect, useState } from "react"
import { weatherType, linkProperties } from "../types-interfaces"

const getData = () => {
    const data = window.localStorage.getItem('weatherData')

    try {
        if (data !== null) {
            return JSON.parse(data)
        }
    } catch {
        console.log("Couldn't get initial data!!!")
    }
}

const init = {
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
    current: {
        last_updated_epoch: 0,
        last_updated: '',
        temp_c: 0,
        temp_f: 0,
        is_day: 0,
        condition: {
            text: '',
            icon: '',
            code: 0
        },
        wind_mph: 0,
        wind_kph: 0,
        wind_degree: 0,
        wind_dir: '',
        pressure_mb: 0,
        pressure_in: 0,
        precip_mm: 0,
        precip_in: 0,
        humidity: 0,
        cloud: 0,
        feelslike_c: 0,
        feelslike_f: 0,
        vis_km: 0,
        vis_miles: 0,
        uv: 0,
        gust_mph: 0,
        gust_kph: 0,
    },
    forecast: [{
        date: 0,
        day: {
            maxtemp_c: 0,
            mintemp_c: 0,
            maxwind_kph: 0,
            totalprecip_mm: 0,
            avghumidity: 0,
            daily_chance_of_rain: 0,
            daily_chance_of_snow: 0,
            condition: {
                text: '',
                icon: ''
            }
        },

        astro: {
            sunrise: '',
            sunset: '',
            moonrise: '',
            moonset: '',
            moon_phase: '',
            moon_illumination: '',
        },
        hour: [{
            time: '',
            temp_c: 0,
            temp_f: 0,
            is_day: 0,
            condition: {
                text: '',
                icon: ''
            },
            wind_mph: 0,
            wind_kph: 0,
            wind_degree: 0,
            wind_dir: '',
            pressure_mb: 0,
            pressure_in: 0,
            precip_mm: 0,
            precip_in: 0,
            humidity: 0,
            cloud: 0,
            feelslike_c: 0,
            feelslike_f: 0,
            vis_km: 0,
            vis_miles: 0,
            uv: 0,
            gust_mph: 0,
            gust_kph: 0,
            windchill_c: 0,
            windchill_f: 0,
            heatindex_c: 0,
            heatindex_f: 0,
            dewpoint_c: 0,
            dewpoint_f: 0,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
        }]
    }]
}

export function useWeather(url: string): [weatherType, (e: React.FormEvent<HTMLFormElement>) => Promise<void>] {

    const [weather, setWeather] = useState<weatherType>(
        () => getData()
    )

    useEffect(() => {
        window.localStorage.setItem('weatherData', JSON.stringify(weather))
    }, [weather])

    const getWeatherFromApi = async () => {
        const res = await fetch(url)
        const data = res.json()
        return data
    }

    const weatherCall = async (e: React.FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault()

            // if (!apiParameters.cityOrLatLon) {
            //     alert("Enter a valid city!")
            //     return
            // }

            const data: weatherType = await getWeatherFromApi()
            // const data2: forecastType = await getForecastFromApi(apiParameters)

            if (data.location.name === null) {
                alert("Enter a valid city!")
                return
            }


            setWeather(data)
            url = ''
            // setForecast(data2)

            // apiParameters = {
            //     cityOrLatLon: "",
            //     days: 3,
            //     aqi: "no",
            //     alerts: "no"
            // }


            // navigate("/city")

        } catch {
            alert("Enter a valid city!")
            // apiParameters = {
            //     cityOrLatLon: "",
            //     days: 3,
            //     aqi: "no",
            //     alerts: "no"
            // }
        }
    }



    return [weather, weatherCall]
}