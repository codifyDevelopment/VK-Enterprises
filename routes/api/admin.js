const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");

router.get("/users", isAdmin, async (req, res) => {
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
});

router.post("/verify-user", isAdmin, async (req, res) => {
    try {
        const { email, role } = req.body;
        if (!email || !role) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
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
});

module.exports = router;
