const multer = require("multer")
const cloudinary = require("../config/cloudinary")
const CloudinaryStorage =
require('multer-storage-cloudinary').CloudinaryStorage;

const storage = new CloudinaryStorage({
    Cloudinary,
    params:{folder: 'uploads'},
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024},
});