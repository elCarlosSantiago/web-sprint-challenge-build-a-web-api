const express = require('express');
const Actions = require('./actions-model');
const { errorHandler, validateId, validateAction } = require('./../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const allActions = await Actions.get();
		res.json(allActions);
	} catch (err) {
		next(err);
	}
});
router.get('/:id', validateId, async (req, res, next) => {
	try {
		const { id } = req.params;
		const action = await Actions.get(id);
		res.json(action);
	} catch (err) {
		next(err);
	}
});
router.post('/', validateAction, async (req, res, next) => {
	const action = req.body;
	try {
		const newAction = await Actions.insert(action);
		res.status(201).json(newAction);
	} catch (err) {
		next(err);
	}
});
router.put('/:id', validateId, validateAction, async (req, res, next) => {
	const changes = req.body;
	const { id } = req.params;
	try {
		const updatedAction = await Actions.update(id, changes);
		res.status(201).json(updatedAction);
	} catch (err) {
		next(err);
	}
});
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedAction = await Actions.get(id);
		await Actions.remove(id);
		res.json(deletedAction);
	} catch (err) {
		next(err);
	}
});

router.use(errorHandler);

module.exports = router;
