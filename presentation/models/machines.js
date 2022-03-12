const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const machineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  //  required: true,
  },
  images: {
    type: [String],
  },
});

module.exports = mongoose.model("Machine", machineSchema);
