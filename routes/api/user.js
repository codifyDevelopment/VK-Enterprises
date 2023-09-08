const express = require("express");
const router = express.Router();

const {
    registerController,
    loginController,
    logoutController,
    userCount,
} = require("../../controllers/user.controller");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/user-count", userCount);

module.exports = router;
