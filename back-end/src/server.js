const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser');

const Routes = require('./routes/index.js')

//app config
const app = express()

dotenv.config();
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(Routes)

app.use('/avatars', express.static(path.resolve(__dirname, 'uploads', 'avatars')))
app.use('/rooms-image', express.static(path.resolve(__dirname, 'uploads', 'rooms')))

const port = process.env.PORT || 3333

// app listen
app.listen(port, () => console.log('🚀 | Server started on port 3333'))

module.exports = app