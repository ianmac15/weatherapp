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

const ForecastCity = () => {

    const [city, setCity] = useState('')
    const [url, setUrl] = useUrl(city)
    const initialData = useLoadData('weatherData')
    const [weather, setWeather] = useWeather(url, initialData)
    // const savedValue = useSaveData('weatherData', weather)
    // const [initialData] = useLocalStorage('weatherData', weather)
    const [dateAndTime, exactDate, threeDays, getFormattedDay, setDay] = useDateAndTime(weather)
    // const [styling] = usePhotos(weather)

    const numbers = [0, 1, 2]

    
    

    return (
        <div className="main-container">
            <form className="main-container form1" onSubmit={setWeather}>
                <input placeholder="Enter city name" className="input1"
                    value={city} type="text" onChange={(e) => { setCity(e.target.value); setUrl() }}></input>
                <input type="submit" className="btn" value="Enter" />
            </form>
            <div className="weather-container">
                <div className="weather-container1">
                    <div className="city-info city-time">
                        <div>{weather.location.name}, {weather.location.region}, {weather.location.country}</div>
                        <div>{dateAndTime.formattedDate}</div>
                        <div>{dateAndTime.formattedTime}</div>
                    </div>
                    <div className="city-info">
                        <div className="weather-info" >
                            <strong>The Weather right now</strong>
                            <div className="temp">
                                <div >{weather.current.condition.text}</div>
                                <img src={weather.current.condition.icon} />
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
                            <ForecastDay forecast={weather.forecast.forecastday[x]} day={threeDays.forecastList[x] || ''}
                                date={threeDays.forecastList2[x]} />
                        )}
                        
                    </div>
                    <div className="weather-container3">

                    </div>
                </div>
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
}

export default ForecastCity