const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *         user:
 *           type: string
 */

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