'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 100,
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
