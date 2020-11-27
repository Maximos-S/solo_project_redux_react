'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const columnMappingPortfolio = {
        through: "StocksInList",
        otherKey: "portfolioId",
        foreignKey: "stockId"
      }
      const columnMappingWatchlist = {
        through: "StocksInList",
        otherKey: "watchlistId",
        foreignKey: "stockId"
      }
      Stock.belongsToMany(models.Portfolio, columnMappingPortfolio)
      Stock.belongsToMany(models.Watchlist, columnMappingWatchlist)
      Stock.hasMany(models.StocksInList, {foreignKey: "stockId"})
    }
  };
  Stock.init({
    companyName: DataTypes.STRING,
    symbol: DataTypes.STRING,
    percentChange: DataTypes.INTEGER,
    latestPrice: DataTypes.INTEGER,
    lastUpdated: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};