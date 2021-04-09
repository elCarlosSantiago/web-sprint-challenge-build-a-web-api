const express = require('express');
const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');
const { validateId, errorHandler } = require('../middleware/middleware');
const server = require('../server');

const router = express.Router()

router.get('/', async (req, res, next) => {

})
router.get('/:id', async (req, res, next) => {

})
router.post('/', async (req, res, next) => {

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



