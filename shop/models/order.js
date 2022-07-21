const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    nom: {
        type: String, 
        required : true,
    },
    prenom: {
        type: String, 
        required : true,
    },
    email: {
        type: String, 
        required : true,
    },
    phone: {
        type: String, 
        required : true,
    },
    achats: {
        type: [String],
    },
    amount: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    delivered: {
        type: String,
        default: "Non",
    },
    region: {
        type: String,
    },
    city: {
        type: String,
    },
    adress: {
        type: String,
    },
});

module.exports = mongoose.model("Order", OrderSchema);