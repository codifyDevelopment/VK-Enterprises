const bcrypt = require("bcrypt");

module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define(
        "user",
        {
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            googleId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    );
    User.beforeCreate(async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    });

    User.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};
