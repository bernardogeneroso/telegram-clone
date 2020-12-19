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

roomsRouter.post('/create-room', (req, res) => {
  const {name, users} = req.body
  const {id} = req.user

  users.unshift(id)

  try {
    con.query(`INSERT INTO rooms (name) VALUES ('${name}')`, function (err, result) {
      if (err) {
        res.status(400).send({
          error: err,
          error_message: "Error on create the room"
        })
      }

      const room_id = result.insertId

      users.forEach(id_user => {
        con.query(`INSERT INTO rooms_users (id_rooms, id_users) VALUES ('${room_id}', '${id_user}')`, function (err, result) {
          if (err) {
            res.status(400).send({
              error: err,
              error_message: "Error on insert user"
            })
          }
        });
      });
  
      res.status(200).send({
        room: {
          id: room_id,
          name,
        }
      })
    });

  } catch (err) {}
})

roomsRouter.post('/remove-room/:id', (req, res) => {
  const {id} = req.params

  try {
    con.query(`DELETE FROM rooms WHERE id = '${id}'`, function (err, result) {
      if (err) {
        res.status(400).send({
          error: err,
          error_message: "Error on delete users"
        })
      }
    })

    res.status(200).send()
  } catch (err) {}
})

roomsRouter.post('/add-users', (req, res) => {
  const {room_id, users} = req.body

  try {
    users.forEach(id_user => {
      con.query(`INSERT INTO rooms_users (id_rooms, id_users) VALUES ('${room_id}', '${id_user}')`, function (err, result) {
        if (err) {
          res.status(400).send({
            error: err,
            error_message: "Error on insert users"
          })
        }
      });
    })

    res.status(200).send()
  } catch (err) {}
})

roomsRouter.post('/remove-users', (req, res) => {
  const {room_id, users} = req.body

  try {
    users.forEach(id_user => {
      con.query(`DELETE FROM rooms_users WHERE id_rooms = '${room_id}' AND id_users = '${id_user}'`, function (err, result) {
        if (err) {
          res.status(400).send({
            error: err,
            error_message: "Error on delete users"
          })
        }
      });
    })

    res.status(200).send()
  } catch (err) {}
})

module.exports = roomsRouter