const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const presentationFields = require("./presentation/routes/fields");
const presentationMachines = require("./presentation/routes/machines");
const presentationProjects = require("./presentation/routes/projects");
const presentationEvents = require("./presentation/routes/événement");
const presentationServices = require("./presentation/routes/services");
const presentationFormations = require("./presentation/routes/formations");
const joinWorkshop = require("./presentation/routes/workshopParticipant");
const Client = require("./users/routes/client");
const Pay = require("./shop/routes/payment");


const presentationProduct = require("./shop/routes/product");

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
app.use(express.static(path.join('public')));



/* app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
  next(); 
}) */
app.use("*", cors());
app.use("/activities", presentationFields);
app.use("/activities", presentationServices);
app.use("/activities", presentationProjects);
app.use("/activities", presentationMachines);
app.use("/activities", presentationEvents);
app.use("/activities", presentationFormations);
app.use("/activities", joinWorkshop);
app.use("/users", Client);
app.use("/", Pay);



app.use("/shop", presentationProduct);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
mongoose.connect(
  "mongodb+srv://malek:newLifeNewAdventure2022@cluster0.92yzp.mongodb.net/BeMaker?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then((result) => {
  app.listen(/* process.env.PORT ||  */5000);
  console.log("connected");
})
.catch((err) => console.log(err));

/*   .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.92yzp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(process.env.PORT || 5000);
    console.log("connected");
  })
  .catch((err) => console.log(err));
 */
  