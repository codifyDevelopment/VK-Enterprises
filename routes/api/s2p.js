const express = require("express");
const S2P = require("../../models/S2P");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const {
    getOrders,
} = require("../../controllers/s2p.controller")

router.get("/get-s2p-order", isAdmin, getOrders);
module.exports = router;
