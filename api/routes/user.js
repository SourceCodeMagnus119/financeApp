const express = require("express");
const router = express.Router();
const { 
    createUser, 
    allUsers, 
    usersById, 
    changePassword, 
    deleteAcc,
} = require('../controllers/user');
const {
    signUp,
    Login,
} = require("../controllers/auth");

/**
 * @param Endpoint Management.
 */
router.post('api/sign-up', createUser, signUp);
router.post('api/login', Login);
router.get('api/users', allUsers);
router.get('api/users/:id', usersById);
router.put('api/users/:id/change-password', changePassword);
router.delete('api/users/:id/delete-account', deleteAcc);

module.exports = router;