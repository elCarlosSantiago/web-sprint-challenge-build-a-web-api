const Actions = require('../actions/actions-model');

const validateId = async (req, res, next) => {
	const { id } = req.params;
	try {
		const action = await Actions.get(id);
		if (!action) {
			res.status(404).json({ message: 'Action not found' });
		} else {
			req.action = action;
			next();
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
	errorHandler,
};
