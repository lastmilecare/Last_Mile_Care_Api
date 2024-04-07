'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Haemoglobins', {
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
      units: {
        type: Sequelize.STRING
      },
      out_of_range: {
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
    await queryInterface.dropTable('Haemoglobins');
  }
};