'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StocksInLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portfolioId: {
        type: Sequelize.INTEGER,
        references: {model: "Portfolios"}
      },
      watchlistId: {
        type: Sequelize.INTEGER,
        references: {model: "Watchlists"}
      },
      stockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "Stocks"}
      },
      shares: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.NUMERIC
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StocksInLists');
  }
};