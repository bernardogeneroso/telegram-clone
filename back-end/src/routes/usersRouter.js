const express = require('express')
const mysql = require('mysql')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const authenticateToken = require('../middlewares/authenticateToken.js')
const StorageMulter = require('../configs/multer.js')
const mysqlConnection = require('../../mysql.js')

const upload = multer({
  storage: StorageMulter.StorageAvatar
})

const con = mysql.createConnection(mysqlConnection);
const usersRouter = express.Router();

usersRouter.get('/all', (req, res) => {
  try {
    con.query("SELECT * FROM users;", function (err, result) {
      return res.status(201).send(result)
    })
  } catch (err) {}
})

usersRouter.post('/create', async (req, res) => {
  const {fullname, email, secret_password} = req.body

  try {
    const encrypted_password = await bcryptjs.hash(secret_password, 10)

    con.query(`INSERT INTO users (fullname, email, secret_password) VALUES ('${fullname}', '${email}', '${encrypted_password}')`, function(err, result) {
      if (err) return res.status(400).send({
        error: err.sqlMessage
      })
  
      const user = {
        id: result.insertId,
        fullname,
        email,
        image: null
      }
  
      return res.status(201).send(user)
    })
  } catch (err) {}
})

usersRouter.post('/sessions', (req, res) => {
  const {email, secret_password} = req.body

  try {
    con.query(`SELECT * FROM users WHERE email='${email}';`, async function (err, result) {
      if (result[0]) {
        const user = result[0]

        const secret = process.env.ACCESS_TOKEN_SECRET
        const expiresIn = '1d'

		    const token = jwt.sign({user_id: user.id }, secret, { expiresIn });

        const passwordCheck = await bcryptjs.compare(secret_password, user.secret_password)

        if (!passwordCheck) {
          return res.status(401).send()
        }

        delete user.secret_password

        return res.status(200).send({
          user,
          token
        })
      } else {
        return res.status(404).send()
      }
    });
  } catch (err) {}
})

usersRouter.post('/upload-image', authenticateToken, upload.single('avatarImage'), (req, res) => {
  const filename = req.file.filename

  const user_id = req.user.id

  const linkImage = process.env.HOST + "avatars/" + filename

  try {
    con.query(`UPDATE users SET image = '${linkImage}' WHERE id = '${user_id}'`, function (err, result) {
      if (err) {
        return res.status(400).send("Error insert image")
      }
      return res.status(201).send({
        image: linkImage
      })
    })
  } catch (err) {}
})

module.exports = usersRouter