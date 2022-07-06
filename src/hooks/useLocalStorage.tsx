import { useState } from "react";

export function useLocalStorage() {

    const [data, setData] = useState()

    useEffect(() => {

        const data = window.localStorage.getItem('weatherData')
    
        try {
          if (data !== null) {
            setWeather(JSON.parse(data))
          }
    
    
    
        } catch {
          console.log("Couldn't get initial data!!!")
        }
    
      }, [])
    
      useEffect(() => {
        window.localStorage.setItem('weatherData', JSON.stringify(weather))
      }, [weather])

}