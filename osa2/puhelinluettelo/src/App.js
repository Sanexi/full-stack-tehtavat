import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredList, setFilteredList] = useState([])

  const addName = (event) => {
    event.preventDefault()
    console.log(newName, newNumber)
    const nameList = persons.map(person => person.name)
    if (nameList.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
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
        return <p>{person.name} {person.number}</p>})}
    </div>
  )

}

export default App