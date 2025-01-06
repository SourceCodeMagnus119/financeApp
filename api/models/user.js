const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: [true, "Username Is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    subscibedToNewsletter: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
userSchema.pre("save", async(password) => {
    this.password = await bcrypt.hash(password, 10);
});

module.exports = mongoose.model("User", userSchema);