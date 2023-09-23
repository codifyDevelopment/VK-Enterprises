const express = require("express");
const isUserAuthenticated = require("../../middleware/auth");
const router = express.Router();

const Orders = require("../../models/orders");

router.get("/get-all", isUserAuthenticated, async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            data: "working"
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;