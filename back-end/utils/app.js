const config = require('./config');
const logger = require('./logger')
const middleware = require('./middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API for learning Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/',
      },
    ],
  },
  apis: ['./controllers/*.js', './models/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);

app.use(middleware.tokenExtract);
app.use(middleware.userExtract)

app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

