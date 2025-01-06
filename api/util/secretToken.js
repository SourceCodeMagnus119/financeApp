require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * @param Id Signiture, Authentication.
 */
const createSecretToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60
    });
};

module.exports = createSecretToken;