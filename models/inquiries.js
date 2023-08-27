const { DataTypes } = require("sequelize");
const db = require("../db");

const Inquiries = db.define(
    "inquiries",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inquiryAbout: {
            type: DataTypes.ENUM(
                "collect sample",
                "discussion",
                "place new order",
                "cancel order",
                "send gerber file",
                "other"
            ),
            allowNull: false,
        },
        inquiryText: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inquiryStatus: {
            type: DataTypes.ENUM("opened", "closed", "replied"),
            allowNull: false,
            defaultValue: "opened",
        },
        // nested reply [{
        //     reply: "string",
        //     replyBy: "string",
        //     replyAt: "date"
        // }]
        reply: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "[]",
            get() {
                return JSON.parse(this.getDataValue("reply"));
            },
            set(value) {
                if (value) this.setDataValue("reply", JSON.stringify(value));
            },
        },
    },
    {
        timestamps: true,
    }
);

Inquiries.beforeCreate((inquiry) => {
    // generate a random id string
    inquiry.id = Math.floor(Math.random() * 1000000000);
});

module.exports = Inquiries;
