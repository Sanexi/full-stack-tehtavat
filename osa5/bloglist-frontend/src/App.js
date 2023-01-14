import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogsData, setBlogsData] = useState([])
  const [usernameData, setUsernameData] = useState('')
  const [passwordData, setPasswordData] = useState('')
  const [errorData, setErrorData] = useState('')
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    fetchBlogs()
  }, [])
  
  useEffect(() => {
    const logged = window.localStorage.getItem('logged')
    if (logged){
      const user = JSON.parse(logged)
      setUserData(user)
      blogService.setToken(user.token)
    } else {
      setUserData(null)
    }
  }, [])

  const fetchBlogs = (async () => {
    const blogs = await blogService.getAll()
    setBlogsData(blogs)
  })

  const handleSignIn = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({usernameData, passwordData})
      window.localStorage.setItem(
        'logged', JSON.stringify(user) 
      )
      blogService.setToken(user.token)
      setUserData(user)
      setUsernameData('')
      setPasswordData('')
      setErrorData(`User ${usernameData} logged in`)
      setTimeout(() => {
        setErrorData('')
      }, 2000);
    } catch (exception){
      setErrorData('Incorrect username or password')
      setTimeout(() => {
        setErrorData('')
      }, 4000);
    }
  }

  const handleSignOut = () => {
    window.localStorage.removeItem('logged')
    blogService.removeToken()
    setErrorData(`User logged out`)
    setTimeout(() => {
      setErrorData('')
    }, 2000);
  }

  const loginForm = () => (
    <form onSubmit={handleSignIn}>
    <div>
      username 
      <input type="text" value={usernameData} name="Username" onChange={({target}) => setUsernameData(target.value)}/>
    </div>
    <div>
      password: 
      <input type="password" value={passwordData} name="Password" onChange={({target}) => setPasswordData(target.value)}/>
    </div>
    <button type="submit">login</button>
  </form>
  )

  const logOutForm = () => (
    <form onSubmit={handleSignOut}>
    <div>
    <button type="submit">logout</button>
    </div>
    </form>
  )

  if (userData === null){
    return (
      <div>
        <h2>blogs</h2>
        <Notification message = {errorData}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message = {errorData}/>
      <div>
        <p>{userData.name} logged in </p>
        {logOutForm()}
        {CreateBlogForm()}
      </div>
      {blogsData.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
