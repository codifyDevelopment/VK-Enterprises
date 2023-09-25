const express = require("express");
const MS = require("../../models/MS");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const {
    getOrders,
} = require("../../controllers/ms.controller")

router.get("/get-ms-order", isAdmin, getOrders);
module.exports = router;
