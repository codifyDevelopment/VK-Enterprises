const express = require("express");
const isUserAuthenticated = require("../../middleware/auth");
const router = express.Router();
const config = require("config");
const nodemailer = require("nodemailer");
const Notifications = require("../../models/notifications");

const Inquiry = require("../../models/inquiries");

router.get("/get-inquiries", isUserAuthenticated, async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const inquiries = await Inquiry.findAll();
            return res.status(200).json({
                success: true,
                inquiries,
            });
        } else {
            const inquiries = await Inquiry.findAll({
                where: {
                    createdBy: req.user.email,
                },
            });
            // sort using createdAt
            inquiries.sort((a, b) => {
                if (new Date(a.createdAt) > new Date(b.createdAt)) {
                    return -1;
                } else if (new Date(a.createdAt) < new Date(b.createdAt)) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return res.status(200).json({
                success: true,
                inquiries,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
});

router.post("/create-inquiry", isUserAuthenticated, async (req, res) => {
    const { inquiryAbout, inquiryText } = req.body;
    if (!inquiryAbout)
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields",
        });

    try {
        if (req.user.role !== "admin") {
            // const transporter = nodemailer.createTransport(
            //     config.get("nodemailer")
            // );
            // const AdminMailOptions = {
            //     from: config.get("nodemailer").auth.user,
            //     to: config.get("adminEmail"),
            //     subject: "New inquiry created",
            //     text: `A new inquiry has been created by ${req.user.email}. Please check the admin panel for more details. Thank you!`,
            // };
            // (process.env.NODE_ENV === "production" ||
            //     process.env.env === "production") &&
            //     (await transporter.sendMail(AdminMailOptions));
            await Notifications.create({
                notificationFor: config.get("adminEmail"),
                notificationText: `A new inquiry has been created by ${req.user.email}`,
                type: "inquiry",
            });
            const inquiry = await Inquiry.create({
                createdBy: req.user.email,
                inquiryAbout,
                inquiryText: inquiryText ? inquiryText : null,
            });
            return res.status(200).json({
                success: true,
                inquiry,
            });
        } else {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
});

// router.post("/update-status", isUserAuthenticated, async (req, res) => {
//     const { id, inquiryStatus } = req.body;
//     if (!id || !inquiryStatus)
//         return res.status(400).json({
//             success: false,
//             msg: "Please fill all the fields",
//         });
//     try {
//         if (inquiryStatus !== "opened" && inquiryStatus !== "closed") {
//             return res.status(400).json({
//                 success: false,
//                 msg: "Invalid status",
//             });
//         }
//         const inquiry = await Inquiry.findOne({
//             where: {
//                 id,
//             },
//         });
//         if (
//             inquiry &&
//             (req.user.role === "admin" || req.user.email === inquiry.createdBy)
//         ) {
//             await inquiry.update({
//                 inquiryStatus,
//             });
//             return res.status(200).json({
//                 success: true,
//                 inquiry,
//             });
//         } else {
//             return res.status(401).json({
//                 success: false,
//                 msg: "Unauthorized",
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             msg: "Server error",
//         });
//     }
// });

router.post("/close-inquiry", isUserAuthenticated, async (req, res) => {
    const { id } = req.body;
    if (!id)
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields",
        });
    try {
        const inquiry = await Inquiry.findOne({
            where: {
                id,
            },
        });
        if (
            inquiry &&
            (req.user.role === "admin" || req.user.email === inquiry.createdBy)
        ) {
            if (req.user.role === "admin") {
                // send user a mail that the inquiry has been closed
                // const transporter = nodemailer.createTransport(
                //     config.get("nodemailer")
                // );
                // const UserMailOptions = {
                //     from: config.get("nodemailer").auth.user,
                //     to: inquiry.createdBy,
                //     subject: "Inquiry closed",
                //     text: `Your inquiry has been closed by the admin. Please check your dashboard for more details. If you have any further queries, please create a new inquiry. Thank you!`,
                // };
                // (process.env.NODE_ENV === "production" ||
                //     process.env.env === "production") &&
                //     (await transporter.sendMail(UserMailOptions));
                await Notifications.create({
                    notificationFor: inquiry.createdBy,
                    notificationText: `Your inquiry has been closed by the admin`,
                    type: "inquiry",
                });
            }
            await inquiry.update({
                inquiryStatus: "closed",
            });
            return res.status(200).json({
                success: true,
                inquiry,
            });
        } else {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
});

router.post("/reply", isUserAuthenticated, async (req, res) => {
    const { id, reply } = req.body;
    if (!reply) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields",
        });
    }
    const inquiry = await Inquiry.findOne({
        where: {
            id,
        },
    });
    if (
        inquiry &&
        (inquiry.createdBy === req.user.email || req.user.role === "admin")
    ) {
        if (inquiry.inquiryStatus === "closed") {
            return res.status(400).json({
                success: false,
                msg: "This inquiry is already closed",
            });
        }
        if (req.user.role === "admin") {
            // const transporter = nodemailer.createTransport(
            //     config.get("nodemailer")
            // );
            // const userMailOptions = {
            //     from: config.get("nodemailer").auth.user,
            //     to: inquiry.createdBy,
            //     subject: "Reply to your inquiry",
            //     text: `A reply has been sent to your inquiry. Please check the dashboard for more details. Thank you!`,
            // };
            // (process.env.NODE_ENV === "production" ||
            //     process.env.env === "production") &&
            //     (await transporter.sendMail(userMailOptions));
            await Notifications.create({
                notificationFor: inquiry.createdBy,
                notificationText: `A reply has been sent to your inquiry`,
                type: "inquiry",
            });
        } else {
            // const transporter = nodemailer.createTransport(
            //     config.get("nodemailer")
            // );
            // const AdminMailOptions = {
            //     from: config.get("nodemailer").auth.user,
            //     to: config.get("adminEmail"),
            //     subject: "Reply to an inquiry",
            //     text: `A reply has been sent to an inquiry. Please check the admin panel for more details. Thank you!`,
            // };
            // (process.env.NODE_ENV === "production" ||
            //     process.env.env === "production") &&
            //     (await transporter.sendMail(AdminMailOptions));
            await Notifications.create({
                notificationFor: config.get("adminEmail"),
                notificationText: `A reply has been sent to an inquiry`,
                type: "inquiry",
            });
        }
        const replyObj = {
            reply,
            replyBy: req.user.email,
            replyAt: new Date(),
        };
        const newReply = [...inquiry.reply, replyObj];
        await inquiry.update({
            reply: newReply,
            inquiryStatus: "replied",
        });
        return res.status(200).json({
            success: true,
            inquiry,
        });
    } else {
        return res.status(401).json({
            success: false,
            msg: "Unauthorized",
        });
    }
});

module.exports = router;
