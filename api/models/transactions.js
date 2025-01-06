const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    date: {
        type: String,
    },
    amount: {
        type: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);