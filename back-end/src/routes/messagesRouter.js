const express = require('express')
const dotenv = require('dotenv')
const socketIO = require('socket.io')
const mysql = require('mysql')

const mysqlConnection = require('../../mysql.js')

const con = mysql.createConnection(mysqlConnection);
const messagesRouter = express.Router();

const app = express()
const server = app.listen()
dotenv.config();

const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

//Sockets
io.on("connection", (socket) => {
  socket.on('leaveRoom', (room_id) => {
    socket.leave("room"+room_id);
  })

  socket.on('newRoom', (room_id) => {
    socket.join("room"+room_id);
  })

  socket.on('newMessage', (result) => {
    const {room_id, user_id, message} = result

    try {
      con.query(`INSERT INTO rooms_messages (id_rooms, id_users, message) VALUES ('${room_id}', '${user_id}', '${message}')`, function (err, result) {
        if (err) {
          res.status(400).send({
            error: err,
            error_message: "Error on create message"
          })
        }
  
        res.status(201).send({
          id: result.insertId,
          message
        })
      });
    } catch (err) {}

    io.to("room"+room_id).emit('messageRoom', message);
  })
});

messagesRouter.post('/remove/:id', (req, res) => {
  const {id} = req.params
  const {id: user_id} = req.user

  try {
    con.query(`DELETE FROM rooms_messages WHERE id = '${id}' AND id_users = '${user_id}'`, function (err, result) {
      if (err) {
        res.status(400).send({
          error: err,
          error_message: "Error on create message"
        })
      }

      res.status(200).send()
    });
  } catch (err) {}
})

messagesRouter.post('/rename-message', (req, res) => {
  const {message_id, message} = req.body
  const {id: user_id} = req.user

  try {
    con.query(`UPDATE rooms_messages SET message = '${message}' WHERE id = '${message_id}' AND id_users = '${user_id}'`, function (err, result) {
      if (err) {
        res.status(400).send({
          error: err,
          error_message: "Error on create message"
        })
      }

      res.status(201).send({
        id: message_id,
        message
      })
    });
  } catch (err) {}
})

module.exports = messagesRouter