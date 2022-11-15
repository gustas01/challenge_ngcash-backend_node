'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'accounts',
            key: 'id',
          }
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
