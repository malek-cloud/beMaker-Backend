const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default:"employee"
  },
  
 
});

module.exports = mongoose.model("employee", employeeSchema);
