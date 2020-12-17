const express = require('express')

const usersRouter = require('./usersRouter.js')
const roomsRouter = require('./roomsRouter.js')
const messagesRouter = require('./messagesRouter.js')

const routes = express.Router();

routes.use('/users', usersRouter);
routes.use('/rooms', roomsRouter);
routes.use('/messages', messagesRouter);

module.exports = routes;
