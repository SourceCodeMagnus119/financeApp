const bcrypt = require("bcrypt");
const User = require("../models/user");

/**
 * @param User CRUD Operations.
 */
const createUser = async(req, res) => {
    const user = new User();
    try {
        const savedUser = await user.save();
        res
        .status(201)
        .json(savedUser);
    } catch(err) {
        res
        .status(500)
        .json({ message: `Internal Server Error`});
        console.error(err);
    }
};

const allUsers = async(req, res) => {
    try {
        User.find({}, (err, User) => {
            if(err) {
                res.send(err);
            }
            res.json(User);
        })
    } catch(Err) {
        res
        .status(500)
        .json({ message: `Error fetching all user`});
        console.error(Err);
    }
};

const usersById = async(req, res) => {
    try {
        const user = await User.findById({ id: _id }, req.params.id);
        if(!user) {
            res
            .status(400)
            .json({ message: `Invalid Request: User does not exist`});
        }
        res.json(user);
    } catch(err) {
        res
        .status(500)
        .json({ message: `Error fetching user ${req.params.id}`});
        console.error(err);
    }
};

const changePassword = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const cryptedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { username },
            { email },
            {
                password: cryptedPassword
            }
        );
        res
        .status(200)
        .json({ message: `OK`});
    } catch(Err) {
        res
        .status(500)
        .json({ message: `Error Updating Password Data`});
        console.log(Err);
    }
};

const update = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(user) {
            const { username, email } = user;
            user.email = email;
            user.username = req.body.name || username;

            const updated = await user.save();
            res
            .status(200)
            .json({
                username: updated.username,
                email: updated.email, 
            });
        }
        res
        .status(400)
        .json({ message: `Error updating user information` });
    } catch(err) {
        res
        .status(500)
        .json({ message: `Internal Server Error` })
        console.error(err);
    }
};

const deleteAcc = async(req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res
        .status(200)
        .json(deleteUser, 
            { message: `Succefully deleted`}
        );
    } catch(err) {
        res
        .status(500)
        .json({ message: `Error deleting account`});
        console.error(err);
    }
};

module.exports = { createUser, allUsers, usersById, changePassword, update, deleteAcc };