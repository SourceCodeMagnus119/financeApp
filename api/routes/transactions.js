const express = require("express");
const router = express.Router();
const {
    create,
    all
} = require("../controllers/transactions");
const filter = require("../util/filter");

router.post('/api/transactions', create);
router.get('/api/transactions', all);
router.get('/api/transactions?${queryString}', filter);

module.exports = router;