const User = require("../models/user");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            success: true,
            data: users.filter((user) => user.role !== "admin"),
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
};

const verifyUser = async (req, res) => {
    try {
        const { email, role } = req.body;
        if (!email || !role) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            });
        }
        if (role !== "gold" && role !== "platinum") {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }
        const user = await User.findByPk(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (user.role !== "pending") {
            return res.status(400).json({
                success: false,
                message: "User already verified",
            });
        }
        // Update user role
        user.role = role;
        await user.save();
        res.status(200).json({
            success: true,
            message: "User verified",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getUsers,
    verifyUser,
};
