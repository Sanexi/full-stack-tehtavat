const blog = require('../models/blog')
const user = require('../models/user')
const resetRouter = require('express').Router()

resetRouter.post('/', async function(req, res) {
    await blog.deleteMany({})
    await user.deleteMany({})

    res.status(204).send('reset done')
})

module.exports = resetRouter