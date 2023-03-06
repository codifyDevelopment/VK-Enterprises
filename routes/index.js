var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

// Get services page located in public folder/services.html

router.get("/services", function (req, res, next) {
    res.sendFile("services.html", { root: "public/views" });
});

router.get("/inquiry", function (req, res, next) {
    res.sendFile("inquiry.html", { root: "public/views" });
});

router.get("/new-inquiry", function (req, res, next) {
    res.sendFile("newInquiry.html", { root: "public/views" });
});

router.get("/orders", function (req, res, next) {
    res.sendFile("orders.html", { root: "public/views" });
});

router.get("/new-order", function (req, res, next) {
    res.sendFile("newOrder.html", { root: "public/views" });
});

module.exports = router;
