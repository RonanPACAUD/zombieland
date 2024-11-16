const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Attraction extends Model {};

Attraction.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "attraction"
});

module.exports = Attraction;