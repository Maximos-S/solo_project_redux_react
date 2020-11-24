'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
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
        foreignKey: "watchlistId"
      }
      Watchlist.belongsTo(models.User, {foreignKey: "userId"})
      Watchlist.belongsToMany(models.Stock, columnMapping)
    }
  };
  Watchlist.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Watchlist',
  });
  return Watchlist;
};