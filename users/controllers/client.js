const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/client");
exports.createClient = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed." + errors.throw);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const phone = req.body.numero;
  const password = req.body.password;
  console.log(email);
  console.log(nom);
  console.log(password);
  console.log(phone);
  console.log(prenom);
  bcrypt
    .hash(password, 12) //hash the pw with a string of 12
    .then((hashedPw) => {
      const client = new Client({
        email: email,
        password: hashedPw,
        nom: nom,
        prenom: prenom,
        phone: phone,
      });
      return client.save();
    })
    .then((result) => {
      const token = jwt.sign(
        {
          email: email,
          clientId: result._id.toString(),
        },
        "somesupersecretsecretemp",
        { expiresIn: "1h" }
      );
      res
        .status(201)
        .json({
          message: "client created!",
          client: result,
          token: token,
          expiryDate: "1",
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        console.log(err + " ekteb")
      }
      next(err); //throw err
    });
};

exports.loginClient = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  Client.findOne({ email: email })
    .then((Client) => {
      if (!Client) {
        const error = new Error("A Client with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = Client;
      return bcrypt.compare(password, Client.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          ClientId: loadedUser._id.toString(),
        },
        "somesupersecretsecretemp",
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ token: token, client: loadedUser, expiryDate: "1" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getClient = async (req, res, next) => {
if(!req.params.id){
  
  return
}else{
  console.log( "hedhy el id :"+  req.params.id )
  const client = await Client.findById(req.params.id );
  try {
    res.status(200).json({
      message: "this client is found w  hamdoulillah",
      client,
    });
  } catch {
    res.status(404);
    res.send({ error: "client doesn't exist!" });
  }
}
};
