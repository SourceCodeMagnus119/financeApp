const Transaction = require("../models/transactions");

/**
 * @param Transaction Operations.
 */
const create = async() => {
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction);
    } catch(err) {
        console.error(err);
    }
};

const all = async() => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch(err) {
        consol.error(err);
    }
};

module.exports = { create, all };