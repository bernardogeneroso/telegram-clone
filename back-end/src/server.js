const express = require('express')
const cors = require('cors')
//const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser');
//const Pusher = require('pusher');
//const socketIO = require('socket.io')

//const mysqlConnection = require('../mysql.js')

const Routes = require('./routes/index.js')
//const authenticateToken = require('./middlewares/authenticateToken.js')

//app config
//const con = mysql.createConnection(mysqlConnection);
const app = express()

dotenv.config();
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.json());

app.use(Routes)

app.use('/avatars', express.static(path.resolve(__dirname, 'uploads', 'avatars')))
app.use('/rooms-image', express.static(path.resolve(__dirname, 'uploads', 'rooms')))

//app.use(authenticateToken)

const port = process.env.PORT || 3333

// app listen
app.listen(port, () => console.log('🚀 | Server started on port 3333'))
//const server = app.listen(port, () => console.log('🚀 | Server started on port 3333'))

/*const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});*/

//app.use(authenticateToken)
/*
//Sockets
io.on("connection", (socket) => {
  console.log(`Connected socket`)

  socket.on('leaveRoom', (room_id) => {
    socket.leave("room"+room_id);
    console.log("leave "+room_id)
  })

  socket.on('newRoom', (room_id) => {
    //if(!socket.rooms.has("room"+room_id)){
      socket.join("room"+room_id);
      console.log("join "+room_id)
    //}
  })

  socket.on('newMessage', (result) => {
    const {room_id, user_id, user_fullname, message} = result

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

        con.query(`UPDATE rooms_lastmessage SET id_users='${user_id}', user_message='${message}', user_date='${dateNow}'`, function (err, result) {
          if (err) {
            return res.status(400).send({
              error: err,
              error_message: "Error on create message"
            })
          }
        })

        io.to("room"+room_id).emit('messageRoom', messageSendAllRoomUsers);
      });
    } catch (err) {}
  })
});*/

module.exports = app