const express = require('express')
const mysql = require('mysql')
const multer = require('multer')

const StorageMulter = require('../configs/multer.js')
const mysqlConnection = require('../../mysql.js')
const authenticateToken = require('../middlewares/authenticateToken.js')

const con = mysql.createConnection(mysqlConnection);
const roomsRouter = express.Router();

const upload = multer({
  storage: StorageMulter.StorageRooms
})

roomsRouter.get('/', authenticateToken, (req, res) => {
  const user_id = req.user.id

  try {
    con.query(`SELECT DISTINCT(r.id), r.name, r.image, u.fullname, rlm.user_message, rlm.user_date
    FROM rooms AS r
    LEFT JOIN rooms_users AS ru 
    ON r.id = ru.id_rooms
    LEFT JOIN rooms_lastmessage as rlm
    ON rlm.id_rooms = ru.id_rooms
    LEFT JOIN users AS u
    ON rlm.id_users = u.id
    WHERE ru.id_users = '${user_id}'`, function (err, result) {
      if (err) throw err
      if (result !== undefined) {        
        return res.status(200).send(result)
      } else {
        return res.status(404).send()
      }
    });
  } catch (err) {}
})

roomsRouter.post('/create-room', (req, res) => {
  const {name, users} = req.body
  const {id} = req.user

  try {
    con.query(`INSERT INTO rooms (name) VALUES ('${name}')`, function (err, result) {
      if (err) {
        return res.status(400).send({
          error: err,
          error_message: "Error on create the room"
        })
      }

      const room_id = result.insertId

      con.query(`INSERT INTO rooms_lastmessage (id_rooms, id_users) VALUES ('${room_id}', '${id}')`)

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