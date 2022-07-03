export interface voidStringType {
  (param: void): string
}

export interface voidvoidType {
  (param:void):void
}

export interface numberString {
  (param: number): string
}

export interface stringString {
  (param?: string):string
}

export interface voidJSX {
  (param:void):JSX.Element[]
}

export interface geolocationType {
  country_code: string
  country_name: string
  city: string
  postal: string
  latitude: string
  longitude: string
  IP: string
  state: string
}

export interface linkProperties {
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

export interface dateType {
  day: number
  date: number
  month: number
  year: number
  hours: number
  minutes: number
  seconds: number
}

// export interface geolocationType {
//   query: string
//   status: string
//   country: string
//   countryCode: string
//   region: string
//   regionName: string
//   city: string
//   zip: string
//   lat: number
//   lon: number
//   timezone: string
//   isp: string
//   org: string
//   as: string
// }




