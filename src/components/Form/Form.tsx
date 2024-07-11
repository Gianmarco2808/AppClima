import { ChangeEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from './Form.module.css'
import { searchType } from "../../types"
import { Alert } from "../Alert/Alert"

type FormTypesProps = {
     fetchWeather: (search: searchType) => Promise<void>
}

export const Form = ({ fetchWeather } : FormTypesProps) => {

     const [search, setSearch] = useState<searchType>({
          city: '',
          country: ''
     })

     const [alert, setAlert] = useState('')

     const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
          setSearch({
               ...search,
               [e.target.name] : e.target.value
          })
     }

     const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
          e.preventDefault()

          if (Object.values(search).includes('')) {
               setAlert('todos los campos son obligatorios')
               return
          }

          fetchWeather(search)
     }

  return (

          <form 
                    className={styles.form}
                    onSubmit={handleSubmit}
               >

                    {alert && <Alert>{alert}</Alert>}
                    <div className={styles.field}>
                         <label htmlFor="city">Ciudad</label>
                         <input 
                              type="text"
                              id="city"
                              name="city"
                              placeholder="Ciudad"
                              value={search.city}
                              onChange={handleChange}
                         />
                    </div>

                    <div className={styles.field}>
                         <label htmlFor="country">Pais</label>
                         <select
                              id="country"
                              value={search.country}
                              name="country"
                              onChange={handleChange}
                         >
                              <option value=""> --Seleccione un pais-- </option>
                              {countries.map( country => (
                                   <option 
                                        key={country.code}
                                        value={country.code}
                                   >
                                        {country.name}
                                   </option>
                              ))}
                         </select>
                    </div>

                    <input type="submit"
                         value='Consultar clima'
                         className={styles.submit}
                    />

          </form>
  )
}
