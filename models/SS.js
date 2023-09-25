const { DataTypes } = require("sequelize");
const db = require("../db");

const SS = db.define(
    "SS",
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
        PCBDesignType: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        SILKLegendLayer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnySilkLegendLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnySolderMaskLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnyCopperLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
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

module.exports = SS;
