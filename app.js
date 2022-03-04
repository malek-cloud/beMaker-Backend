const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const presentationFields = require('./presentation/routes/fields');
const presentationProjects = require('./presentation/routes/projects');
const app = express();
const path = require('path');

app.use(bodyParser.json({extended: true})); // application/json

app.use(bodyParser.urlencoded({extended: true})); // x-www-form-urlencoded <form>

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({storage: storage, fileFilter: fileFilter}).array('image', 6)
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
app.use('/activities', presentationFields);
app.use('/activities', presentationProjects);

    app.use((error, req, res, next) => {
      console.log(error);
      const status = error.statusCode || 500;
      const message = error.message;
      const data = error.data;
      res.status(status).json({ message: message, data: data });
    }); 
    mongoose

  .connect(
    'mongodb+srv://malek:newLifeNewAdventure2022@cluster0.92yzp.mongodb.net/BeMaker?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    app.listen(5000);
    console.log("connected");
  })
  .catch(err => console.log(err));
