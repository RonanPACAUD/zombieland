const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class User extends Model {};

User.init({
    first_name: {
        type: DataTypes.STRING(64),
        allowNull: false
    }, 
    last_name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    address : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    city : {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(64),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "user"
});

module.exports = User;