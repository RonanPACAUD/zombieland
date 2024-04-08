const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Price extends Model {};

Price.init({
    hotel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "price"
});

module.exports = Price;