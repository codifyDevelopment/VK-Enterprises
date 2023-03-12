const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// register a new user if not already registered
// if already registered and verified, redirect to dashboard
// if not registered, register and redirect to wait for verification page
passport.use(
    new GoogleStrategy(
        {
            clientID: config.get("googleClientID"),
            clientSecret: config.get("googleClientSecret"),
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const ifUserExists = await User.findByPk(profile.emails[0].value);
            if (ifUserExists) {
                return done(null, ifUserExists);
            }
            const newUser = await User.create({
                email: profile.emails[0].value,
                password: profile.id,
            });
            const transporter = nodemailer.createTransport(
                config.get("nodemailer")
            );
            const ClientMailOptions = {
                from: config.get("nodemailer").auth.user,
                to: newUser.email,
                subject:
                    "We're in the process of verifying your account. Sit back and relax for a bit!",
                text: "You're one step closer! You've created an account with us, but we need to verify your account and identity. It may take up to 24 hours, but we'll get back to you as soon as possible. Thank you for your patience and loyalty. If you have any questions, please contact us at support@example.com or 1-800-123-4567.",
            };
            await transporter.sendMail(ClientMailOptions);
            const AdminMailOptions = {
                from: config.get("nodemailer").auth.user,
                to: config.get("adminEmail"),
                subject: "New user registered",
                text: `A new user has registered with the email ${newUser.email}. Please verify their account and identity. Thank you!`,
            };
            await transporter.sendMail(AdminMailOptions);
            return done(null, newUser);
        }
    )
);

// serialize user
passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user.email);
});

// deserialize user
passport.deserializeUser(async (email, done) => {
    const user = await User.findByPk(email);
    done(null, user);
});

router.get(
    "/google",
    (req, res, next) => {
        const token = req.cookies["token"];
        if (token) {
            return res.redirect("/dashboard");
        }
        next();
    },
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    async (req, res) => {
        if (req.user.role == "pending") {
            res.redirect("/wait-for-approval");
        } else {
            // console.log(req.user);
            const token = await req.user.getSignedJwtToken();
            // console.log(token);
            return res
                .cookie("token", token, {
                    maxAge: 1000 * 60 * 60 * 24, // 1 day
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                })
                .redirect("/redirect");
        }
    }
);

module.exports = router;
