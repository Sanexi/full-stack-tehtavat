import React from 'react'

const Header = (props) => {
    console.log(props)
    return <h1>{props.course}</h1>
}
  
const Content = ({parts}) => {
    console.log(parts)
    return (
        <div>
        <ul>
            {parts.map((parts, i) => 
            <li key={i}>
                <Part part={parts.name} exercise={parts.exercises} />
            </li>
            )}
        </ul>
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

const Total = ({parts}) => {
    const mapped = parts.map(part => part.exercises)
    console.log(mapped)
    const total = mapped.reduce( (s, p) => {return s+p})
    console.log(total)
    return (
        <div>
        <p>Number of exercises {total}</p>
        </div>
    )
}

const Course = ({course}) => {
  return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
    </div>
  )
}

export default Course
