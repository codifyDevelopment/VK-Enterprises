const { DataTypes } = require("sequelize");
const db = require("../db");

const Product = db.define(
    "product",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricePerUnitForGoldUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pricePerUnitForPlatinumUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        minimumPriceForGoldUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        minimumPriceForPlatinumUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        minimumSquareCmForGoldUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        minimumSquareCmForPlatinumUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        timeToDeliverForGoldUser: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        timeToDeliverForPlatinumUser: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Product;
