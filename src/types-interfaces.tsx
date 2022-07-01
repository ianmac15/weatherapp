export interface voidStringType {
    (param:void):string
}

export interface numberString {
    (param:number):string
}

export interface geolocationType {
  query: string
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
}




