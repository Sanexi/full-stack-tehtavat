const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  console.log(props)
  const p1 = props.parts[0]
  const p2 = props.parts[1]
  const p3 = props.parts[2]
  console.log(p1)
  return (
    <div>
      <p>
      <Part part={p1.name} exercise={p1.exercises} />
      <Part part={p2.name} exercise={p2.exercises} />
      <Part part={p3.name} exercise={p3.exercises} />
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
  const p1 = props.parts[0]
  const p2 = props.parts[1]
  const p3 = props.parts[2]
  console.log(p1)
  return (
    <div>
      <p>Number of exercises {p1.exercises + p2.exercises + p3.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App