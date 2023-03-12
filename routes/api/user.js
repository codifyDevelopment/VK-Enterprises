const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const config = require("config");
const User = require("../../models/user");

router.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email)
        return res
            .status(400)
            .json({ success: false, message: "Please provide an email" });
    if (!password)
        return res
            .status(400)
            .json({ success: false, message: "Please provide a password" });

    try {
        const doesUserExist = await User.findByPk(email);
        if (doesUserExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const user = await User.create({
            email,
            password,
        });
        const transporter = nodemailer.createTransport(
            config.get("nodemailer")
        );
        const ClientMailOptions = {
            from: config.get("nodemailer").auth.user,
            to: email,
            subject:
                "We're in the process of verifying your account. Sit back and relax for a bit!",
            text: "You're one step closer! You've created an account with us, but we need to verify your account and identity. It may take up to 24 hours, but we'll get back to you as soon as possible. Thank you for your patience and loyalty. If you have any questions, please contact us at support@example.com or 1-800-123-4567.",
        };
        await transporter.sendMail(ClientMailOptions);
        const AdminMailOptions = {
            from: config.get("nodemailer").auth.user,
            to: config.get("adminEmail"),
            subject: "New user registered",
            text: `A new user has registered with the email ${email}. Please verify their account and identity. Thank you!`,
        };
        await transporter.sendMail(AdminMailOptions);
        return res.status(201).json({
            success: true,
            data: user.toJSON(),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
});

router.post("/login", async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email)
        return res
            .status(400)
            .json({ success: false, message: "Please provide an email" });
    if (!password)
        return res
            .status(400)
            .json({ success: false, message: "Please provide a password" });

    try {
        const user = await User.findByPk(email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = user.getSignedJwtToken();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 86400000), // 1 day
            httpOnly: true,
        });
        return res.status(200).json({
            success: true,
            data: user.toJSON(),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
});

router.get("/logout", async (req, res, next) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logged out",
    });
});

module.exports = router;
