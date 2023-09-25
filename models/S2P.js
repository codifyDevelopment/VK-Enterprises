const { DataTypes } = require("sequelize");
const db = require("../db");

const S2P = db.define(
    "S2P",
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
        SchamticDrawingFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        SchamticBillOfMaterialFile: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        SchamticToPCBLayers: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PCBDimensionFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        TrackRelatedCommentsGuide: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LayersRelatedAnyCommentsGuide: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AnyLayoutReferanceArreagemntFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AnyRelatedAnyTypeCommentsGuide: {
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

module.exports = S2P;
