const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/UserModel')

//Create user
userRouter.post('/', async (req, res, next) => {

    try {
        const { email, password } = req.body
    
        const saltRound = 10
        const passwordHash = await bcrypt.hash(password, saltRound)
    
        const newUser = new User({ email, passwordHash })
    
        const savedUser = await newUser.save()
    
        res.status(201).json(savedUser)
    }
    catch(e) {
        next(e)
    }
})

module.exports = userRouter
