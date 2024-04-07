'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hearingtests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      left_ear_standard_value_max: Sequelize.INTEGER,
      left_ear_standard_value_min: Sequelize.INTEGER,
      left_ear_within_deviation_value_min: Sequelize.INTEGER,
      left_ear_within_deviation_value_max: Sequelize.INTEGER,
      left_ear_out_of_range: Sequelize.INTEGER,
      left_ear_units: Sequelize.STRING,
      left_ear_attach_certificate_of_incorporation: Sequelize.STRING,
      right_ear_standard_value_max: Sequelize.INTEGER,
      right_ear_standard_value_min: Sequelize.INTEGER,
      right_ear_within_deviation_value_min: Sequelize.INTEGER,
      right_ear_within_deviation_value_max: Sequelize.INTEGER,
      right_ear_out_of_range: Sequelize.INTEGER,
      right_ear_units: Sequelize.STRING,
      right_ear_attach_certificate_of_incorporation: Sequelize.STRING,
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
    await queryInterface.dropTable('Hearingtests');
  }
};