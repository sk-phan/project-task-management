const taskRouter = require('express').Router();
const Task = require('../model/TaskModel');

taskRouter.get('/', async(req, res, next) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(error => next(error))
})

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
    .catch(error => console.log(error))
})

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
    .catch(error => console.log(error))
})

module.exports = taskRouter;