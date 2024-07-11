import styles from './App.module.css'
import { Alert } from './components/Alert/Alert'
import { Form } from './components/Form/Form'
import { Spinner } from './components/Spinner/Spinner'
import { WeatherDatail } from './components/WeatherDatail/WeatherDatail'
import useWeather from './hooks/useWheater'

function App() {

  const { weather, fetchWeather, hasWeatherData, loading, notFound } = useWeather()

  return (
    <>
        <h1 className={styles.title}>Buscador de clima</h1>  

        <div className={styles.container}>
            <Form
              fetchWeather={fetchWeather}
            />
            {loading && <Spinner />}
            {hasWeatherData && <WeatherDatail weather={weather} />}
            {notFound && <Alert>Ciudad no encontrada</Alert>}
        </div>   
    </>
  )
}

export default App
