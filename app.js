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
const joinEvent = require("./presentation/routes/eventParticipant");
const Client = require("./users/routes/client");
const Pay = require("./shop/routes/payment");
const Order = require("./shop/routes/order");
const Employee = require("./employee/routes/employee");
const presentationProduct = require("./shop/routes/product");
const shopMarketing = require("./shop/routes/marketing");

const app = express();
const path = require("path");
const order = require("./shop/models/order");
cors = require("cors");

app.use(bodyParser.json({ extended: true })); // application/json
//app.use('/uploads', express.static(path.join('uploads')));

// app.use('/pdf-prog-formation', express.static(path.join('pdf-prog-formation')));


app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded <form>
// const pdfStorage = multer.diskStorage({
//   destination : function(req, file, cb){
//     cb(null, "./pdf-prog-formation");
//   },
//   filename : function(req, file, cb){
//     cb(null, new Date().toISOString().replace(/:/g, '') + '-' +  file.originalname);
//   }
// });
/////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '')+ '-' +  file.originalname.replace(/ /g, ''));
  },
});
/////////////////////
// const pdfFilter =(req, file, cb) => {
//   if(
//     file.mimetype==="application/pdf"
//   ){
//     cb(null, true);
//   } else {
//     console.log("hedha el type mta pdf li je " + file.mimetype)
//     cb(null, false)
//   }
// };
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
app.use("/activities", joinEvent);
app.use("/users", Client);
app.use("/", Pay);
app.use("/shop", Order);
app.use("/hire", Employee);
app.use("/shop", presentationProduct);
app.use("/shop", shopMarketing);


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
// mongoose.connect(
//   "mongodb+srv://malek:kisstherain@cluster0.5zphpsg.mongodb.net/?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// )
.then((result) => {
  app.listen(process.env.PORT || 5000);
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
  