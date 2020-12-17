const express = require('express')
const dotenv = require('dotenv')

const messagesRouter = express.Router();

dotenv.config();

messagesRouter.post('/create', (req, res) => {
  const message = req.body


})

messagesRouter.post('/receive/:id', (req, res) => {
  const {id} = req.params

  
})

module.exports = messagesRouter