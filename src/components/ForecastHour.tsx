import ForecastDay from "./ForecastDay"


const ForecastHour = () => {


    return (
        <div className="weather-info" >
            <strong>The Weather right now</strong>
            <div className="temp">
                <div >{weather.current.condition.text}</div>
                <img src={weather.current.condition.icon} className='weather-img' />
            </div>

            <div>Temperature: {weather.current.temp_c} &deg; C</div>
            <div >Wind speed: {weather.current.wind_kph} km/h</div>
            <div >Wind direction: {getWindDir(weather.current.wind_dir)} </div>
            <div >Humidity: {weather.current.humidity} %</div>
            <div>Pressure: {weather.current.pressure_mb} millibars</div>
            <div> Precipitation: {weather.current.precip_mm} mm</div>
        </div>
    )
}

export default ForecastHour