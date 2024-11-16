const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Category extends Model {};

Category.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "category"
});

module.exports = Category;