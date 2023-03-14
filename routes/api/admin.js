const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const { getUsers, verifyUser } = require("../../controllers/admin.controller");

router.get("/users", isAdmin, getUsers);

router.post("/verify-user", isAdmin, verifyUser);

module.exports = router;
