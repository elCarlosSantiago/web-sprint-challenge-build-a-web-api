const express = require('express');
const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');
const { validateId, errorHandler, validateProject } = require('../middleware/middleware');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try{
    const allProjects = await Projects.get();
    res.json(allProjects)
  }catch(err) {
    next(err)
  }

})
router.get('/:id', validateId, async (req, res, next) => {
  try{
    const {id} = req.params;
    const project = await Projects.get(id)
    res.json(project)
  } catch(err) {
    next(err)
  }
})
router.post('/', validateProject ,async (req, res, next) => {
  const project = req.body;
  try{
    const newProject = await Projects.insert(project);
    res.json(newProject)
  } catch(err) {
    next(err)
  }
})
router.put('/:id', async (req, res, next) => {

})
router.delete('/:id', async (req, res, next) => {

})
router.get('/:id/actions', validateId, async (req, res, next) => {
  try {
    const {id} = req.params
    const projectActions = await Projects.getProjectActions(id)
    res.json(projectActions)
  } catch(err) {
    next(err)
  }
})

router.use(errorHandler)

module.exports = router



