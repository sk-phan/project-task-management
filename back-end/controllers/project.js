const projectRouter = require('express').Router();
const Project = require("../models/ProjectModel");
const Task = require('../models/TaskModel');


projectRouter.get('/', async(req, res, next) => {

    try {
        const user = req.user._id
        const projects = await Project.find({ user }).populate('task')

        res.json(projects)
    }
    catch(e) {
        next(e)
    }
})

projectRouter.get('/:id', async (req, res, next) => {

    const id = req.params.id;

    Project.findById(id)
    .then(project => {
        if (project) {
            res.json(project);
        }
        else {
            res.status(404).end();
        }
    })
    .catch(error => next(error))
})

projectRouter.post('/', async (req, res, next) => {

    try {
        const { name } = req.body;
        const user = req.user;

        const project = new Project({
            name,
            user: user._id
        })

        const savedProject = await project.save()
        user.projects = user.projects.concat(savedProject._id)
        
        await user.save()

        res.status(201).json(savedProject)
    }
    catch(error) {
        next(error)
    };
});

projectRouter.put('/update/:id', async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    const project = await Project.findById(id);

    if (!project) {
        return res.status(404);
    }

    Project.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true, context: 'query' }    
    )
    .then(updatedProject => {
        res.json(updatedProject)
    })
    .catch(error => next(error));

    res.json(editedProject);
});

projectRouter.delete('/delete/:id', async (req, res, next) => {

    try {
        const id = req.params.id;
        
        if (id) {
            await Task.deleteMany({ projectId: id });
            await Project.findByIdAndRemove(id);
            res.status(204).end()
        }
        else {
            res.status(404).end()
        }
    }
    catch(e) {
        next(e)
    }

})



module.exports = projectRouter;