const express = require('express')
const mysql = require('mysql')

const mysqlConnection = require('../../mysql.js')

const con = mysql.createConnection(mysqlConnection);
const roomsRouter = express.Router();

roomsRouter.get('/', (req, res) => {
  try {
    con.query("SELECT * FROM rooms;", function (err, result) {
      res.status(201).send(result)
    });
  } catch (err) {}
})

roomsRouter.get('/:id', (req, res) => {
  const {id} = req.params

  try {
    con.query(`SELECT rooms.id, rooms.name, rooms.chat_description, rooms.image FROM users_rooms, rooms WHERE users_rooms.id_users = '${id}' AND rooms.id = users_rooms.id_rooms`, function (err, result) {
      if (err) return res.status(400).send({
        error: err
      });
  
      if (result[0]) {
        return res.status(200).send(result)
      } else {
        return res.status(404).send()
      }
    })
  } catch (err) {}
})

module.exports = roomsRouter