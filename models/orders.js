const { DataTypes } = require("sequelize");
const db = require("../db");

const Orders = db.define(
    "Orders",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricePerUnitForGoldUser: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null,
        },
        minimumSquareCmForGoldUser: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null,
        },
        minimumPriceForGoldUser: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        timeToDeliverForGoldUser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricePerUnitForPlatinumUser: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null,
        },
        minimumSquareCmForPlatinumUser: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null,
        },
        minimumPriceForPlatinumUser: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        timeToDeliverForPlatinumUser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Orders;
