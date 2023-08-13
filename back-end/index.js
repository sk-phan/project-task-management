const logger = require('./utils/logger')
const app = require('./utils/app')
const config = require('./utils/config')

// Define your routes and middleware here

app.listen(config.PORT, '0.0.0.0', () => {
    console.log(`Server listening on ${config.PORT}`);
});