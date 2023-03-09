const { createToken } = require("../helpers/token");
const db = require("../models");

const signupController = async (req, res) => {
    if (!req.body.email)
        return res.status(400).json({ message: "Email is required" });
    if (!req.body.password)
        return res.status(400).json({ message: "Password is required" });
    try {
        const userExists = await db.User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const user = await db.User.create({
            email: req.body.email,
            password: req.body.password,
        });
        const token = await createToken(user);
        res.cookie("jwt", token, { httpOnly: true, secure: true });
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/get-started");
    }
};

const successfulLoginController = async (req, res) => {
    const token = await createToken(req.user);
    res.cookie("jwt", token, { httpOnly: true, secure: true });
    res.redirect("/");
};

module.exports = {
    successfulLoginController,
    signupController,
};
