var express = require("express");
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

module.exports = router;
