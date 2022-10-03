import { useState } from 'react'

const StatisticLine = props => <tr><td>{props.name}</td> <td>{props.value}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>
  }
  return(
  <table>
    <tbody>
    <StatisticLine name={"good"} value={good} />
    <StatisticLine name={"neutral"} value={neutral} />
    <StatisticLine name={"bad"} value={bad} />
    <StatisticLine name={"all"} value={good + neutral + bad} />
    <StatisticLine name={"average"} value={(good + bad*(-1))/(good + neutral + bad)} />
    <StatisticLine name={"positive"} value={(good/(good + neutral + bad))*100} />
    </tbody>
  </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    console.log('Good:', newValue)
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    console.log('Neutral:', newValue)
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    console.log('Bad:', newValue)
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="netural" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

export default App