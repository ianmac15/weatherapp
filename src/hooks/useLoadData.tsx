import { useState, useEffect } from "react";
import { weatherType } from "../types-interfaces";

const getData = (key: string, initialValue?: any) => {
  const data = window.localStorage.getItem(key)

  try {
    if (data !== null) {
      return JSON.parse(data)
    }

    return initialValue

  } catch {
    console.log("Couldn't get initial data!!!")
    return initialValue
  }
}

export function useLoadData(key: string, initialValue?: any) {

  const [value, setValue] = useState(() =>
    getData(key, initialValue)
  )

  return value
}