const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')
const dotenv = require('dotenv')
const path = require('path') 

const Routes = require('./routes/index.js')
//app config
const app = express()

dotenv.config();
app.use(express.json());
app.use(cors())
app.use(Routes)

app.use('/avatars', express.static(path.resolve(__dirname, 'uploads', 'avatars')))

const port = process.env.PORT || 3333

// app listen
const server = app.listen(port, () => console.log('🚀 | Server started on port 3333'))

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

  socket.on('newMessage', (message) => {
    console.log(message)
    io.to("room"+data.room_id).emit('messageRoom', data);
  })
});

module.exports = app