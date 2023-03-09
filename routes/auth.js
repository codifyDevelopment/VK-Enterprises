const express = require("express");
const {
    successfulLoginController,
    signupController,
} = require("../controllers/authController");
const router = express.Router();
const passport = require("../helpers/passport");

// authenticate user with google strategy and save the user in the database
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/get-started" }),
    successfulLoginController
);

router.post("/signup", signupController);

router.post(
    "/login",
    (req, res, next) => {
        if (!req.body.email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }
        if (!req.body.password) {
            return res.status(400).json({
                message: "Password is required",
            });
        }
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({
                    message: "Incorrect email or password",
                });
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Incorrect email or password",
                    });
                }
                next();
            });
        })(req, res, next);
    },
    successfulLoginController
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.clearCookie("jwt");
        res.redirect("/get-started");
    });
});

module.exports = router;
