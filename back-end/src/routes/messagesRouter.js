const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql')
const Pusher = require('pusher');

const mysqlConnection = require('../../mysql.js')

const con = mysql.createConnection(mysqlConnection);
const messagesRouter = express.Router();

dotenv.config();

const pusher = new Pusher({
  appId: "1144733",
  key: "9804f2768338a8f71fba",
  secret: "ae98183a18e66bf9e0df",
  cluster: "eu",
  useTLS: true
});

messagesRouter.post('/newMessage', (req, res) => {
  const {room_id, user_id, user_fullname, message} = req.body

  const channelName = "room"+room_id
  const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    con.query(`INSERT INTO rooms_messages (id_rooms, id_users, message, message_timestamp) VALUES ('${room_id}', '${user_id}', '${message}', '${dateNow}')`, function (err, result) {
      if (err) {
        return res.status(400).send({
          error: err,
          error_message: "Error on create message"
        })
      }

      const messageSendAllRoomUsers = {
        id: result.insertId,
        message,
        message_timestamp: dateNow,
        fullname: user_fullname
      }

      con.query(`UPDATE rooms_lastmessage SET id_users='${user_id}', user_message='${message}', user_date='${dateNow}' WHERE id_rooms='${room_id}'`, function (err, result) {
        if (err) {
          return res.status(400).send({
            error: err,
            error_message: "Error on create message"
          })
        }
      })

      pusher.trigger(channelName, 'client-messageRoom', messageSendAllRoomUsers)

      return res.status(200).send()
    });
  } catch (err) {}
})


messagesRouter.post('/remove/:id', (req, res) => {
  const {id} = req.params
  const {id: user_id} = req.user

  try {
    con.query(`DELETE FROM rooms_messages WHERE id = '${id}' AND id_users = '${user_id}'`, function (err, result) {
      if (err) {
        return res.status(400).send({
          error: err,
          error_message: "Error on create message"
        })
      }

      return res.status(200).send()
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

messagesRouter.get('/:id', (req, res) => {
  const {id: room_id} = req.params

  try {
    con.query(`SELECT rm.id, rm.message, rm.message_timestamp, u.fullname
    FROM rooms_messages AS rm
    INNER JOIN users AS u
    ON rm.id_users = u.id
    WHERE rm.id_rooms = '${room_id}'
    GROUP BY rm.id
    ORDER BY rm.id`, function (err, result) {
      if (err) {
        res.status(400).send({
          error: err,
          error_message: "Error on get messages of room"
        })
      }

      res.status(200).send(result)
    });
  } catch (err) {}
})

module.exports = messagesRouter