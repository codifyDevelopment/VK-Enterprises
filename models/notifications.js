const { DataTypes } = require("sequelize");
const db = require("../db");
const config = require("config");

const Notifications = db.define(
    "notifications",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        notificationFor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notificationText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        type: {
            type: DataTypes.ENUM("user", "order", "transaction", "inquiry"),
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

Notifications.beforeCreate((notification) => {
    notification.id = Math.floor(Math.random() * 1000000000);
});

module.exports = Notifications;
