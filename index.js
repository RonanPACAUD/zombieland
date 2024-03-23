const express = require("express");
const router = require("./src/router");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const bodySanitizer = require('./src/middlewares/bodySanitizer')

const PORT = process.env.PORT;

const multer = require('multer');

const storage = multer.diskStorage({
  destination:  './assets' ,
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });



const app = express();

app.use(express.static('Front/dist'));
app.use(express.static('assets'));

app.use(cors("*"));

app.use(express.json({limit: '50mb'}));

app.post('/upload', upload.single('photo'), function (req, res, next) {
});

app.use(bodySanitizer);

app.use(router);

app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});

module.exports = app;
