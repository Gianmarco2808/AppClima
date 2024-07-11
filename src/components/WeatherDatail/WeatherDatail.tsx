import { Weather } from "../../hooks/useWheater"
import { FormatTemperature } from "../../utils"
import styles from './WeatherDatail.module.css'

type WeatherDatailProps = {
     weather: Weather
}

export const WeatherDatail = ({weather}: WeatherDatailProps) => {


  return (
      <div className={styles.container}>
            <h2>Clima de: {weather.name}</h2>
            <p className={styles.current}>{FormatTemperature(weather.main.temp)}&deg;C</p>
            <div className={styles.temperatures}>
                <p>Min: <span>{FormatTemperature(weather.main.temp_min)}&deg;C</span></p>
                <p>Max: <span>{FormatTemperature(weather.main.temp_max)}&deg;C</span></p>
            </div>
      </div>
  )
}
