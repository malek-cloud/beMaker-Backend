const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    public_id : {
      type : String,
    },
    url : { 
      type : String,
    }
  },
});

module.exports = mongoose.model("Marketing", marketingSchema);
