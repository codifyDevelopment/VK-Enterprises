const express = require("express");
const isUserAuthenticated = require("../../middleware/auth");
const router = express.Router();
const Service = require("../../models/service");

router.get("/get-all-services", isUserAuthenticated, async (req, res) => {
    try {
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
            return res.status(200).json({
                success: true,
                data: {
                    id: services.id,
                    name: services.name,
                    description: services.description,
                    pricePerUnit: services.pricePerUnitForPlatinumUser,
                    minimumSquareCm: services.minimumSquareCmForPlatinumUser,
                    minimumPrice: services.minimumPriceForPlatinumUser,
                    timeToDeliver: services.timeToDeliverForPlatinumUser,
                },
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
