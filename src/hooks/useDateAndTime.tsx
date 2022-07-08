import { useEffect, useState } from "react";
import { dateAndtimeInterface, dateType } from "../types-interfaces";


export function useDateAndTime() {

    const [DateAndTime, setDateAndTime] = useState<dateAndtimeInterface>({formattedDate:'', formattedTime:''})

    const [exactDate, setExactDate] = useState<dateType>({
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })


    useEffect(() => {
        const date = new Date()
        setExactDate({
            ...exactDate,
            day: date.getDay(),
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        })

    }, [exactDate])

    const getFormattedDay = (day: number) => {
        // switch (new Date().getDay()) {
        switch (day) {
          case 0:
            return "Sunday"
          case 1:
            return "Monday"
          case 2:
            return "Tuesday"
          case 3:
            return "Wednesday"
          case 4:
            return "Thursday"
          case 5:
            return "Friday"
          case 6:
            return "Saturday"
        }
      }
    
      const getFormattedMonth = () => {
        // switch (new Date().getMonth()) {
        switch (exactDate.month) {
          case 0:
            return "January"
          case 1:
            return "February"
          case 2:
            return "March"
          case 3:
            return "April"
          case 4:
            return "May"
          case 5:
            return "June"
          case 6:
            return "July"
          case 7:
            return "Augoust"
          case 8:
            return "September"
          case 9:
            return "October"
          case 10:
            return "November"
          case 11:
            return "December"
        }
      }
      
      const getFormatedDateAndTime = () => {
        setDateAndTime({...DateAndTime,formattedDate:getFormattedDate(), formattedTime: getTime()})
      }

      const getFormattedDate = () => {
        // const date = new Date()
        return getFormattedDay(exactDate.day) + " " + exactDate.date + " " + " " + getFormattedMonth() + " " + exactDate.year
      }

      const getTime = () => {
        // const date = new Date()
        // const hours = date.getHours()
        const hours = exactDate.hours
        let stringHours = "" + hours
        if (hours < 10) {
          stringHours = "0" + stringHours
        }
        // const minutes = date.getMinutes()
        const minutes = exactDate.minutes
        let stringMins = "" + minutes
        if (minutes < 10) {
          stringMins = "0" + stringMins
        }
        // const seconds = date.getSeconds()
        const seconds = exactDate.seconds
        let stringSecs = "" + seconds
        if (seconds < 10) {
          stringSecs = "0" + stringSecs
        }
        return stringHours + ":" + stringMins + ":" + stringSecs
      }

      return [DateAndTime, getFormatedDateAndTime]
}