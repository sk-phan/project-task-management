const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         dueDate:
 *           type: string  # Assuming you want to represent it as a string, adjust as needed
 *         status:
 *           type: string
 *           enum:
 *             - 'todo'
 *             - 'ongoing'
 *             - 'completed'
 *           default: 'todo'
 *         project:
 *           type: string  # Assuming you want to represent it as a string, adjust as needed
 *         user:
 *           type: string  # Assuming you want to represent it as a string, adjust as needed
 */

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    dueDate: {
        type: Date,
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