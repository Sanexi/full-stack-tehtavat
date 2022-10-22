import { useState, useEffect } from 'react'
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    personService.getPersons()
    .then(persons => {setPersons(persons)})
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log(newName, newNumber)
    const nameList = persons.map(person => person.name)
    if (nameList.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      personService.addPerson({name: newName, number: newNumber})
    }
  }

  const deleteName = (person) => {
    if (window.confirm("Delete", person.name, "?")) {
      setPersons(persons.filter(person => {
        return person !== {name: newName, number: newNumber}
      }))
      personService.deletePerson(person.id)
    }
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(newFilter)
    setNewFilter(event.target.value)
    setFilteredList(persons.map(person =>{
      if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
        return person
      }
      else {
        return null
      }
      }))
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredList.map(person => {
        if (person === null) {
          return null
        }
        return <div>{person.name} {person.number} <button value={person} onClick={deleteName}>delete</button></div>})}
    </div>
  )

}

export default App