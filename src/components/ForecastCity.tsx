import { useState } from 'react'
import { useDateAndTime } from '../hooks/useDateAndTime'
import { useLoadData } from '../hooks/useLoadData'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { usePhotos } from '../hooks/usePhotos'
import { useSaveData } from '../hooks/useSaveData'
import { useUrl } from '../hooks/useUrl'
import { useWeather } from '../hooks/useWeather'
import { getWindDir } from '../hooks/useWind'
import { weatherType } from '../types-interfaces'
import ForecastDay from './ForecastDay'
import { initializeWeather } from '../types-interfaces'
import { useGeoLocation } from '../hooks/useGeoLocation'

const ForecastCity = ({isHomePage}:properties) => {

    // const initialCity = useLoadData('cityData', 'pyrgos')
    
    const [geolocationWeather] = useGeoLocation()
    const [url, city, setUrl, createUrl, setCity] = useUrl()
    
    
    const [initialData, setInitialData] = useLoadData('weatherData', initializeWeather)
    if (isHomePage) {
        setInitialData(geolocationWeather)
    }
    const [weather, weatherCall, reloadWeather] = useWeather(url, initialData, setUrl, setCity)
    const [dateAndTime, exactDate, threeDays, getFormattedDay, setDay] = useDateAndTime(weather)


    const numbers = [0, 1, 2]




    return (
        <div className="main-container">
            <title>Weather Forecast</title>
            <form className="main-container form1" onSubmit={weatherCall}>
                <input placeholder="Enter city name" className="input1"
                    value={city} type="text" onChange={(e) => { createUrl(e.target.value) }}></input>
                <input type="submit" className="btn" value="Enter" />
            </form>
            <div className="weather-container">

                <div className="weather-container1">
                    <div className='btn-container'>
                        <form onSubmit={reloadWeather}>
                            <input type='submit' className='btn' value='Reload weather forecast'/>
                        </form>
                        {/* <button className='btn' onClick={reloadWeather}>Reload weather forecast</button> */}
                    </div>
                    <div className="city-info city-time">
                        <div>{weather.location.name}, {weather.location.region}, {weather.location.country}</div>
                        <div>{dateAndTime.formattedDate}</div>
                        {/* <div>{dateAndTime.formattedTime}</div> */}
                    </div>
                    <div className="city-info">
                        <div className="weather-info" >
                            <strong>The Weather right now</strong>
                            <div className="temp">
                                <div >{weather.current.condition.text}</div>
                                <img src={weather.current.condition.icon} className='weather-img'/>
                            </div>

                            <div>Temperature: {weather.current.temp_c} &deg; C</div>
                            <div >Wind speed: {weather.current.wind_kph} km/h</div>
                            <div >Wind direction: {getWindDir(weather.current.wind_dir)} </div>
                            <div >Humidity: {weather.current.humidity} %</div>
                            <div>Pressure: {weather.current.pressure_mb} millibars</div>
                            <div> Precipitation: {weather.current.precip_mm} mm</div>
                        </div>
                    </div>
                </div>
                <div className="weather-container2">
                    <div className="weather-container3">
                        {numbers.map((x) =>
                            <ForecastDay key={x} forecast={weather.forecast.forecastday[x]} day={threeDays.forecastList[x] || ''}
                                date={threeDays.forecastList2[x]} month={threeDays.month[x]}/>
                        )}

                    </div>
                    <div className="weather-container3">

                    </div>
                </div>
            </div>
            <div className='weather-container6'>

            </div>
        </div>
    )
}

interface properties {
    // weather?: weatherType
    // getWeather: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    // apiParameters: linkProperties
    // setApiParameters: React.Dispatch<React.SetStateAction<linkProperties>>
    // getFormattedDate: voidStringType
    // getTime: voidStringType
    // getWindDir: stringString
    // getDayForecast: voidJSX
    // findCity: voidvoidType
    isHomePage:boolean
}

export default ForecastCity