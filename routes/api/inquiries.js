const express = require("express");
const isUserAuthenticated = require("../../middleware/auth");
const router = express.Router();

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

router.post("/update-status", isUserAuthenticated, async (req, res) => {
    const { id, inquiryStatus } = req.body;
    if (!id || !inquiryStatus)
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields",
        });
    try {
        if (inquiryStatus !== "opened" && inquiryStatus !== "closed") {
            return res.status(400).json({
                success: false,
                msg: "Invalid status",
            });
        }
        const inquiry = await Inquiry.findOne({
            where: {
                id,
            },
        });
        if (
            inquiry &&
            (req.user.role === "admin" || req.user.email === inquiry.createdBy)
        ) {
            await inquiry.update({
                inquiryStatus,
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
