const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Booking extends Model {};

Booking.init({
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }, 
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nb_people: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hotel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    closed: {
        type: DataTypes.BOOLEAN,
    }
}, {
    sequelize,
    tableName: "booking"
});

module.exports = Booking;