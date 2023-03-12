var express = require("express");
const isUserAuthenticated = require("../middleware/auth");
const User = require("../models/user");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express application" });
});

router.get("/login", async (req, res, next) => {
    res.sendFile("login.html", { root: "public/views" });
});

router.get("/register", async (req, res, next) => {
    res.sendFile("register.html", { root: "public/views" });
});

router.get("/wait-for-approval", async (req, res, next) => {
    res.sendFile("wait-for-approval.html", { root: "public/views" });
});

router.get("/dashboard", isUserAuthenticated, async (req, res, next) => {
    console.log(req.user);
    if (req.user.role === "pending") {
        return res.redirect("/wait-for-approval");
    }
    if (req.user.role === "admin") {
        return res.sendFile("admin-dashboard-home.html", {
            root: "public/views",
        });
    }
    if (req.user.role === "platinum") {
        return res.sendFile("platinum-dashboard-home.html", {
            root: "public/views",
        });
    }
    if (req.user.role === "gold") {
        return res.sendFile("gold-dashboard-home.html", {
            root: "public/views",
        });
    }
});

router.get("/redirect", async (req, res, next) => {
    return res.sendFile("redirect.html", { root: "public/views" });
});

module.exports = router;
