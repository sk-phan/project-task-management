const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: [ 'todo', 'ongoing', 'completed' ],
        default: 'todo'
    },
    project: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        }
    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

taskSchema.set('toJSON', {
    transform: ( document, returnedObject ) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;