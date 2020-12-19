const path = require('path')
const multer = require('multer')

const uploadFolderAvatar = path.resolve(__dirname, '..', 'uploads', 'avatars');
const uploadFolderRooms = path.resolve(__dirname, '..', 'uploads', 'rooms');

const StorageAvatar = multer.diskStorage({
  destination: uploadFolderAvatar,
  filename: function(req, file, callback) {
				const fileName = `${Date.now()}-${file.originalname}`;

				return callback(null, fileName);
  }
})

const StorageRooms = multer.diskStorage({
  destination: uploadFolderRooms,
  filename: function(req, file, callback) {
				const fileName = `${Date.now()}-${file.originalname}`;

				return callback(null, fileName);
  }
})

module.exports = {
  StorageAvatar,
  StorageRooms
}