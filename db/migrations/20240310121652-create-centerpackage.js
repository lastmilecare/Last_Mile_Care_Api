'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Centerpackages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      package_price: {
        type: Sequelize.STRING
      },
      package_frequency: {
        type: Sequelize.STRING
      },
      package_id: {
        type: Sequelize.BIGINT,

      },
      center_id: {
        type: Sequelize.BIGINT,

      },
      status: {
        type: Sequelize.BOOLEAN,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Centerpackages');
  }
};