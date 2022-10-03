import { useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

  const setToSelected = newInteger => {
    console.log('New integer:', newInteger)
    setSelected(newInteger)
  }

  const setToVotes = () => {
    const copy = [...votes]
    copy[selected] += 1   
    console.log('Current points:', copy[selected])
    setVotes(copy)
  }

  
  let largestIndex = -1
  let largestValue = -Infinity
  for (let i = 0; i < votes.length; i++) {
    if (largestValue < votes[i] ) {
      largestIndex = i
      largestValue = votes[i]
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <button onClick={() => setToVotes()}>
      vote
      </button>

      <button onClick={() => setToSelected(getRandomInt(0, 7))}>
      next anecdote
      </button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[largestIndex]}<br/>
      Has {largestValue} votes
    </div>
  )
}

export default App
