const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const config = require("config");

router.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    console.log({
        email,
        password,
    });
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    console.log({
        email,
        password,
    });
});

router.get("/send-email", async (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport(
            config.get("nodemailer")
        );
        const info = await transporter.sendMail({
            from: `"Fred Foo 👻" <${config.get("nodemailer").auth.user}>`, // sender address
            to: "sudiptapradhan58271@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `"<b>Hello world?</b>"`, // html body
        });
        return res.send("Email sent");
    } catch (err) {
        return res.status(500).send("Server error");
    }
});

module.exports = router;
