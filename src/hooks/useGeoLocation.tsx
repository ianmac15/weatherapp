import { useEffect, useState } from "react";
import { initializeWeather } from "../types-interfaces";
import { useUrl } from "./useUrl";
import { useWeather } from "./useWeather";

export function useGeoLocation() {

  const [geolocation, setGeolocation] = useState(
    {
      country_code: "",
      country_name: "",
      city: "Athens",
      postal: "",
      latitude: "",
      longitude: "",
      IP: "",
      state: ""
    }
  )

  
  const getGeolocation = async () => {
    // const res = await fetch('http://ip-api.com/json/')
    const res = await fetch('https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708')
    const data = res.json()
    return data
  }

  const [url, city, setUrl, createUrl] = useUrl()

  const [tempcity, setTempCity] = useState('')

  
  const [geolocationWeather, geoweatherCall, reloadGeoWeather] = useWeather(url, {
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
    forecast: {
        forecastday: [{
            date: '',
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
  },setUrl)

  useEffect(()=>{
    const getGeo = async () => {
      const geocity:string = await getGeolocation()
      setTempCity(geocity)
    }

    getGeo()
    createUrl(tempcity)
    geoweatherCall()

  },[])

  return [geolocationWeather]





}