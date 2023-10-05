require('dotenv').config()

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const localMongoURI = "mongodb://localhost:27017/task-management";
const productionMongoURI = process.env.MONGODB_URI;

const MONGODB_URI = isProduction ? productionMongoURI : localMongoURI;

module.exports = {
  MONGODB_URI,
  PORT
}