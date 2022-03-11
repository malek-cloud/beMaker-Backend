const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const presentationFields = require("./presentation/routes/fields");
const presentationMachines = require("./presentation/routes/machines");
const presentationProjects = require("./presentation/routes/projects");
const presentationEvents = require("./presentation/routes/événement");
const app = express();
const path = require("path");
cors = require("cors");

app.use(bodyParser.json({ extended: true })); // application/json
app.use('/uploads', express.static(path.join('uploads')));
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded <form>

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(multer({ storage: storage, fileFilter: fileFilter }).array("image", 6));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("*", cors());
app.use("/activities", presentationFields);
app.use("/activities", presentationProjects);
app.use("/activities", presentationMachines);
app.use("/activities", presentationEvents);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
mongoose

  .connect(
    "mongodb+srv://malek:newLifeNewAdventure2022@cluster0.92yzp.mongodb.net/BeMaker?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(5000);
    console.log("connected");
  })
  .catch((err) => console.log(err));