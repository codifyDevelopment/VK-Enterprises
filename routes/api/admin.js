const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const {
    getUsers,
    verifyUser,
    resetUser,
    addUser,
} = require("../../controllers/admin.controller");

router.get("/get-users-list", isAdmin, getUsers);
router.post("/verify-user", isAdmin, verifyUser);
router.post("/reset-user", isAdmin, resetUser);
router.post("/add-user", isAdmin, addUser);
module.exports = router;
