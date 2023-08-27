const User = require("../models/user");
const nodemailer = require("nodemailer");
const config = require("config");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        users.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
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
        // if (user.role !== "pending") {
        //     return res.status(400).json({
        //         success: false,
        //         message: "User already verified",
        //     });
        // }
        // Update user role
        user.role = role;
        // TODO: Send email to user only in production
        // if (
        //     process.env.NODE_ENV === "production" ||
        //     process.env.env === "production"
        // ) {
        //     const transporter = nodemailer.createTransport(
        //         config.get("nodemailer")
        //     );
        //     const ClientMailOptions = {
        //         from: config.get("nodemailer").auth.user,
        //         to: email,
        //         subject: "Your account has been verified - VK ENTERPRISES",
        //         text: `your account is now verified, you can now go to https://vktech.info and login to your account. Thank you for your patience and loyalty. If you have any questions, please contact us at ${config.get(
        //             "adminEmail"
        //         )} or 1-800-123-4567.`,
        //     };
        //     await transporter.sendMail(ClientMailOptions);
        // }

        await user.save();

        return res.status(200).json({
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

const resetUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
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
        user.role = "pending";
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User reset",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
};

const addUser = async (req, res) => {
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
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const password = Math.random().toString(36).slice(-8);
        // if (
        //     process.env.NODE_ENV === "production" ||
        //     process.env.env === "production"
        // ) {
        //     const transporter = nodemailer.createTransport(
        //         config.get("nodemailer")
        //     );
        //     const ClientMailOptions = {
        //         from: config.get("nodemailer").auth.user,
        //         to: email,
        //         subject: "Your account has been created - VK ENTERPRISES",
        //         text: `your account has been created, you can now go to https://vktech.info and login to your account. Your password is ${password}. Thank you for your patience and loyalty. If you have any questions, please contact us at ${config.get(
        //             "adminEmail"
        //         )} or 1-800-123-4567.`,
        //     };
        //     await transporter.sendMail(ClientMailOptions);
        // }
        await User.create({
            email,
            password,
            role,
        });

        return res.status(200).json({
            success: true,
            message: "User added",
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
    resetUser,
    addUser,
};
