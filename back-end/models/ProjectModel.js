const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

projectSchema.set('toJSON', {
    transform: ( document, returnedObject ) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 