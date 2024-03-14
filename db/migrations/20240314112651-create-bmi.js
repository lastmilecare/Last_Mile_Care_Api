'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BMIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bmi_standard_value_min: {
        type: Sequelize.STRING
      },
      bmi_standard_value_max: {
        type: Sequelize.STRING
      },
      bmi_within_deviation_value_min: {
        type: Sequelize.STRING
      },
      bmi_within_deviation_value_max: {
        type: Sequelize.STRING
      },
      bmi_out_of_range: {
        type: Sequelize.STRING
      },
      bmi_units: {
        type: Sequelize.STRING
      },

      weighti_standard_value_min: {
        type: Sequelize.STRING
      },
      weight_standard_value_max: {
        type: Sequelize.STRING
      },
      weight_within_deviation_value_min: {
        type: Sequelize.STRING
      },
      weight_within_deviation_value_max: {
        type: Sequelize.STRING
      },
      weight_out_of_range: {
        type: Sequelize.STRING
      },
      weight_units: {
        type: Sequelize.STRING
      },


      height_standard_value_min: {
        type: Sequelize.STRING
      },
      height_standard_value_max: {
        type: Sequelize.STRING
      },
      height_within_deviation_value_min: {
        type: Sequelize.STRING
      },
      height_within_deviation_value_max: {
        type: Sequelize.STRING
      },
      height_out_of_range: {
        type: Sequelize.STRING
      },
      height_units: {
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
    await queryInterface.dropTable('BMIs');
  }
};