const path = require('path')
const multer = require('multer')

const uploadFolder = path.resolve(__dirname, '..', 'uploads', 'avatars');

const Storage = multer.diskStorage({
  destination: uploadFolder,
  filename: function(req, file, callback) {
				const fileName = `${Date.now()}-${file.originalname}`;

				return callback(null, fileName);
  }
})

module.exports = Storage