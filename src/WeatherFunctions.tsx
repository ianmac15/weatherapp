import { geolocationType, dateType, linkProperties, weatherType, voidStringType } from "./types-interfaces"

export const cityLocation = (setGeolocation:React.Dispatch<React.SetStateAction<geolocationType>>,
     geolocation:geolocationType, apiParameters: linkProperties, setApiParameters: React.Dispatch<React.SetStateAction<linkProperties>>,
     setWeather: React.Dispatch<React.SetStateAction<weatherType | undefined>>) => {
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
  }

  export const getWeatherFromLocalStorage = (setWeather:React.Dispatch<React.SetStateAction<weatherType | undefined>>) => {
    const data = window.localStorage.getItem('weatherData')

    try {
      if (data !== null) {
        setWeather(JSON.parse(data))
      }
    } catch {
      console.log("Couldn't get initial data!!!")
    }
  }

  export const getCityFromLocalStorage = (apiParameters: linkProperties, setApiParameters: React.Dispatch<React.SetStateAction<linkProperties>>) => {
    const data = window.localStorage.getItem('cityData')

    try {
      if (data !== null) {
        setApiParameters({...apiParameters,cityOrLatLon:JSON.parse(data)})
      }
    } catch {
      console.log("Couldn't get initial data!!!")
    }
  }


  export const getGeolocation = async () => {
    // const res = await fetch('http://ip-api.com/json/')
    const res = await fetch('https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708')
    const data = res.json()
    return data
  }


  export const getWeatherFromApi = async (apiParam: linkProperties) => {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    // const res = await fetch(`http://api.weatherapi.com/v1/weather.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    // const res = await fetch('http://api.weatherapi.com/v1/weather.json?key=7000cd0d3d2c419b99463816221806&q=Pyrgos&days=1&aqi=no&alerts=no')
    const data = res.json()
    return data
  }

  export const getForecastFromApi = async (apiParam: linkProperties) => {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7000cd0d3d2c419b99463816221806&q=${apiParam.cityOrLatLon}&days=${apiParam.days}&aqi=${apiParam.aqi}&alerts=${apiParam.alerts}`)
    const data = await res.json()
    return data
  }
  
  export const getWeather = async (e: React.FormEvent<HTMLFormElement>, apiParameters:linkProperties,
    setWeather: React.Dispatch<React.SetStateAction<weatherType | undefined>>, setApiParameters: React.Dispatch<React.SetStateAction<linkProperties>>) => {

    try {
      e.preventDefault()

      if (!apiParameters.cityOrLatLon) {
        alert("Enter a valid city!")
        return
      }

      const data: weatherType = await getWeatherFromApi(apiParameters)
      // const data2: forecastType = await getForecastFromApi(apiParameters)

      if (data.location.name === null) {
        alert("Enter a valid city!")
        return
      }


      setWeather(data)
      // setForecast(data2)

      setApiParameters({
        cityOrLatLon: "",
        days: 3,
        aqi: "no",
        alerts: "no"

      })

      
      // navigate("/city")

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

  export const getWindDir = (windDir?: string) => {
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

  export const getFormattedDay = (day: number) => {
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

  export const getFormattedMonth = (exactDate:dateType) => {
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

  export const getFormattedDate = (exactDate:dateType, getFormattedMonth:voidStringType) => {
    // const date = new Date()
    return getFormattedDay(exactDate.day) + " " + exactDate.date + " " + " " + getFormattedMonth() + " " + exactDate.year
  }

  export const getTime = (exactDate:dateType) => {
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