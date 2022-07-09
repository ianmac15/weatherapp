import React, { useEffect, useState } from "react";
import { photoInterface, searchImage, unsplashType, weatherType } from "../types-interfaces";

export function usePhotos(weather: weatherType): [searchImage, React.CSSProperties] {


    const url = 'https://api.unsplash.com/search/photos?query=weather&page=5&per_page=10&client_id=rVKv3MJTT8Wmh_hpTGLt1Si59eP0s1IGXDMv2xJb0zM'

    const getPhotos = async () => {
        const res = await fetch(url)
        const data = res.json()
        return data
    }

    const [photos, setPhotos] = useState<searchImage>(
        {results:[
            {
              urls:{
                full:"https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNDQ3OTV8MHwxfHNlYXJjaHw0NHx8d2VhdGhlcnxlbnwwfHx8fDE2NTczODEwNTU&ixlib=rb-1.2.1&q=80"
              }
            }
          ]
        }
    )

    const [styling, setStyling] = useState<React.CSSProperties>({backgroundImage:"https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNDQ3OTV8MHwxfHNlYXJjaHw0NHx8d2VhdGhlcnxlbnwwfHx8fDE2NTczODEwNTU&ixlib=rb-1.2.1&q=80"})

    useEffect(() => {
        const getPics = async () => {
            const res: searchImage = await getPhotos()
            setPhotos(res)
        }

        getPics()

        const random = Math.round(Math.random()*100)

        setStyling({backgroundImage: photos.results[random].urls.full})

        console.log(photos.results[random].urls.full)
    }, [weather])


    return [photos, styling]
}