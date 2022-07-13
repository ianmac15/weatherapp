import { forecastdayType } from "../types-interfaces"





const ForecastDay = ({ forecast, day, date, month }: properties) => {

  const editDay = (word: string) => {
    return word[0] + word[1] + word[2]
  }

  return (

    <div className="weather-container4">
      <div className="weather-container5">
        <div style={{ "padding": "1rem" }}>{day}</div>
        <div>{date + '     ' + month}</div>
      </div>
      <div className="weather-container5">
        <div>{forecast?.day.condition.text}</div>
        <img src={forecast?.day.condition.icon} className='weather-img'/>
      </div>
      <div>
        <div>Min temperature: {forecast?.day.mintemp_c} &deg; C</div>
        <div>Max temperature: {forecast?.day.maxtemp_c} &deg; C</div>
      </div>
      <div>Max wind: {forecast?.day.maxwind_kph} km/h</div>
      <div>
        <div>Total rain: {forecast?.day.totalprecip_mm} mm</div>
        <div>Average humidity: {forecast?.day.avghumidity} %</div>
      </div>
      <div>
        <div>Sunrise: {forecast?.astro.sunrise}</div>
        <div>Sunset: {forecast?.astro.sunset}</div>
      </div>
    </div>
  )
}


interface properties {
  forecast: forecastdayType | undefined
  day: string
  date: number
  month: string
}


export default ForecastDay