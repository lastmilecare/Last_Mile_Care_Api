'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CHOLESTEROLs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_cholesterol_standard_value_min: {
        type: Sequelize.STRING
      },
      total_cholesterol_standard_value_max: {
        type: Sequelize.STRING
      },
      total_cholesterol_within_deviation_value_min: {
        type: Sequelize.STRING
      },
      total_cholesterol_within_deviation_value_max: {
        type: Sequelize.STRING
      },
      total_cholesterol_out_of_range: {
        type: Sequelize.STRING
      },
      total_cholesterol_units: {
        type: Sequelize.STRING
      },
      ld_cholesterol_standard_value_min: {
        type: Sequelize.STRING
      },
      ld_cholesterol_standard_value_max: {
        type: Sequelize.STRING
      },
      ld_cholesterol_within_deviation_value_min: {
        type: Sequelize.STRING
      },
      ld_cholesterol_within_deviation_value_max: {
        type: Sequelize.STRING
      },
      ld_cholesterol_out_of_range: {
        type: Sequelize.STRING
      },
      ld_cholesterol_units: {
        type: Sequelize.STRING
      },
      hd_cholesterol_standard_value_min: {
        type: Sequelize.STRING
      },
      hd_cholesterol_standard_value_max: {
        type: Sequelize.STRING
      },
      hd_cholesterol_within_deviation_value_min: {
        type: Sequelize.STRING
      },
      hd_cholesterol_within_deviation_value_max: {
        type: Sequelize.STRING
      },
      hd_cholesterol_out_of_range: {
        type: Sequelize.STRING
      },
      hd_cholesterol_units: {
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
    await queryInterface.dropTable('CHOLESTEROLs');
  }
};