import { useState } from "react";


function App() {

  const [location, setLocation] = useState<locationType>()
  const [current, setCurrent] = useState<currentType>()





  return (
    <div className="main-container">
      <form className="main-container form1">
        <input placeholder="Enter city name......or..... Enter longitude and latitude" className="input1" />
      </form>
      <div className="city-info">
        <div>{location?.name}</div>
        <div>{current?.last_updated}</div>
        <div className="weather-info">Weather info</div>
      </div>
    </div>

  );
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

export default App;
