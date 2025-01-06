require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../util/secretToken");

/**
 * @param Authentication and Authorization.
 */
const signUp = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = User.findOne({ email });

        if(!email || !password) {
            res
            .status(400)
            .json({ message: `Email and password are required`});
        }

        if(existingUser) {
            res
            .status(400)
            .json({ message: `User already Exists`});
        }
        
        const token = createSecretToken(User.id);
        res.cookie(token, {
            httpOnly: true,
            withCredentials: true,
        });
        res
        .status(200)
        .json({ message: `Successfully Signed in`});
    } catch(Err) {
        res
        .status(500)
        .json({ message: `Error Signing in`});
        console.error(Err);
    }
};

const Login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email });
        
        if(!email || !password) {
            res
            .status(400)
            .json({ message: `Email and Password are required.`});
        }

        if(!user) {
            res
            .status(500)
            .json({ message: `User does not Exist`});
        }

        const compare = await bcrypt.compare(password, user.password);
        if(!compare) {
            res
            .status(401)
            .json({ message: `Incorrect email or password. Please try Again` });
        }
        const token = createSecretToken(user.id);
        res.send({
            id: user.id,
            username: user.username,
            token: token,
            role: role,
        });
    } catch(err) {
        res
        .status(500)
        .json({ message: `Error Logging in`});
        console.error(err);
    }
};

module.exports = { signUp, Login };