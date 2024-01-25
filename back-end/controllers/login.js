const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/UserModel')

loginRouter.post('/', async (req,res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(userForToken, "sekret")
    
    res.status(200)
    .send({ token, ...userForToken })
})

module.exports = loginRouter