import { useState, useEffect } from "react";
import { weatherType } from "../types-interfaces";

const getData = (key :string) => {
  const data = window.localStorage.getItem(key)

    try {
      if (data !== null) {
        return JSON.parse(data)
      }

    } catch {
      console.log("Couldn't get initial data!!!")
    }
}

export function useLocalStorage(key: string) {

  const [value, setValue] = useState(() => {
    getData(key)
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}