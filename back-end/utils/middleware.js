const User = require('../models/UserModel')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error })
    }
    
    next(error)
}

const tokenExtract = (request, response, next) => {

    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '');
    }
    else {
        return response.status(401).json({ error: 'Token is missing or invalid' });
    }

    next()
}



const userExtract = async (request, response, next) => {

    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '');
        const decodedToken = await jwt.verify( token, 'sekret' )

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }

        const user = await User.findById(decodedToken.id)

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        request.user = user

    }
    next()

}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtract,
    userExtract
}