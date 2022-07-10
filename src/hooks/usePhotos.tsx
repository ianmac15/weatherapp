import React, { useEffect, useState } from "react";
import { photoInterface, searchImage, unsplashType, weatherType } from "../types-interfaces";

const getData = () => {
  const data = window.localStorage.getItem('pictureData')

  try {
      if (data !== null) {
          return JSON.parse(data)
      }
  } catch {
      console.log("Couldn't get initial data!!!")
  }
}

export function usePhotos(weather: weatherType): [React.CSSProperties] {
  

  // function returnPhotos():searchImage {
  //   const getPics = async () => {
  //     const res: searchImage = await getPhotos()
  //     return res
  //   }
  
  //   return getPics()
    
  // }

  const url = `https://api.unsplash.com/search/photos?query=${weather.current.condition.text}&page=5&per_page=100&client_id=rVKv3MJTT8Wmh_hpTGLt1Si59eP0s1IGXDMv2xJb0zM`

  

  const getPhotos = async () => {
    const res = await fetch(url)
    const data = res.json()
    return data
  }

  // const returnObjFromPromise = (value: searchImage) => {
  //   return value
  // }

  const [photos, setPhotos] = useState<searchImage>(()=>getData()
    // () => returnPhotos()

    //   () => {
    //     const getPics = async () => {
    //         const res: searchImage = await getPhotos()
    //         setPhotos(res)
    //         return res
    //     }

    //     return getPics().then((value)=>{returnObjFromPromise(value)})

    // }
    // {results:[
    //     { 
    //       urls:{
    //         raw:"",
    //         full:"https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNDQ3OTV8MHwxfHNlYXJjaHw0NHx8d2VhdGhlcnxlbnwwfHx8fDE2NTczODEwNTU&ixlib=rb-1.2.1&q=80"
    //       }
    //     }
    //   ]
    // }
  )

  useEffect(() => {
    const getPics = async () => {
      const res: searchImage = await getPhotos()
      setPhotos(res)
    }

    getPics()
    console.log(photos)
    const random = Math.floor(Math.random() * 30)
    
    
    // setStyling({backgroundImage: photos["results"][random]["urls"]["full"]})
    setStyling({ backgroundImage: `url(${photos?.results[random].urls.full})` })

    console.log(photos?.results[random].urls.full)

    window.localStorage.setItem('pictureData', JSON.stringify(photos))
  },[weather])

  const [styling, setStyling] = useState<React.CSSProperties>({})

  


  return [styling]
}