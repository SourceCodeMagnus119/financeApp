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
        
        const user = await User.create({})
        const token = createSecretToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            withCredentials: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
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
        const token = createSecretToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            withCredentials: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
        });

        if(user && compare) {
            const { id, username, email, password } = user;
            res
            .status(200)
            .json({
                id,
                username,
                email,
                password,
                token, 
                message: `Successfully Logged in`
            });
        }
        res
        .status(401)
        .json({ message: `Incorrect email or password. Please try Again` });
    } catch(err) {
        res
        .status(500)
        .json({ message: `Error Logging in`});
        console.error(err);
    }
};

const Logout = async(req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            withCredentials: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true,
        });
        res
        .status(200)
        .json({ message: `User Logged Out Successfully` });
    } catch(err) {
        res
        .status(500)
        .json({ message: `Internal Server Error` });
    }
}

const loginStatus = async(req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res
            .status(400)
            .json(false)
        }

        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        if(verified) {
            res
            .stats(200)
            .json(true);
        }
        res
        .status(400)
        .json(false);
    } catch(err) {
        res
        .status(500)
        .json({ message: `Internal Server Error` });
        console.error(err);
    }
};

const protected = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res
            .status(400)
            .json({ message: `Not Authorized: Please login` });
        }
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(verified.id).select("-password");
        
        if(!user) {
            res
            .status(400)
            .json({ message: `User not found` });
        }
        req.user = user;
        next();
    } catch(err) {
        res
        .status(500)
        .json({ message: `Internal Server Error` });
        console.error(err);
    }
};

module.exports = { signUp, Login, Logout, loginStatus, protected };