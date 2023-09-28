const express = require("express");
const MCPCB = require("../../models/MCPCB");
const router = express.Router();
const isUserAuthenticated = require("../../middleware/auth");
const {
    getOrders,
    addOrders
} = require("../../controllers/mcpcbController")

router.get("/get-mcpcb-order", isUserAuthenticated, getOrders);
router.post("/add-mcpcb-order", isUserAuthenticated, addOrders);
module.exports = router;
