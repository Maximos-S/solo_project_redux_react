'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StocksInList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StocksInList.init({
    portfolioId: DataTypes.INTEGER,
    watchlistId: DataTypes.INTEGER,
    stockId: DataTypes.INTEGER,
    shares: DataTypes.INTEGER,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StocksInList',
  });
  return StocksInList;
};