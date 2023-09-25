const { DataTypes } = require("sequelize");
const db = require("../db");

const DS = db.define(
    "DS",
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
        TopSilkLegendLayer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BottomSilkLegendLayer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnyTopSilkLegendLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnyTopSolderMaskLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnyTopCopperLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnyBottomSilkLegendLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnyBottomSolderMaskLayerInformation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ForAnyBottomCopperLayerInformation: {
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

module.exports = DS;
