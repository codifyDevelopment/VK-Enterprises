const express = require("express");
const isUserAuthenticated = require("../../middleware/auth");
const router = express.Router();
const Service = require("../../models/service");
const { Sequelize } = require("sequelize");

router.get("/get-all-services", isUserAuthenticated, async (req, res) => {
    try {
        console.log(req.user.role);
        if (req.user.role === "gold") {
            const services = await Service.findAll({
                attributes: [
                    "id",
                    "name",
                    "description",
                    "pricePerUnitForGoldUser",
                    "minimumSquareCmForGoldUser",
                    "minimumPriceForGoldUser",
                    "timeToDeliverForGoldUser",
                ],
            });
            services.sort((a, b) => {
                if (a.id === "MCPCB") {
                    return -1;
                } else if (b.id === "MCPCB") {
                    return 1;
                } else if (a.id === "SS") {
                    return -1;
                } else if (b.id === "SS") {
                    return 1;
                } else if (a.id === "DS") {
                    return -1;
                } else if (b.id === "DS") {
                    return 1;
                } else if (a.id === "MS") {
                    return -1;
                } else if (b.id === "MS") {
                    return 1;
                } else if (a.id === "S2P") {
                    return -1;
                } else if (b.id === "S2P") {
                    return 1;
                } else if (a.id === "STN") {
                    return -1;
                } else if (b.id === "STN") {
                    return 1;
                } else if (a.id === "CP") {
                    return -1;
                } else if (b.id === "CP") {
                    return 1;
                } else if (a.id === "SSUP") {
                    return -1;
                } else if (b.id === "SSUP") {
                    return 1;
                } else if (a.id === "DSUP") {
                    return -1;
                } else if (b.id === "DSUP") {
                    return 1;
                } else if (a.id === "S2PUP") {
                    return -1;
                } else if (b.id === "S2PUP") {
                    return 1;
                } else if (a.id === "URG") {
                    return -1;
                } else if (b.id === "URG") {
                    return 1;
                } else if (a.id === "BOM") {
                    return -1;
                } else if (b.id === "BOM") {
                    return 1;
                } else {
                    return 0;
                }
            });
            return res.status(200).json({
                success: true,
                data: services.map((service) => {
                    return {
                        id: service.id,
                        name: service.name,
                        description: service.description,
                        pricePerUnit: service.pricePerUnitForGoldUser,
                        minimumSquareCm: service.minimumSquareCmForGoldUser,
                        minimumPrice: service.minimumPriceForGoldUser,
                        timeToDeliver: service.timeToDeliverForGoldUser,
                    };
                }),
            });
        } else if (req.user.role === "platinum") {
            const services = await Service.findAll({
                attributes: [
                    "id",
                    "name",
                    "description",
                    "pricePerUnitForPlatinumUser",
                    "minimumSquareCmForPlatinumUser",
                    "minimumPriceForPlatinumUser",
                    "timeToDeliverForPlatinumUser",
                ],
            });
            // sort as MCPCB, SS, DS, MS, S2P, STN, CP, SSUP, DSUP, S2PUP, URG, BOM
            services.sort((a, b) => {
                if (a.id === "MCPCB") {
                    return -1;
                } else if (b.id === "MCPCB") {
                    return 1;
                } else if (a.id === "SS") {
                    return -1;
                } else if (b.id === "SS") {
                    return 1;
                } else if (a.id === "DS") {
                    return -1;
                } else if (b.id === "DS") {
                    return 1;
                } else if (a.id === "MS") {
                    return -1;
                } else if (b.id === "MS") {
                    return 1;
                } else if (a.id === "S2P") {
                    return -1;
                } else if (b.id === "S2P") {
                    return 1;
                } else if (a.id === "STN") {
                    return -1;
                } else if (b.id === "STN") {
                    return 1;
                } else if (a.id === "CP") {
                    return -1;
                } else if (b.id === "CP") {
                    return 1;
                } else if (a.id === "SSUP") {
                    return -1;
                } else if (b.id === "SSUP") {
                    return 1;
                } else if (a.id === "DSUP") {
                    return -1;
                } else if (b.id === "DSUP") {
                    return 1;
                } else if (a.id === "S2PUP") {
                    return -1;
                } else if (b.id === "S2PUP") {
                    return 1;
                } else if (a.id === "URG") {
                    return -1;
                } else if (b.id === "URG") {
                    return 1;
                } else if (a.id === "BOM") {
                    return -1;
                } else if (b.id === "BOM") {
                    return 1;
                } else {
                    return 0;
                }
            });
            return res.status(200).json({
                success: true,
                data: services.map((service) => {
                    return {
                        id: service.id,
                        name: service.name,
                        description: service.description,
                        pricePerUnit: service.pricePerUnitForPlatinumUser,
                        minimumSquareCm: service.minimumSquareCmForPlatinumUser,
                        minimumPrice: service.minimumPriceForPlatinumUser,
                        timeToDeliver: service.timeToDeliverForPlatinumUser,
                    };
                }),
            });
        } else {
            const services = await Service.findAll();
            return res.status(200).json({
                success: true,
                data: services,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
});

module.exports = router;
