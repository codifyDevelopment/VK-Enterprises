const express = require("express");
const router = express.Router();
const Product = require("../../models/products");

router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
