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
    }
  };
  Stock.init({
    companyName: DataTypes.STRING,
    symbol: DataTypes.STRING,
    percentChange: DataTypes.INTEGER,
    latestPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};