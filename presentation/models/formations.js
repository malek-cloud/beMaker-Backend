const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formationSchema = new Schema({
  name: {
    type: String,
  },
  field: {
    type: String,
  },
  description: {
    type: String,
  },
  prix: {
    type: String,
  },
  period: {
    type: String,
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
  formulaireParticipation : {
    type : String,
  }
});

module.exports = mongoose.model("formation", formationSchema);
