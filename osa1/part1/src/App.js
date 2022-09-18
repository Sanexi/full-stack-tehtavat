const Header = (courses) => {
  return (
    <div>
      <h1>{courses.course}</h1>
    </div>
  )
}

const Content = (content) => {
  return (
    <div>
      <p>
      <Part part={content.part1} exercise={content.ex1} />
      <Part part={content.part2} exercise={content.ex2} />
      <Part part={content.part3} exercise={content.ex3} />
      </p>
    </div>
  )
}

const Part = (content) => {
  return (
    <div>
      <p>
        {content.part} {content.exercise}
      </p>
    </div>
  )
}

const Total = (exer) => {
  return (
    <div>
      <p>Number of exercises {exer.part1 + exer.part2 + exer.part3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} ex1={exercises1} part2={part2} ex2={exercises2} part3={part3} ex3={exercises3} />
      <Total part1={exercises1} part2={exercises2} part3={exercises3} />
    </div>
  )
}

export default App