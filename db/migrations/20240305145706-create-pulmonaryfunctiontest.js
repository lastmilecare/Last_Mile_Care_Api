'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pulmonaryfunctiontests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      standard_value_min: {
        type: Sequelize.STRING
      },
      standard_value_max: {
        type: Sequelize.STRING
      },
      within_deviation_value_min: {
        type: Sequelize.STRING
      },
      within_deviation_value_max: {
        type: Sequelize.STRING
      },
      out_of_range: {
        type: Sequelize.STRING
      },
      units: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Pulmonaryfunctiontests');
  }
};