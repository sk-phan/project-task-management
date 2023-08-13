const projectRouter = require('express').Router();
const Project = require("../model/ProjectModel");


projectRouter.get('/', (req, res) => {
    Project.find()
    .then(project => res.json(project))
    .catch(error => next(error))
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
    const body = req.body;
    
    const newProject = await new Project({
        name: body.name
    });

    newProject.save()
    .then(project => {
        res.json(project);
    })
    .catch(error => next(error));
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

    const id = req.params.id;
    
    Project.findByIdAndRemove(id)
    .then(() => {
        res.status(204).end()
    })
    .catch(error => next(error))

})



module.exports = projectRouter;