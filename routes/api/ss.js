const express = require("express");
const SS = require("../../models/SS");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const {
    getOrders,
} = require("../../controllers/ss.controller")

router.get("/get-ss-order", isAdmin, getOrders);
module.exports = router;
