const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prix: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },

  difficulty: {
    type: String,
  },

  objectifs: {
 type: String,
  },
  prerequis: {
    type: String,
 },
  prixParGroupeOnsite: {
    type: String,
 },
  prixParGroupeOnline: {
    type: String,
 },
 date: {
  type: String,
},
  

  // images: {
  //   type: [String],
  // },
  images: {
    public_id : {
      type : String,
    },
    url : { 
      type : String,
    }
  },
  program: {
    type: String,
  },

});

module.exports = mongoose.model("formation", formationSchema);
