const Actions = require('../actions/actions-model');
const Projects = require('./../projects/projects-model');

const validateId = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (req.baseUrl === '/api/actions') {
			const action = await Actions.get(id);
			if (!action) {
				res.status(404).json({ message: 'Action not found' });
			} else {
				req.action = action;
				next();
			}
		} else if (req.baseUrl === '/api/projects') {
			const project = await Projects.get(id);
			if (!project) {
				res.status(404).json({ message: 'Project ID does not match' });
			} else {
				req.project = project;
				next();
			}
		}
	} catch (err) {
		next(err);
	}
};

const validateAction = async (req, res, next) => {
	const { project_id, description, notes } = req.body;
	try {
		if (!project_id || !description || !description.trim() || !notes || !notes.trim()) {
			res.status(400).json({
				message: 'Must include project_id, description and notes',
			});
		} else if (description.length > 128) {
			res.status(400).json({
				message: 'Description must be less than 128 characters.',
			});
		} else {
			const project = await Projects.get(project_id);
			if (!project) {
				res.status(404).json({ message: 'No project was found for provided ID' });
			} else {
				next();
			}
		}
	} catch (err) {
		next(err);
	}
};

const errorHandler = (err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
};
module.exports = {
	validateId,
	validateAction,
	errorHandler,
};
