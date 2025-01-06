const express = require("express");
const router = express.Router();
const {
    create,
    all
} = require("../controllers/transactions");

router.post('/api/transaction/transfer', create);
router.get('api/transactions', all);

module.exports = router;