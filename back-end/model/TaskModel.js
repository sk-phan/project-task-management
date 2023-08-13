const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;