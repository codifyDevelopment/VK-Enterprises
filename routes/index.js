const express = require("express");
const passport = require("../helpers/passport");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

// Get services page located in public folder/services.html
router.get(
    "/get-started",
    function (req, res, next) {
        passport.authenticate("jwt", { session: false }, (err, user, info) => {
            if (user) {
                return res.redirect("/");
            }
            return next();
        })(req, res, next);
    },
    function (req, res) {
        res.sendFile("loginSignup.html", { root: "public/views" });
    }
);

router.get("/", isAuthenticated, function (req, res) {
    res.sendFile("services.html", { root: "public/views" });
});

router.get("/services", isAuthenticated, function (req, res, next) {
    res.sendFile("services.html", { root: "public/views" });
});

router.get("/inquiry", isAuthenticated, function (req, res, next) {
    res.sendFile("inquiry.html", { root: "public/views" });
});

router.get("/new-inquiry", isAuthenticated, function (req, res, next) {
    res.sendFile("newInquiry.html", { root: "public/views" });
});

router.get("/orders", isAuthenticated, function (req, res, next) {
    res.sendFile("orders.html", { root: "public/views" });
});

router.get("/new-order", isAuthenticated, function (req, res, next) {
    res.sendFile("newOrder.html", { root: "public/views" });
});

module.exports = router;
