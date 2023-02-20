const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
   /*  required: true, */
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

module.exports = mongoose.model("Product", productSchema);
