import { useState } from "react";

export function useGeoLocation() {

    const [geolocation, setGeolocation] = useState(
        {
            country_code: "",
            country_name: "",
            city: "Athens",
            postal: "",
            latitude: "",
            longitude: "",
            IP: "",
            state: ""
          }
    )

    const getGeolocation = async () => {
        // const res = await fetch('http://ip-api.com/json/')
        const res = await fetch('https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708')
        const data = res.json()
        return data
      }

      

}