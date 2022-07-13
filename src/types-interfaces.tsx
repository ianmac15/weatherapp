export interface voidStringType {
  (param: void): string
}

export interface voidvoidType {
  (param: void): void
}

export interface numberString {
  (param: number): string
}

export interface stringString {
  (param?: string): string
}

export interface voidJSX {
  (param: void): JSX.Element[]
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

export interface locationInterface {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface currentInterface {
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

export interface forecastInterface {
  forecastday: forecastdayType[]
}

export interface weatherType {
  location: locationInterface
  current: currentInterface
  forecast: forecastInterface
}


export interface forecastdayType {

  date: string
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

export interface dateAndtimeInterface {
  formattedDate: string
  formattedTime: string
}

export interface stringNum {
  forecastList: string[]
  forecastList2: number[]
  month: string[]
}

export interface unsplashType {
  photos: [{
    tags: [{
      source: {
        cover_photo: {
          urls: {
            raw: string
          }
        }
      }
    }]
  }]
}

export interface photoInterface {
  urls: {
    raw: string
  }
}

export interface searchImage {
  results:[
    {
      urls:{
        raw: string
        full:string
      }
    }
  ]
  
}

export const initializeWeather = {
  location: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime_epoch: 0,
      localtime: ''
  },
  current: {
      last_updated_epoch: 0,
      last_updated: '',
      temp_c: 0,
      temp_f: 0,
      is_day: 0,
      condition: {
          text: '',
          icon: '',
          code: 0
      },
      wind_mph: 0,
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: '',
      pressure_mb: 0,
      pressure_in: 0,
      precip_mm: 0,
      precip_in: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      feelslike_f: 0,
      vis_km: 0,
      vis_miles: 0,
      uv: 0,
      gust_mph: 0,
      gust_kph: 0,
  },
  forecast: {
      forecastday: [{
          date: '',
          day: {
              maxtemp_c: 0,
              mintemp_c: 0,
              maxwind_kph: 0,
              totalprecip_mm: 0,
              avghumidity: 0,
              daily_chance_of_rain: 0,
              daily_chance_of_snow: 0,
              condition: {
                  text: '',
                  icon: ''
              }
          },

          astro: {
              sunrise: '',
              sunset: '',
              moonrise: '',
              moonset: '',
              moon_phase: '',
              moon_illumination: '',
          },
          hour: [{
              time: '',
              temp_c: 0,
              temp_f: 0,
              is_day: 0,
              condition: {
                  text: '',
                  icon: ''
              },
              wind_mph: 0,
              wind_kph: 0,
              wind_degree: 0,
              wind_dir: '',
              pressure_mb: 0,
              pressure_in: 0,
              precip_mm: 0,
              precip_in: 0,
              humidity: 0,
              cloud: 0,
              feelslike_c: 0,
              feelslike_f: 0,
              vis_km: 0,
              vis_miles: 0,
              uv: 0,
              gust_mph: 0,
              gust_kph: 0,
              windchill_c: 0,
              windchill_f: 0,
              heatindex_c: 0,
              heatindex_f: 0,
              dewpoint_c: 0,
              dewpoint_f: 0,
              will_it_rain: 0,
              chance_of_rain: 0,
              will_it_snow: 0,
              chance_of_snow: 0,
          }]
      }]
  }
}




