const MCPCB = require("../models/MCPCB");
const nodemailer = require("nodemailer");
const config = require("config");

const getOrders = async (req, res) => {
    try {
        const allData = await MCPCB.findAll();
        res.status(200).json({
            success: true,
            data: allData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
};

const addOrders = async (req, res) => {
    try {
        console.log(req.body);
        const allData = await MCPCB.create({
            userEmail: `${req.body}`,
            pcbName: `${req.body}`,
            xDimension: `${req.body}`,
            yDimension: `${req.body}`,
            AnyOldReferenceDimensionFile: `${req.body}`,
            AvailableAnySampleBody: `${req.body}`,
            LEDPackage: `${req.body}`,
            DesignConnectionsSeries: `${req.body}`,
            DesignConnectionsParllel: `${req.body}`,
            LedPlacement: `${req.body}`,
            SilkLegendLayer: `${req.body}`,
            SolderMaskLayer: `${req.body}`,
            ForAnyCopperLayerInformation: `${req.body}`,
            RequiredStencile: `${req.body}`,
            RequiredCAMPanelization: `${req.body}`,
            RequiredBOM: `${req.body}`,
            AnyDesignRelatingNoteQueries: `${req.body}`,
            CarefullyCheckAll: `${req.body}`,
            AllDesignsAreForSamplesOnly: `${req.body}`,
        });

        res.status(200).json({
            success: true,
            data: allData,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getOrders,
    addOrders,
};
