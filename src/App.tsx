import { useEffect, useState } from "react";


function App() {

  const [forecast, setForecast] = useState<openweathermap>()
  const [coords, setCoords] = useState<coordsProps[]>([])
  const [location, setLocation] = useState<locationType>()
  const [current, setCurrent] = useState<currentType>()

  const [apiParameters, setApiParameters] = useState<apiProperties>(
    {
      cityName: "",
      maxCities: "5",
      APIkey: "65319c51902c993a0c88513fcc16cdb1"
    }
  )

  // const [apiParameters, setApiParameters] = useState<linkProperties>(
  //   {
  //     cityOrLatLon: "",
  //     days: 1,
  //     aqi: "no",
  //     alerts: "no"

  //   }
  // )


  // useEffect(() => {
  //   const getDataAtStart = async () => {
  //     const data = await getForecastFromApi(apiParameters)
  //     setForecast(data)
  //   }
  //   getDataAtStart()

  // }, [])

  const getCoordsFromApi = async (apiParam: apiProperties) => {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${apiParam.cityName}&limit=${apiParam.maxCities}&appid=${apiParam.APIkey}`)
    const data = res.json()
    return data
  }



  const getForecastFromApi = async (apiParam: apiProperties, lat: number, lon: number) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiParam.APIkey}`)
    // const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&aqi=${apiParam.aqi}`)
    // const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    // const res = await fetch('http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=Pyrgos&days=1&aqi=no&alerts=no')
    const data = res.json()
    return data
  }

  const translateWindDirection = (windDir: string) => {
    if (windDir === "N") return "North"
    if (windDir === "S") return "South"
    if (windDir === "E") return "East"
    if (windDir === "W") return "West"

  }

  const getForecast = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (!apiParameters.cityName) {
      alert("Enter a valid city!")
      return
    }

    const newCoords:coordsProps[] = await getCoordsFromApi(apiParameters)

    setCoords(newCoords)

    const data = await getForecastFromApi(apiParameters, newCoords[0].lat, newCoords[0].lon)
    setForecast(data)

    setApiParameters({ ...apiParameters, cityName: "" })
  }





  return (
    <div className="main-container">
      <form className="main-container form1" onSubmit={getForecast}>
        <input placeholder="Enter city name......or..... Enter longitude and latitude" className="input1"
          value={apiParameters.cityName} type="text" onChange={(e) => setApiParameters({ ...apiParameters, cityName: e.target.value })}></input>
        <button type="submit" className="btn">Enter</button>
      </form>
      <div className="city-info">
        <div>{coords[0]?.name}, {coords[0]?.country}</div>
        {/* <div>{forecast?.location.localtime}</div> */}
        <div className="weather-info" >
          <div >Temperature: {forecast?.main.temp} Farenheit</div>
          <div >Wind speed: {forecast?.wind.speed} km/h</div>
          <div >Wind direction: {forecast?.wind.deg} </div>
          <div >Humidity: {forecast?.main.humidity} %</div>
        </div>

      </div>
    </div>

  );
}

interface forecastType {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
}

interface locationType {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

interface currentType {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
}

interface linkProperties {
  cityOrLatLon: string
  days: number
  aqi: string
  alerts: string
}

interface apiProperties {
  cityName: string
  maxCities: string

  APIkey: string
}

interface coordsProps {

  name: string,
  local_names:
  {
    af: string,
    ar: string,
    ascii: string,
    az: string,
    bg: string,
    ca: string,
    da: string,
    de: string,
    el: string,
    en: string,
    eu: string,
    fa: string,
    feature_name: string,
    fi: string,
    fr: string,
    gl: string,
    he: string,
    hi: string,
    hr: string,
    hu: string,
    id: string,
    it: string,
    ja: string,
    la: string,
    lt: string,
    mk: string,
    nl: string,
    no: string,
    pl: string,
    pt: string,
    ro: string,
    ru: string,
    sk: string,
    sl: string,
    sr: string,
    th: string,
    tr: string,
    vi: string,
    zu: string
  },
  lat: number,
  lon: number,
  country: string
  state: string
}


interface openweathermap {
  coord: {
    lon: number,
    lat: number
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number
}

export default App;
