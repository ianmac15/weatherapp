import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { weatherType, linkProperties } from "../types-interfaces"
import { useUrl } from "./useUrl"


export function useWeather(apiUrl: string, initialData: weatherType, setUrl: React.Dispatch<React.SetStateAction<string>>): [weatherType, (e?: React.FormEvent<HTMLFormElement>) => Promise<void>, (e?: React.FormEvent<HTMLFormElement>) => Promise<void>] {

    const [urlLocal, setUrlLocal] = useState<string>('')
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

    // useEffect(()=>{
    //     reloadWeather()
    // },[])

    const navigate = useNavigate()

    useEffect(() => {
        window.localStorage.setItem('weatherData', JSON.stringify(weather))
    }, [weather])

    const getWeatherFromApi = async (url: string) => {
        const res = await fetch(url)
        const data = res.json()
        return data
    }

    // const [url2, city2, setUrl2, createUrl2] = useUrl()
    // createUrl2(weather.location.name)

    const reloadWeather = async (e?: React.FormEvent<HTMLFormElement>) => {
        try {
            e?.preventDefault()


            const data2: weatherType = await getWeatherFromApi(urlLocal)
            if (data2) {
                setWeather(data2)
                console.log('Weather has been reloaded')
            }

        } catch {
            console.log("Error on reloading weather!")
        }

    }

    const weatherCall = async (e?: React.FormEvent<HTMLFormElement>) => {

        try {
            e?.preventDefault()

            const data: weatherType = await getWeatherFromApi(apiUrl)
            setUrlLocal(apiUrl)

            if (!data) {
                alert("Enter a valid city!")
                return
            }

            // navigate('/city')
            setWeather(data)
            console.log("Weather has been set")
            setUrl('')

        } catch {
            alert("Enter a valid city!")
        }
    }



    return [weather, weatherCall, reloadWeather]
}