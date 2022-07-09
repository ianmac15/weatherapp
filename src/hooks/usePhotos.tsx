import { useEffect, useState } from "react";
import { unsplashType } from "../types-interfaces";

export function usePhotos() {

    const url = 'https://api.unsplash.com/collections?id=8240068&page=1&query=weather&client_id=rVKv3MJTT8Wmh_hpTGLt1Si59eP0s1IGXDMv2xJb0zM'

    const getPhotos = async () => {
        const res = await fetch(url)
        const data = res.json()
        return data
    }

    const [photos, setPhotos] = useState<unsplashType>(() => {

        
        const getPics = async () => {
            const res = await getPhotos()
            
            // let result = await getPics().resolve((value)=>{
            //     return value
            // })

            return res
            
        }
        // const value = getPics().then(

        // )
        
        return data
    })



    return photos
}