const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
      <Part part={props.p1.name} exercise={props.p1.exercises} />
      <Part part={props.p2.name} exercise={props.p2.exercises} />
      <Part part={props.p3.name} exercise={props.p3.exercises} />
      </p>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.p1 + props.p2 + props.p3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total p1={part1.exercises} p2={part2.exercises} p3={part3.exercises} />
    </div>
  )
}

export default App