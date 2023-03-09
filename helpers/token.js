const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

// create token
const createToken = async (user) => {
    const token = await jsonwebtoken.sign(
        {
            username: user.username,
            email: user.email,
            googleId: user.googleId,
        },
        config.get("jwtSecret"),
        {
            expiresIn: 3600,
        }
    );
    return token;
};

// verify token
const verifyToken = async (token) => {
    try {
        const decoded = await jsonwebtoken.verify(
            token,
            config.get("jwtSecret")
        );
        return decoded;
    } catch (err) {
        return false;
    }
};

module.exports = {
    createToken,
    verifyToken,
};
