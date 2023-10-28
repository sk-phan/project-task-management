const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - email
 *          - passwordHash
 *       properties:
 *         email:
 *           type: string
 *           default: test.suki@example.com
 *         passwordHash:
 *           type: string 
 *           default: Password123@
 *         projects:
 *           type: string
 */

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
    
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject._id;
        delete returnedObject.__v;

        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;