const taskRouter = require('express').Router();
const Project = require('../models/ProjectModel');
const Task = require('../models/TaskModel');

//Get all tasks
taskRouter.get('/:projectId', async(req, res, next) => {

    try {
        const project= req.params.projectId
    
        if (!project) {
            res.status(404).end()
        }
        
        const tasks = await Task.find({ project })
        res.json(tasks)
    }
    catch(e) {
        next(e)
    }
    
})

//Get single task
taskRouter.get('/:id', async(req, res, next) => {

    try {
        const id = req.params.id;

        const task = Task.findById(id)

        if (!task) {
            res.status(404).end()
        }

        res.json(task)
    }
    catch(e) {
        next(e)
    }
})


//Creae new task
taskRouter.post('/', async(req, res, next) => {

    try {
        const body = req.body;
        const projectId = body.project
    
        const task = new Task({
            name: body.name,
            dueDate: body.dueDate,
            status: body.status,
            project: projectId,
            user: req.user._id
        })
    
        const newTask =  await task.save()
       
        const project = await Project.findById(projectId)
        project.tasks = project.tasks.concat(newTask._id)
        await project.save()
    
        res.json(project)
    }
    catch(e) {
        next(e)
    }

})

//Update a task
taskRouter.put('/update/:id', async(req, res, next) => {

    try {
        const body = req.body;
        const id = req.params.id;
    
        if (!id) {
            res.status(404).end()
        }
        
        const updatedTask = await Task.findByIdAndUpdate(
                                        id, 
                                        body, 
                                        { new: true, runValidators: true, context: 'query' }
                                    )
        
        res.json(updatedTask)
    }
    catch(e){
        next(e)
    }
})

//Delete a task
taskRouter.delete('/delete/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
    
        if (!id) {
            res.status(404).end()
        }

        await Task.findByIdAndRemove(id)
        res.status(204).end()
    }
    catch(e) {
        next(e)
    }
})



module.exports = taskRouter;