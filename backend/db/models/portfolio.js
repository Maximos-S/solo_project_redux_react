'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const columnMapping = {
        through: "StocksInList",
        otherKey: "stockId",
        foreignKey: "portfolioId"
      }
      Portfolio.belongsTo(models.User, {foreignKey: "userId"})
      Portfolio.belongsToMany(models.Stock, columnMapping)
      Portfolio.hasMany(models.StocksInList, {foreignKey: "portfolioId"})
    }
  };
  Portfolio.init({
    userId: DataTypes.INTEGER,
    buyingPower: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};