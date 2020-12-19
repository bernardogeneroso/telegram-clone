const express = require('express')
const mysql = require('mysql')
const multer = require('multer')

const StorageMulter = require('../configs/multer.js')
const mysqlConnection = require('../../mysql.js')

const con = mysql.createConnection(mysqlConnection);
const roomsRouter = express.Router();

const upload = multer({
  storage: StorageMulter.StorageRooms
})

roomsRouter.get('/', (req, res) => {
  try {
    con.query("SELECT * FROM rooms;", function (err, result) {
      return res.status(201).send(result)
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
        return res.status(400).send({
          error: err,
          error_message: "Error on create the room"
        })
      }

      const room_id = result.insertId

      users.forEach(id_user => {
        con.query(`INSERT INTO rooms_users (id_rooms, id_users) VALUES ('${room_id}', '${id_user}')`, function (err, result) {
          if (err) {
            return res.status(400).send({
              error: err,
              error_message: "Error on insert user"
            })
          }
        });
      });
  
      return res.status(200).send({
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
        return res.status(400).send({
          error: err,
          error_message: "Error on delete users"
        })
      }
    })

    return res.status(200).send()
  } catch (err) {}
})

roomsRouter.post('/add-users', (req, res) => {
  const {room_id, users} = req.body

  try {
    users.forEach(id_user => {
      con.query(`INSERT INTO rooms_users (id_rooms, id_users) VALUES ('${room_id}', '${id_user}')`, function (err, result) {
        if (err) {
          return res.status(400).send({
            error: err,
            error_message: "Error on insert users"
          })
        }
      });
    })

    return res.status(200).send()
  } catch (err) {}
})

roomsRouter.post('/remove-users', (req, res) => {
  const {room_id, users} = req.body

  try {
    users.forEach(id_user => {
      con.query(`DELETE FROM rooms_users WHERE id_rooms = '${room_id}' AND id_users = '${id_user}'`, function (err, result) {
        if (err) {
          return res.status(400).send({
            error: err,
            error_message: "Error on delete users"
          })
        }
      });
    })

    return res.status(200).send()
  } catch (err) {}
})

roomsRouter.post('/upload-image/:id', upload.single('roomsImage'), (req, res) => {
  const filename = req.file.filename

  const {id: room_id} = req.params

  const linkImage = process.env.HOST + "rooms-image/" + filename

  try {
    con.query(`UPDATE rooms SET image = '${linkImage}' WHERE id = '${room_id}'`, function (err, result) {
      if (err) {
        return res.status(400).send("Error insert image")
      }
      return res.status(201).send({
        image: linkImage
      })
    })
  } catch (err) {}
})

module.exports = roomsRouter