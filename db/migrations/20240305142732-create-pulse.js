'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pulses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      standard_value_min: {
        type: Sequelize.INTEGER
      },
      standard_value_max: {
        type: Sequelize.INTEGER
      },
      within_deviation_value_min: {
        type: Sequelize.INTEGER
      },
      within_deviation_value_max: {
        type: Sequelize.INTEGER
      },
      out_of_range: {
        type: Sequelize.INTEGER
      },
      units: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Pulses');
  }
};