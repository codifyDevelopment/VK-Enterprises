const express = require("express");
const router = express.Router();
const passport = require("../helpers/passport");
const { createToken } = require("../helpers/token");

// authenticate user with Local strategy and save the user in the database
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/get-started" }),
    async (req, res) => {
        const token = await createToken(req.user);
        res.cookie("jwt", token, { httpOnly: true, secure: true });
        res.redirect("/");
    }
);

module.exports = router;
