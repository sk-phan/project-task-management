require('dotenv').config()

const PORT = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';
const localMongoURI = "mongodb://localhost:27017/task-management";
const productionMongoURI = process.env.MONGODB_URI;

const MONGODB_URI =  productionMongoURI ;

module.exports = {
  MONGODB_URI,
  PORT
}