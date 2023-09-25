const express = require("express");
const DS = require("../../models/DS");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const {
    getOrders,
} = require("../../controllers/ds.controller")

router.get("/get-ds-order", isAdmin, getOrders);
module.exports = router;
