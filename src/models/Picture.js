const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Picture extends Model {};

Picture.init({
    pictures_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "picture"
});

module.exports = Picture;