const Transactions = require("../models/transactions");

/**
 * @param Filtering parameters.
 * @returns Query string filtering.
 */
const filter = async() => {
    try {
        const { date, minAmount, maxAmount } = req.query;
        const query = {};

        if(date) query.date = date;
        if(minAmount) query.amount = { ...query.amount, $gte: Number(minAmount) };
        if(maxAmount) query.amount = { ...query.amount, $lte: Number(maxAmount) };

        const transactions = await Transactions.find(query);
        res
        .status(200)
        .json(transactions);
    } catch(err) {
        res
        .status(500)
        .json({ message: `Invalid searching Parameter. Please use a different one.`})
        console.error(err);
    }
};

module.exports = filter;