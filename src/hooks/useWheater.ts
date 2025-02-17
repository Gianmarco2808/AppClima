import axios from "axios"
import { z } from 'Zod'
// import { object, string, number, InferOutput, parse  } from 'valibot'
import { searchType } from "../types"
import { useMemo, useState } from "react"

const WeatherSchema = z.object({
     name: z.string(),
     main: z.object({
          temp: z.number(),
          temp_max: z.number(),
          temp_min: z.number(),
     })
})

const initialState = {
     name: '',
     main: {
          temp: 0,
          temp_max: 0,
          temp_min: 0
     }
}

export type Weather = z.infer<typeof WeatherSchema>

export default function useWeather() {

     const [weather, setWeather] = useState<Weather>(initialState)
     const [loading, setLoading] = useState(false)
     const [notFound, setNotFound] = useState(false)

     const fetchWeather = async ( search : searchType ) => {

          const apiKey = import.meta.env.VITE_API_KEY
          setLoading(true)
          setWeather(initialState)

          try {
               const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`
               const { data } = await axios.get(geoUrl)
               
               // comprobar
               if (!data[0]) {
                    setNotFound(true)
                    return
               }

               const lat = data[0].lat
               const lon = data[0].lon

               const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
               const {data: weatherData} = await axios.get(weatherUrl)

               //Zod
               const result = WeatherSchema.safeParse(weatherData)
               if (result.success) {
                    setWeather(result.data)
               }

          } catch (error) {
               console.log(error)
          } finally {
               setLoading(false)
          }
     }

     const hasWeatherData = useMemo( () => weather.name, [weather])

     return {
          weather,
          fetchWeather,
          hasWeatherData,
          loading,
          notFound
     }
}