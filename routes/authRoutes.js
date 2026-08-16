const express = require('express');
const router = express.Router();

const multer = require("multer");

const {
    signup,
    login
} = require('../controllers/authController');

const upload = multer({ dest: 'uploads/' });
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
   const fileUrl = req.file.path;
   const fileName = req.filename;


   res.send("Hello, from upload");
});

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
