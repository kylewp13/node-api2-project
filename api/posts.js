const express = require('express');

const postsRouter = require('../data/db-router');

const server = express();

server.use(express.json());

// route
server.use('/api/posts', postsRouter);

module.exports = server