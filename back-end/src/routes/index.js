const express = require('express')

const usersRouter = require('./usersRouter.js')
const roomsRouter = require('./roomsRouter.js')
const messagesRouter = require('./messagesRouter.js')

const authenticateToken = require('../middlewares/authenticateToken.js')

const routes = express.Router();

routes.use('/users', usersRouter);
routes.use('/rooms', authenticateToken, roomsRouter);
routes.use('/messages', authenticateToken, messagesRouter);

module.exports = routes;
