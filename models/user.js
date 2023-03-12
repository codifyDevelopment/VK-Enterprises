const { DataTypes } = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = db.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        role: {
            type: DataTypes.ENUM("gold", "platinum", "admin", "pending"),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        timestamps: false,
    }
);

User.prototype.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

User.beforeCreate(async (user, options) => {
    user.password = await user.hashPassword(user.password);
});

User.beforeUpdate(async (user, options) => {
    user.password = await user.hashPassword(user.password);
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

User.prototype.getSignedJwtToken = async function () {
    const token = await jwt.sign(
        { email: this.email, role: this.role },
        config.get("jwtSecret"),
        {
            expiresIn: "1d",
        }
    );
    return token;
};

module.exports = User;
