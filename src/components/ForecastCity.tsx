import { useEffect } from 'react'
import { geolocationType, dateType, forecastdayType, numberString, linkProperties, weatherType, voidvoidType, voidStringType, stringString, voidJSX } from '../types-interfaces'

const ForecastCity = ({ weather, getWeather, apiParameters, setApiParameters,
    getFormattedDate, getTime, getWindDir, getDayForecast, findCity }: properties) => {

    useEffect(findCity, [])

    // useEffect(() => {
    //     window.localStorage.setItem('weatherData', JSON.stringify(weather))
    // }, [weather])

    useEffect(() => {
        window.localStorage.setItem('cityData', JSON.stringify(apiParameters.cityOrLatLon))
    }, [apiParameters.cityOrLatLon])

    return (
        <div className="main-container">
            <form className="main-container form1" onSubmit={getWeather}>
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
    )
}

interface properties {
    weather?: weatherType
    getWeather: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    apiParameters: linkProperties
    setApiParameters: React.Dispatch<React.SetStateAction<linkProperties>>
    getFormattedDate: voidStringType
    getTime: voidStringType
    getWindDir: stringString
    getDayForecast: voidJSX
    findCity: voidvoidType
}

export default ForecastCity