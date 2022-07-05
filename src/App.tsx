import { useEffect, useState } from "react";
import ForecastDay from "./components/ForecastDay";
import ForecastCity from "./components/ForecastCity";
import { geolocationType, dateType, forecastdayType, linkProperties, weatherType } from "./types-interfaces"
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import * as weatherFuncs from "./WeatherFunctions"
import { useWeather } from "./hooks/useWeather";

function App() {

  // const [weather, setWeather] = useState<weatherType>()
  // const [forecast, setForecast] = useState<weatherType>()
  // const [dayForecast, setDayForecast] = useState<forecastdayType>()

  
  const [geolocation, setGeolocation] = useState<geolocationType>(
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
  const [apiParameters, setApiParameters] = useState<linkProperties>(
    {
      cityOrLatLon: "",
      days: 3,
      aqi: "no",
      alerts: "no"

    }
  )

  const [weather, weatherCall] = useWeather(apiParameters)

  const [exactDate, setExactDate] = useState<dateType>({
    day: 0,
    date: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  

  const cityLocation = () => {
    try {

      const getLocation = async () => {
        const geolocation: geolocationType = await getGeolocation()
        setGeolocation(geolocation)
      }

      getLocation()
      console.log(geolocation)

      setApiParameters({ ...apiParameters, cityOrLatLon: geolocation?.city })

      const getInitialWeather = async () => {
        const data2: weatherType = await getWeatherFromApi(apiParameters)
        setWeather(data2)
      }

      getInitialWeather()

      console.log("Found location")

    } catch {
      console.log("Couldn't get location")
    }

    // getWeather()
  }

  const getWeatherFromLocalStorage = () => {
    const data = window.localStorage.getItem('weatherData')

    try {
      if (data !== null) {
        setWeather(JSON.parse(data))
      }
    } catch {
      console.log("Couldn't get initial data!!!")
    }
  }

  const getCityFromLocalStorage = () => {
    const data = window.localStorage.getItem('cityData')

    try {
      if (data !== null) {
        setApiParameters({...apiParameters,cityOrLatLon:JSON.parse(data)})
      }
    } catch {
      console.log("Couldn't get initial data!!!")
    }

    // getWeather()
  }

  useEffect(() => {

    const data = window.localStorage.getItem('weatherData')

    try {
      if (data !== null) {
        setWeather(JSON.parse(data))
      }



    } catch {
      console.log("Couldn't get initial data!!!")
    }

  }, [])

  useEffect(() => {
    window.localStorage.setItem('weatherData', JSON.stringify(weather))
  }, [weather])



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
  //     setTimeout( await getWeatherFromApi(apiParameters), 1000)
  //   }
  //   fecthAt10()
  // }, [weather])


  const getGeolocation = async () => {
    // const res = await fetch('http://ip-api.com/json/')
    const res = await fetch('https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708')
    const data = res.json()
    return data
  }


  // const getWeatherFromApi = async (apiParam: linkProperties) => {
  //   const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
  //   // const res = await fetch(`http://api.weatherapi.com/v1/weather.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
  //   // const res = await fetch('http://api.weatherapi.com/v1/weather.json?key=7000cd0d3d2c419b99463816221806&q=Pyrgos&days=1&aqi=no&alerts=no')
  //   const data = res.json()
  //   return data
  // }

  // const getForecastFromApi = async (apiParam: linkProperties) => {
  //   const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
  //   const data = await res.json()
  //   return data
  // }
  
  // const getWeather = async (e: React.FormEvent<HTMLFormElement>) => {

  //   try {
  //     e.preventDefault()

  //     if (!apiParameters.cityOrLatLon) {
  //       alert("Enter a valid city!")
  //       return
  //     }

  //     const data: weatherType = await getWeatherFromApi(apiParameters)
  //     // const data2: forecastType = await getForecastFromApi(apiParameters)

  //     if (data.location.name === null) {
  //       alert("Enter a valid city!")
  //       return
  //     }


  //     setWeather(data)
  //     // setForecast(data2)

  //     setApiParameters({
  //       cityOrLatLon: "",
  //       days: 3,
  //       aqi: "no",
  //       alerts: "no"

  //     })

      
  //     // navigate("/city")

  //   } catch {
  //     alert("Enter a valid city!")
  //     setApiParameters({
  //       cityOrLatLon: "",
  //       days: 3,
  //       aqi: "no",
  //       alerts: "no"

  //     })

  //   }


  // }

  const getWindDir = (windDir?: string) => {
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

    return ''
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

    const index = [0, 1, 2]

    return (index.map((x) =>

      <ForecastDay forecast={weather?.forecast.forecastday[x]} day={getFormattedDay(exactDate.day + x) || ''}
        date={exactDate.date + x} />
    ))


  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ForecastCity weather={weather} getWeather={getWeather}
          getDayForecast={getDayForecast} getFormattedDate={getFormattedDate} getTime={getTime}
          getWindDir={getWindDir} apiParameters={apiParameters}
          setApiParameters={setApiParameters} findCity={cityLocation} />} />
        <Route path="/city" element={<ForecastCity weather={weather} getWeather={getWeather}
          getDayForecast={getDayForecast} getFormattedDate={getFormattedDate} getTime={getTime}
          getWindDir={getWindDir} apiParameters={apiParameters}
          setApiParameters={setApiParameters} findCity={getCityFromLocalStorage} />} />
      </Routes>
    </Router>)




  // <div className="main-container">
  //   <form className="main-container form1" onSubmit={getWeather}>
  //     <input placeholder="Enter city name" className="input1"
  //       value={apiParameters.cityOrLatLon} type="text" onChange={(e) => setApiParameters({ ...apiParameters, cityOrLatLon: e.target.value })}></input>
  //     <input type="submit" className="btn" value="Enter" />
  //   </form>
  //   <div className="weather-container">
  //     <div className="weather-container1">
  //       <div className="city-info city-time">
  //         <div>{weather?.location.name}, {weather?.location.region}, {weather?.location.country}</div>
  //         <div>{getFormattedDate()}</div>
  //         <div>{getTime()}</div>
  //       </div>
  //       <div className="city-info">
  //         <div className="weather-info" >
  //           <strong>The Weather right now</strong>
  //           <div className="temp">
  //             <div >{weather?.current.condition.text}</div>
  //             <img src={weather?.current.condition.icon} />
  //           </div>

  //           <div>Temperature: {weather?.current.temp_c} &deg; C</div>
  //           <div >Wind speed: {weather?.current.wind_kph} km/h</div>
  //           <div >Wind direction: {getWindDir(weather?.current.wind_dir)} </div>
  //           <div >Humidity: {weather?.current.humidity} %</div>
  //           <div>Pressure: {weather?.current.pressure_mb} millibars</div>
  //           <div> Precipitation: {weather?.current.precip_mm} mm</div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="weather-container2">
  //       <div className="weather-container3">
  //         {getDayForecast()}
  //       </div>
  //       <div className="weather-container3">

  //       </div>
  //     </div>
  //   </div>
  // </div>


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





export default App;
