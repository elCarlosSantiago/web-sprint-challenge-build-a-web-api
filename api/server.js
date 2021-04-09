const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');
const morgan = require('morgan');

//Global Middleware
server.use(express.json());
server.use(morgan('dev'));
if (process.env.NODE_ENV === 'development') {
	const cors = require('cors');
	server.use(cors());
}

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
	res.send(`<h1>These are not the resources you're looking for.</h1>`);
});

module.exports = server;
