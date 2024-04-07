'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bloodpressures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      systolic_standard_value_min: Sequelize.INTEGER,
      systolic_standard_value_max: Sequelize.INTEGER,
      systolic_within_deviation_value_min: Sequelize.INTEGER,
      systolic_within_deviation_value_max: Sequelize.INTEGER,
      systolic_units: Sequelize.STRING,
      systolic_out_of_range: Sequelize.INTEGER,

      diastolic_standard_value_min: Sequelize.INTEGER,
      diastolic_standard_value_max: Sequelize.INTEGER,
      diastolic_within_deviation_value_min: Sequelize.INTEGER,
      diastolic_within_deviation_value_max: Sequelize.INTEGER,
      diastolic_units: Sequelize.STRING,
      diastolic_out_of_range: Sequelize.INTEGER,

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
    await queryInterface.dropTable('Bloodpressures');
  }
};