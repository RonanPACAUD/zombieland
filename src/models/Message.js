const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Message extends Model {};

Message.init({
    subject: {
        type: DataTypes.TEXT,
        allowNull: false
    }, 
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    closed: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    tableName: "message"
});

module.exports = Message;