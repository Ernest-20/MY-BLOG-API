const express = require('express');
const router = express.Router();

const multer = require("multer");

const {
    signup,
    login
} = require('../controllers/authController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), (req, res) => {
   console.log('body', req.body);
   console.log('file', req.file);
   res.send("Hello, from upload");
});

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
