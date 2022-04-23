const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  machines: {
    type: [Schema.Types.ObjectId],
    ref: "Machine",
    //  required: true,
  },
  images: {
    type: [String],
  },
});

module.exports = mongoose.model("Service", serviceSchema);