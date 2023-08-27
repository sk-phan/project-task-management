const projectRouter = require('express').Router();
const Project = require("../models/ProjectModel");
const Task = require('../models/TaskModel');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')


projectRouter.get('/', async(req, res, next) => {

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const projects = await Project.find({ user: decodedToken.id })

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
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        
        const currentUser = await User.findById( decodedToken.id )

        const project = new Project({
            name,
            user: currentUser._id
        })

        const savedProject = await project.save()
        currentUser.projects = currentUser.projects.concat(savedProject._id)
        
        await currentUser.save()

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