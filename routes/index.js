var express = require("express");
const isUserAuthenticated = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
const isAdmin = require("../middleware/isAdmin");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express application" });
});

router.get(
    "/login",
    async (req, res, next) => {
        const token = req.cookies["token"];
        try {
            const decoded = jwt.verify(token, config.get("jwtSecret"));
            if (decoded) {
                return res.redirect("/dashboard");
            }
        } catch (err) {
            console.log(err);
            return next();
        }
    },
    async (req, res, next) => {
        res.sendFile("login.html", { root: "public/views" });
    }
);

router.get(
    "/register",
    async (req, res, next) => {
        const token = req.cookies["token"];
        try {
            const decoded = jwt.verify(token, config.get("jwtSecret"));
            if (decoded) {
                return res.redirect("/dashboard");
            }
        } catch (err) {
            console.log(err);
            return next();
        }
    },
    async (req, res, next) => {
        res.sendFile("register.html", { root: "public/views" });
    }
);

router.get(
    "/wait-for-approval",
    // async (req, res, next) => {
    //     const token = req.cookies["token"];
    //     // const token = req.header("x-auth-token");
    //     if (!token) {
    //         return res.redirect("/login");
    //     }
    //     try {
    //         const decoded = jwt.verify(token, config.get("jwtSecret"));
    //         const user = await User.findByPk(decoded.email);
    //         if (!user) {
    //             return res.redirect("/login");
    //         }
    //         if (user.role !== "pending") {
    //             return res.redirect("/dashboard");
    //         }
    //         req.user = user.toJSON();
    //         next();
    //     } catch (err) {
    //         console.log(err);
    //         return res.redirect("/login");
    //     }
    // },
    async (req, res, next) => {
        res.sendFile("wait-for-approval.html", { root: "public/views" });
    }
);

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

router.get("/users", isAdmin, async (req, res, next) => {
    res.sendFile("admin-dashboard-users.html", { root: "public/views" });
});
router.get("/orders", isUserAuthenticated, async (req, res, next) => {
    if (req.user.role === "admin") {
        return res.sendFile("admin-dashboard-orders.html", {
            root: "public/views",
        });
    }
    if (req.user.role === "platinum") {
        return res.sendFile("platinum-dashboard-orders.html", {
            root: "public/views",
        });
    }
    if (req.user.role === "gold") {
        return res.sendFile("gold-dashboard-orders.html", {
            root: "public/views",
        });
    }
});

router.get("/redirect", async (req, res, next) => {
    return res.sendFile("redirect.html", { root: "public/views" });
});

module.exports = router;
