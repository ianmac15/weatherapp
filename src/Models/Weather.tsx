import {currentInterface, forecastInterface, locationInterface, weatherType} from '../types-interfaces'

export class Weather implements weatherType{

    readonly location: locationInterface
    readonly current: currentInterface
    readonly forecast: forecastInterface

    constructor(location: locationInterface, current: currentInterface, forecast: forecastInterface) {
        this.location = location
        this.current = current
        this.forecast = forecast
    }

    
    

     
}
