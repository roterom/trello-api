const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'trello',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, next) => {
    next(null, `${new Date().getTime()}-${file.originalname})`);
  }
});

module.exports = multer({ storage }) //para decirle a multer que está utilizando este storage
