const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body)
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
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
