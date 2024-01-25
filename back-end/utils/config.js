require('dotenv').config()

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const localMongoURI = "mongodb://localhost:27017/task-management";
const productionMongoURI = "mongodb+srv://sukiphan97:Nhung1967@cluster0.syysth0.mongodb.net/?retryWrites=true&w=majority";


const MONGODB_URI = productionMongoURI;

module.exports = {
  MONGODB_URI,
  PORT
}