const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Client', clientSchema);
