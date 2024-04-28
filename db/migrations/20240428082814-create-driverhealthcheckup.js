'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('driverhealthcheckups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driver_id: {
        type: Sequelize.INTEGER
      },
      package_and_test_history: {
        type: Sequelize.STRING
      },
      driver_details: {
        type: Sequelize.STRING
      },
      transpoter: {
        type: Sequelize.STRING
      },
      driver_type: {
        type: Sequelize.STRING
      },
      vehicle_no: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      date_time: {
        type: Sequelize.STRING
      },
      unique_code: {
        type: Sequelize.STRING
      },
      spo2_unit: {
        type: Sequelize.STRING
      },
      temperature_unit: {
        type: Sequelize.STRING
      },
      pulse_unit: {
        type: Sequelize.STRING
      },
      package_list: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('driverhealthcheckups');
  }
};