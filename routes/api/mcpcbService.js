const express = require("express");
const MCPCB = require("../../models/MCPCB");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const {
    getOrders,
} = require("../../controllers/mcpcbController")

router.get("/get-mcpcb-order", isAdmin, getOrders);
module.exports = router;
