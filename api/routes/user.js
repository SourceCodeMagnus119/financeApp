const express = require("express");
const router = express.Router();
const { 
    createUser, 
    allUsers, 
    usersById, 
    changePassword, 
    update,
    deleteAcc,
} = require('../controllers/user');
const {
    signUp,
    Login,
    loginStatus,
    protected,
    Logout,
} = require("../controllers/auth");

/**
 * @param Endpoint Management.
 */
router.post('/api/sign-up', createUser, signUp);
router.post('/api/login', Login);
router.get('/api/logout', protected, Logout);
router.get('/api/users', protected, allUsers);
router.get('/api/loggedIn', loginStatus);
router.get('/api/users/:id', protected, usersById);
router.patch('/api/users/profile', update);
router.put('/api/users/:id/change-password', protected, changePassword);
router.delete('/api/users/:id/delete-account', protected, deleteAcc);

module.exports = router;