'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      debitedAccountId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'accounts',
            key: 'id',
          },
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      creditedAccountId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'accounts',
            key: 'id',
          },
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      value: {
        type: Sequelize.FLOAT
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('transactions');
  }
};
