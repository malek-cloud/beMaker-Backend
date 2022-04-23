const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bootcampSchema = new Schema({
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
  date: {
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

  location: {
    type: String,
  },

  images: {
    type: [String],
  },
  animator: {
    type: String,
  },
});

module.exports = mongoose.model("Bootcamp", bootcampSchema);
