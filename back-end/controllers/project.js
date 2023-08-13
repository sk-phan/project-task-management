const projectRouter = require('express').Router();
const Project = require("../model/ProjectModel");


projectRouter.get('/', (req, res) => {
    Project.find()
    .then(project => res.json(project))
})

projectRouter.get('/:id', async (req, res, next) => {

    const id = req.params.id;

    Project.findById(id)
    .then(project => {
        if (project) {
            res.json(project);
        }
        else {
            res.status(404);
        }
    })
})

projectRouter.post('/', async (req, res, next) => {
    const body = req.body;
    
    const newProject = await new Project({
        name: body.name
    });

    const savedProject =  await newProject.save();
    res.json(savedProject);
});

module.exports = projectRouter;