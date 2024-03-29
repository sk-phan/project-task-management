const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

//Create user
userRouter.post('/', async (req, res, next) => {

    try {
        const { email, password } = req.body
        const saltRound = 10
        const passwordHash = await bcrypt.hash(password, saltRound)
    
        const newUser = await new User({ email, passwordHash })
    
        const savedUser = await newUser.save()

        const userForToken = {
            email: savedUser.email,
            id: savedUser._id
        }
        console.log(userForToken)
    
        const token = jwt.sign(userForToken, "sekret")
        
        res.status(201).json({token, ...userForToken})
    }
    catch(e) {
        console.log(e)
        if (e.code === 11000 && e.keyPattern && e.keyPattern.email === 1) {
            // This error code (11000) indicates a duplicate key error.
            // The keyPattern.email === 1 checks if the duplicate key is for the 'email' field.
            return res.status(400).json({ error: 'User with this email already exists.' });
        }
        next(e)
    }
})

userRouter.get('/', async (req, res, next) => {

    try {
       const users = await User.find({}).populate('projects')
       res.json(users)
    }
    catch(e) {
        next(e)
    }
})


module.exports = userRouter
