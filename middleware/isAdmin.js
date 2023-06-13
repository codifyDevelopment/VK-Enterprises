const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");

const isAdmin = async (req, res, next) => {
    const token = req.cookies["token"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token, authorization denied",
        });
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        const user = await User.findByPk(decoded.email);
        if (!user || user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "Invalid token, authorization denied",
            });
        }
        req.user = user.toJSON();
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Invalid token, authorization denied",
        });
    }
};

module.exports = isAdmin;
