'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Portfolios", [
      {
          userId: 1,
          buyingPower: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Portfolios', {
      userId: { [Op.in]: [1] }
    }, {});
  }
};
