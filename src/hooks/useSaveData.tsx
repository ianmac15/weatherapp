import { useEffect, useState } from "react"


export function useSaveData(key: string, data: any) {

    const [value, setValue] = useState(data)
  
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
    }, [value])
  
    return value
  }