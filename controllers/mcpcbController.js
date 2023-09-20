const MCPCB = require("../models/MCPCB");
const nodemailer = require("nodemailer");
const config = require("config");

const getOrders = async (req, res) => {
    try {
        const users = await MCPCB.findAll();
        users.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        res.status(200).json({
            success: true,
            data: users.filter((user) => user.role !== "admin"),
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getOrders,
};
