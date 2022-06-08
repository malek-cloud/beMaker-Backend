const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "Client",
    },
    achats: {
        type: [String],
    },
    amount: {
        type: String,
    },
    paymentId: {
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
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
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