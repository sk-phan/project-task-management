const projectRouter = require('express').Router();
const Project = require("../models/ProjectModel");
const Task = require('../models/TaskModel');

// controllers/project.js

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get all projects
 *     description: Retrieve a list of all projects
 *     responses:
 *       '200':
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */


projectRouter.get('/', async(req, res, next) => {

    try {
        const user = req.user
        const projects = await Project.find({ user: user._id })

        res.json(projects)
    }
    catch(e) {
        next(e)
    }
})

projectRouter.get('/:id', async (req, res, next) => {

    try {

        const projectId = req.params.id;
        
        if (!projectId) {
            res.status(404).end()
        }
        
        const project = await Project.findById(projectId)

        res.json(project)

    }
    catch(e) {
        next(e)
    }
})

projectRouter.post('/', async (req, res, next) => {

    try {
        const { name } = req.body
        
        const currentUser = req.user

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
    try {
        const body = req.body;
        const id = req.params.id;
    
        const project = await Project.findById(id);
    
        if (!project) {
            return res.status(404);
        }
    
        const updatedProject = await Project.findByIdAndUpdate( 
                                        id,
                                        body,
                                        { new: true, runValidators: true, context: 'query' }    
                                    )
    
        res.json(updatedProject);
    }
    catch(e) {
        next(e)
    }
});


projectRouter.delete('/delete/:id', async (req, res, next) => {

    try {
        const id = req.params.id;
        
        if (id) {
            await Task.deleteMany({ project: id });
            await Project.findByIdAndRemove(id);
            res.status(204).send()
        }
        else {
            res.status(404).send()
        }
    }
    catch(e) {
        next(e)
    }

})



module.exports = projectRouter;