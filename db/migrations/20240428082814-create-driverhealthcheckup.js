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
      is_submited: Sequelize.BOOLEAN,

      driver_id: Sequelize.INTEGER,
      package_and_test_history: Sequelize.STRING,
      driver_details: Sequelize.STRING,
      transpoter: Sequelize.INTEGER,
      driver_type: Sequelize.STRING,
      vehicle_no: Sequelize.STRING,
      signature: Sequelize.STRING,
      date_time: Sequelize.STRING,
      unique_code: Sequelize.STRING,
      spo2_unit: Sequelize.STRING,
      temperature_unit: Sequelize.STRING,
      pulse_unit: Sequelize.STRING,
      package_list: Sequelize.ARRAY(Sequelize.STRING),
      verify_option: Sequelize.STRING,
      bmi_unit: Sequelize.JSON,
      contactNumber: Sequelize.STRING,
      haemoglobin_unit: Sequelize.JSON,
      patient_type: Sequelize.STRING,
      random_blood_sugar_unit: Sequelize.JSON,
      hearing_unit: Sequelize.JSON,
      cholesterol_unit: Sequelize.JSON,
      blood_pressure_unit: Sequelize.JSON,
      ecg_unit: Sequelize.JSON,
      doc: Sequelize.STRING,
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