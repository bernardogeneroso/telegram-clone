const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path') 
const socketIO = require('socket.io')

const mysqlConnection = require('../mysql.js')

const Routes = require('./routes/index.js')
const authenticateToken = require('./middlewares/authenticateToken.js')

//app config
const con = mysql.createConnection(mysqlConnection);
const app = express()

dotenv.config();
app.use(express.json());
app.use(cors())
app.use(Routes)

app.use('/avatars', express.static(path.resolve(__dirname, 'uploads', 'avatars')))
app.use('/rooms-image', express.static(path.resolve(__dirname, 'uploads', 'rooms')))

const port = process.env.PORT || 3333

// app listen
const server = app.listen(port, () => console.log('🚀 | Server started on port 3333'))

const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

app.use(authenticateToken)

//Sockets
io.on("connection", (socket) => {
  console.log(`Connected socket`)

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
          return res.status(400).send({
            error: err,
            error_message: "Error on create message"
          })
        }
  
        return res.status(201).send({
          id: result.insertId,
          message
        })
      });
    } catch (err) {}

    io.to("room"+room_id).emit('messageRoom', message);
  })
});

module.exports = app