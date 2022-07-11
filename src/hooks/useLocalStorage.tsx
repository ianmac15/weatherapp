import { useState, useEffect } from "react";
import { weatherType } from "../types-interfaces";

const getData = (key :string, initialValue: any) => {
  const data = window.localStorage.getItem(key)

    try {
      if (data !== null) {
        return JSON.parse(data)
      }

      return initialValue

    } catch {
      console.log("Couldn't get initial data!!!")
    }
}

export function useLocalStorage(key: string, initialValue: any) {

  const [value, setValue] = useState(() => {
    getData(key, initialValue)
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}