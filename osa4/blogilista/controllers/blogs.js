const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = request => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const token = getToken(request)
    const blog = new Blog(request.body)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id){
            return response.status(401).send({error: 'token missing or invalid'})
        }
        const user = await User.findById(decodedToken.id)
        blog.user = user
        const result = await blog.save()
        user.blogs = user.blogs.concat(result)
        await user.save()
        response.status(201).json(result)
    } catch (error) {
        if (error.name === 'JsonWebTokenError'){
            return response.status(401).send({error: 'token missing or invalid'})
          }
          next(error) 
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    } catch (error) {
        next(error)
    }
  })

module.exports = blogsRouter
