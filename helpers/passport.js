const passport = require("passport");
const config = require("config");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;

const db = require("../models");

// authenticate user with local strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, cb) => {
            try {
                const userExists = await db.User.findOne({
                    where: {
                        email,
                    },
                });
                if (!userExists) {
                    return cb(null, false, { message: "Incorrect email." });
                }
                const validPassword = await userExists.validPassword(password);
                if (!validPassword) {
                    return cb(null, false, { message: "Incorrect password." });
                }
                return cb(null, userExists);
            } catch (err) {
                console.log(err);
                return cb(err);
            }
        }
    )
);

// authenticate user with google strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: config.get("google.clientID"),
            clientSecret: config.get("google.clientSecret"),
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const userExists = await db.User.findOne({
                    where: {
                        googleId: profile.id,
                    },
                });
                if (userExists) {
                    return cb(null, userExists);
                }
                const user = await db.User.create({
                    email: profile.emails[0].value,
                    password: "",
                    googleId: profile.id,
                });
                return cb(null, user);
            } catch (err) {
                console.log(err);
                return cb(err);
            }
        }
    )
);

// authenticate user with jwt strategy
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: (req) => req.cookies.jwt,
            secretOrKey: config.get("jwtSecret"),
        },
        async (jwt_payload, cb) => {
            try {
                const user = await db.User.findOne({
                    where: {
                        email: jwt_payload.email,
                    },
                });
                if (!user) {
                    return cb(null, false);
                }
                return cb(null, user);
            } catch (err) {
                console.log(err);
                return cb(err);
            }
        }
    )
);
module.exports = passport;
