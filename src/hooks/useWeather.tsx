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

export function useWeather(url: string, initialData: weatherType): [weatherType, (e: React.FormEvent<HTMLFormElement>) => Promise<void>, () => Promise<void>] {

    

    const [weather, setWeather] = useState<weatherType>(
        // () => {

        //     const callWeatherAfterReload = async () => {
        //         const data: weatherType = await getWeatherFromApi()
        //         setTempData(data)
        //     }

        //     callWeatherAfterReload()
        //     return tempData


        // }
        // () => getData()
        initialData
        // tempData
    )

    // useEffect(() => {
    //     const callWeatherAfterReload = async () => {
    //         const data: weatherType = await getWeatherFromApi()
    //         setWeather(data)
    //     }

    //     callWeatherAfterReload()
    // }, [])

    const reloadWeather = async () => {
        const data: weatherType = await getWeatherFromApi()
        setWeather(data)
    }

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

            const data: weatherType = await getWeatherFromApi()

            if (data.location.name === null) {
                alert("Enter a valid city!")
                return
            }

            setWeather(data)
            url = ''

        } catch {
            alert("Enter a valid city!")
        }
    }



    return [weather, weatherCall, reloadWeather]
}