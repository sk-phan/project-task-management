const taskRouter = require('express').Router();
const Task = require('../models/TaskModel');

//Get all tasks
taskRouter.get('/', async(req, res, next) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(error => next(error))
})

//Get single task
taskRouter.get('/:id', async(req, res, next) => {

    const id = req.params.id;

    Task.findById(id)
    .then(task => {
        if (task) {
            res.json(task)
        }
        else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

//Get tasks by project id
taskRouter.get('/project/:projectId', async(req, res, next) => {
    const projectId = req.params.projectId;

    Task.find({ projectId })
    .then(task => {
        if (task) {
            res.json(task)
        }
        else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

//Creae new task
taskRouter.post('/', async(req, res, next) => {
    const body = req.body;

    const newTask = new Task({
        name: body.name,
        dueDate: body.dueDate,
        status: body.status,
        projectId: body.projectId
    })

    newTask.save()
    .then(task => res.json(task))
    .catch(error => next(error))
})

//Update a task
taskRouter.put('/update/:id', async(req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    Task.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
    .then(updatedTask => res.json(updatedTask))
    .catch(error => next(error))

})

//Delete a task
taskRouter.put('/delete/:id', async(req, res, next) => {
    const id = req.params.id;

    if (id) {
        Task.findByIdAndRemove(id)
        .then(() => res.status(204).end)
        .catch(error => next(error))
    }
    else {
        res.status(404).end()
    }

})



module.exports = taskRouter;