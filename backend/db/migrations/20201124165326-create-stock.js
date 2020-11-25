'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      symbol: {
        type: Sequelize.STRING(4),
        allowNull: false,
        unique: true
      },
      percentChange: {
        type: Sequelize.NUMERIC
      },
      latestPrice: {
        type: Sequelize.NUMERIC
      },
      lastUpdated: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stocks');
  }
};