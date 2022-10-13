import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(newFilter)
    let copyList = []
    setNewFilter(event.target.value)
    countries.map(country =>{
    if (country.name.common.toLowerCase().includes(newFilter.toLowerCase())) {
      console.log(country.name.common)
      copyList = copyList.concat(country)
    }
    return null
    })
    setFilteredList(copyList)
  }

  const viewList = (list) => {
    console.log(list.length)
    if (list.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    if (list.length === 1) {
      const country = list[0]
      return(
        <div>
          <h2>{country.name.common}</h2>
          <p>captial {country.capital}</p>
          <p>area {country.area}</p>
          <p>population {country.population}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map(lang => <li>{lang}</li>)}
          </ul>
          <img src={country.flags.png} alt="new"/>
        </div>
      )
    }
    else {
      return list.map(country => <p>{country.name.common}</p>)
    }
  }

  return (
    <div>
      <form>
        <div>find countries <input value={newFilter} onChange={handleFilterChange} /></div>
      </form>
      {viewList(filteredList)}
    </div>
  )

}

export default App