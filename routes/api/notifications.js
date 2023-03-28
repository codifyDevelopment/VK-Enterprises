const express = require("express");
const isUserAuthenticated = require("../../middleware/auth");
const router = express.Router();

const Notifications = require("../../models/notifications");

router.get("/get-all", isUserAuthenticated, async (req, res) => {
    try {
        const notifications = await Notifications.findAll(
            {
                where: {
                    notificationFor: req.user.email,
                },
            },
            {
                order: [["createdAt", "ASC"]],
            }
        );

        // count unread notifications
        const unreadNotificationsCount = await Notifications.count({
            where: {
                notificationFor: req.user.email,
                read: false,
            },
        });

        return res.status(200).json({
            success: true,
            notifications,
            unreadNotificationsCount,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/mark-as-read", isUserAuthenticated, async (req, res) => {
    try {
        await Notifications.update(
            {
                read: true,
            },
            {
                where: {
                    notificationFor: req.user.email,
                    read: false,
                },
            }
        );

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
