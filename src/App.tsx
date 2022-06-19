import { useEffect, useState } from "react";


function App() {

  const [forecast, setForecast] = useState<forecastType>()
  const [location, setLocation] = useState<locationType>()
  const [current, setCurrent] = useState<currentType>()
  // const [dayAndTime, setDayAndTime] = useState()
  // const [cityName, setCityName] = useState<string>("")
  const [apiParameters, setApiParameters] = useState<linkProperties>(
    {
      cityOrLatLon: "Athens",
      days: 1,
      aqi: "no",
      alerts: "no"

    }
  )
  const [newCity, setNewCity] = useState<string>("")

  useEffect(() => {
    const getDataAtStart = async () => {
      const res = await getForecastFromApi(apiParameters)
      const data = await res.json()
      setForecast(data)
    }
    getDataAtStart()

  }, [])

  // useEffect(() => {
  //   setCityName(forecast?.location.name)
  // },[])
 

  // const getForecastFromApi123 = async () => {
    
  //   const res = await fetch('http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=Pyrgos&days=1&aqi=no&alerts=no', {
  //     method: "GET"
  //   })
  //   const data = await res.json()
  //   setForecast(data)
  // }

  const getForecastFromApi = async (apiParam: linkProperties) => {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&aqi=${apiParam.aqi}`)
    // const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    // const res = await fetch('http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=Pyrgos&days=1&aqi=no&alerts=no')
    const data = await res.json()
    return data
  }

  const getForecast = async () => {
    setApiParameters({ ...apiParameters, cityOrLatLon: newCity })
    const data = await getForecastFromApi(apiParameters)
    // setLocation(data)
    // setCurrent(data)
    setForecast(data)
    console.log(forecast?.location.name)
    setNewCity("")
  }





  return (
    <div className="main-container">
      <form className="main-container form1" onSubmit={getForecast}>
        <input placeholder="Enter city name......or..... Enter longitude and latitude" className="input1"
          value={newCity} type="text" onChange={(e) => setNewCity(e.target.value)}></input>
        <button type="submit">Enter</button>
      </form>
      <div className="city-info">
        <div>{forecast?.location.name}, {forecast?.location.region}</div>
        <div>{forecast?.location.localtime}</div>
        <div className="weather-info">Weather info</div>
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

export default App;
