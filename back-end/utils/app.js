const config = require('./config');
const logger = require('./logger')

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const projectRouter = require('../controllers/project');

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

app.use('/api/projects', projectRouter);
module.exports = app;

