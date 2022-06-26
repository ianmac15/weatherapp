import { useEffect, useState } from "react";
import ForecastDay from "./components/ForecastDay";


function App() {

  const [weather, setweather] = useState<weatherType>()
  // const [forecast, setForecast] = useState<weatherType>()
  const [dayForecast, setDayForecast] = useState<forecastdayType>()

  useEffect(() => {
    const data = window.localStorage.getItem('weatherData')
    try {
      if (data !== null) {
        setweather(JSON.parse(data))
      }
    } catch {
      console.log("Error!!!")
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('weatherData', JSON.stringify(weather))
  }, [weather])

  const [apiParameters, setApiParameters] = useState<linkProperties>(
    {
      cityOrLatLon: "",
      days: 3,
      aqi: "no",
      alerts: "no"

    }
  )

  const [exactDate, setExactDate] = useState<dateType>({
    day: 0,
    date: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const date = new Date()
    setExactDate({
      ...exactDate,
      day: date.getDay(),
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    })

  }, [exactDate])

  // useEffect(() =>  {
  //   const fecthAt10 = async () => {
  //     setTimeout( await getweatherFromApi(apiParameters), 1000)
  //   }
  //   fecthAt10()
  // }, [weather])

  const getweatherFromApi = async (apiParam: linkProperties) => {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    // const res = await fetch(`http://api.weatherapi.com/v1/weather.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    // const res = await fetch('http://api.weatherapi.com/v1/weather.json?key=7000cd0d3d2c419b99463816221806&q=Pyrgos&days=1&aqi=no&alerts=no')
    const data = res.json()
    return data
  }

  const getForecastFromApi = async (apiParam: linkProperties) => {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    const data = await res.json()
    return data
  }

  const getweather = async (e: React.FormEvent<HTMLFormElement>) => {

    try {
      e.preventDefault()

      if (!apiParameters.cityOrLatLon) {
        alert("Enter a valid city!")
        return
      }

      const data: weatherType = await getweatherFromApi(apiParameters)
      // const data2: forecastType = await getForecastFromApi(apiParameters)

      if (data.location.name === null) {
        alert("Enter a valid city!")
        return
      }


      setweather(data)
      // setForecast(data2)

      setApiParameters({
        cityOrLatLon: "",
        days: 3,
        aqi: "no",
        alerts: "no"

      })
    } catch {
      alert("Enter a valid city!")
      setApiParameters({
        cityOrLatLon: "",
        days: 3,
        aqi: "no",
        alerts: "no"

      })

    }


  }

  const getWindDir = (windDir: string | undefined) => {
    if (typeof windDir === 'string') {
      try {
        let newString = ""
        for (let i = 0; i < windDir.length; i++) {
          if (windDir[i] == 'N') newString += "North "
          if (windDir[i] == 'E') newString += "East "
          if (windDir[i] == 'S') newString += "South "
          if (windDir[i] == 'W') newString += "West "
        }
        return newString
      } catch {
        console.log('Invalid Wind Direction')
      }
    }
  }

  const getFormattedDay = (day: number) => {
    // switch (new Date().getDay()) {
    switch (day) {
      case 0:
        return "Sunday"
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
    }
  }

  const getFormattedMonth = () => {
    // switch (new Date().getMonth()) {
    switch (exactDate.month) {
      case 0:
        return "January"
      case 1:
        return "February"
      case 2:
        return "March"
      case 3:
        return "April"
      case 4:
        return "May"
      case 5:
        return "June"
      case 6:
        return "July"
      case 7:
        return "Augoust"
      case 8:
        return "September"
      case 9:
        return "October"
      case 10:
        return "November"
      case 11:
        return "December"
    }
  }

  const getFormattedDate = () => {
    // const date = new Date()
    return getFormattedDay(exactDate.day) + " " + exactDate.date + " " + " " + getFormattedMonth() + " " + exactDate.year
  }

  // const getDate2 = (date: string | undefined) => {
  //   if (typeof date === 'string') {
  //     try {
  //       const arrayDate: string[] = date.split(" ")



  //       for (let i = 0; i < arrayDate.length; i++) {
  //         console.log(arrayDate[i])
  //       }
  //     } catch {
  //       console.log("Error: invalid date")
  //     }
  //   }

  // }

  const getTime = () => {
    // const date = new Date()
    // const hours = date.getHours()
    const hours = exactDate.hours
    let stringHours = "" + hours
    if (hours < 10) {
      stringHours = "0" + stringHours
    }
    // const minutes = date.getMinutes()
    const minutes = exactDate.minutes
    let stringMins = "" + minutes
    if (minutes < 10) {
      stringMins = "0" + stringMins
    }
    // const seconds = date.getSeconds()
    const seconds = exactDate.seconds
    let stringSecs = "" + seconds
    if (seconds < 10) {
      stringSecs = "0" + stringSecs
    }
    return stringHours + ":" + stringMins + ":" + stringSecs
  }

  const getDayForecast = () => {
    
    const index = [0,1,2]

    return(index.map((x) =>
     
      <ForecastDay forecast={weather?.forecast.forecastday[x]} day={getFormattedDay(exactDate.day + x) || ''}
        date={exactDate.date + x} />
    ))


  }

  return (
    <div className="main-container">
      <form className="main-container form1" onSubmit={getweather}>
        <input placeholder="Enter city name" className="input1"
          value={apiParameters.cityOrLatLon} type="text" onChange={(e) => setApiParameters({ ...apiParameters, cityOrLatLon: e.target.value })}></input>
        <input type="submit" className="btn" value="Enter" />
      </form>
      <div className="weather-container">
        <div className="weather-container1">
          <div className="city-info city-time">
            <div>{weather?.location.name}, {weather?.location.region}, {weather?.location.country}</div>
            <div>{getFormattedDate()}</div>
            <div>{getTime()}</div>
          </div>
          <div className="city-info">
            <div className="weather-info" >
              <strong>The Weather right now</strong>
              <div className="temp">
                <div >{weather?.current.condition.text}</div>
                <img src={weather?.current.condition.icon} />
              </div>

              <div>Temperature: {weather?.current.temp_c} &deg; C</div>
              <div >Wind speed: {weather?.current.wind_kph} km/h</div>
              <div >Wind direction: {getWindDir(weather?.current.wind_dir)} </div>
              <div >Humidity: {weather?.current.humidity} %</div>
              <div>Pressure: {weather?.current.pressure_mb} millibars</div>
              <div> Precipitation: {weather?.current.precip_mm} mm</div>
            </div>
          </div>
        </div>
        <div className="weather-container2">
          <div className="weather-container3">
            {getDayForecast()}
          </div>
          <div className="weather-container3">

          </div>
        </div>
      </div>
    </div>

  );
}

// interface weatherType {
//   location: {
//     name: string
//     region: string
//     country: string
//     lat: number
//     lon: number
//     tz_id: string
//     localtime_epoch: number
//     localtime: string
//   }
//   current: {
//     last_updated_epoch: number
//     last_updated: string
//     temp_c: number
//     temp_f: number
//     is_day: number
//     condition: {
//       text: string
//       icon: string
//       code: number
//     }
//     wind_mph: number
//     wind_kph: number
//     wind_degree: number
//     wind_dir: string
//     pressure_mb: number
//     pressure_in: number
//     precip_mm: number
//     precip_in: number
//     humidity: number
//     cloud: number
//     feelslike_c: number
//     feelslike_f: number
//     vis_km: number
//     vis_miles: number
//     uv: number
//     gust_mph: number
//     gust_kph: number
//   }
// }

interface linkProperties {
  cityOrLatLon: string
  days: number
  aqi: string
  alerts: string
}

export interface weatherType {
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
  forecast: {
    forecastday: forecastdayType[]
  }
}

export interface forecastdayType {

  date: number
  day: {
    maxtemp_c: number
    mintemp_c: number
    maxwind_kph: number
    totalprecip_mm: number
    avghumidity: number
    daily_chance_of_rain: number
    daily_chance_of_snow: number
    condition: {
      text: string
      icon: string
    }
  }

  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: string
  }
  hour: [{
    time: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: {
      text: string
      icon: string
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
    windchill_c: number
    windchill_f: number
    heatindex_c: number
    heatindex_f: number
    dewpoint_c: number
    dewpoint_f: number
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
  }]

}

interface dateType {
  day: number
  date: number
  month: number
  year: number
  hours: number
  minutes: number
  seconds: number
}



export default App;
