const { DataTypes } = require("sequelize");
const db = require("../db");

const MCPCB = db.define(
    "MCPCB",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pcbName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        xDimension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yDimension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AnyOldReferenceDimensionFile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        AvailableAnySampleBody: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        LEDPackage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        TotalNumberOfLED: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DesignWatts: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DesignConnectionsSeries: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DesignConnectionsParllel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UsingDriverNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LedPlacement: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        SilkLegendLayer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        SolderMaskLayer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnySilkLegendLayerInformation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ForAnySolderMaskLayerInformation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ForAnyCopperLayerInformation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        RequiredStencile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        RequiredCAMPanelization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        RequiredBOM: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AnyDesignRelatingNoteQueries: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CarefullyCheckAll: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AllDesignsAreForSamplesOnly: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Urgent: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
);

module.exports = MCPCB;
