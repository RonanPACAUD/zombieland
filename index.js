const express = require("express");
const router = require("./src/router");
const cors = require("cors");
const path = require('path'); 

const dotenv = require("dotenv");
dotenv.config();

const bodySanitizer = require('./src/middlewares/bodySanitizer')

const PORT = process.env.PORT;

const multer = require('multer');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'zombieland',
  keyFilename: './trusty-stack.json'
})

const getStoragePath = (req, file) => {
  return `${file.originalname}`;
};

const upload = multer({ storage: multer.memoryStorage() });

const app = express();



app.use(express.static(path.join(__dirname, './Front/dist'))); 
app.use(express.static(path.join(__dirname, './Front/dist/assets'))); 

app.use(cors('*'));

app.use(express.json({limit: '50mb'}));

app.post('/upload', upload.single('photo'), async function (req, res, next) {
  try {
    await storage.bucket("zombieland-assets").file(getStoragePath(req, req.file)).save(req.file.buffer);
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
  }
});
app.use( (req, res, next) => {console.log('hey'); next();})

app.use(bodySanitizer);

app.use(router);

app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});

module.exports = app;
