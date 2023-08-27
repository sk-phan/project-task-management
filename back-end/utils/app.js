const config = require('./config');
const logger = require('./logger')
const middleware = require('./middleware');

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const projectRouter = require('../controllers/project');
const taskRouter = require('../controllers/task');
const userRouter = require('../controllers/user');
const loginRouter = require('../controllers/login');

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtract);

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

