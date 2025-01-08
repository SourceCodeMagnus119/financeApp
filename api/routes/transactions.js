const express = require("express");
const { protected } = require("../controllers/auth");
const router = express.Router();
const {
    create,
    all
} = require("../controllers/transactions");
const filter = require("../util/filter");

router.post('/api/transactions', protected, create);
router.get('/api/transactions', protected, all);
router.get('/api/transactions?${queryString}', protected, filter);

module.exports = router;