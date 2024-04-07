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
        type: Sequelize.INTEGER
      },
      bmi_standard_value_max: {
        type: Sequelize.INTEGER
      },
      bmi_within_deviation_value_min: {
        type: Sequelize.INTEGER
      },
      bmi_within_deviation_value_max: {
        type: Sequelize.INTEGER
      },
      bmi_out_of_range: {
        type: Sequelize.INTEGER
      },
      bmi_units: {
        type: Sequelize.STRING
      },

      weighti_standard_value_min: {
        type: Sequelize.INTEGER
      },
      weight_standard_value_max: {
        type: Sequelize.INTEGER
      },
      weight_within_deviation_value_min: {
        type: Sequelize.INTEGER
      },
      weight_within_deviation_value_max: {
        type: Sequelize.INTEGER
      },
      weight_out_of_range: {
        type: Sequelize.INTEGER
      },
      weight_units: {
        type: Sequelize.STRING
      },


      height_standard_value_min: {
        type: Sequelize.INTEGER
      },
      height_standard_value_max: {
        type: Sequelize.INTEGER
      },
      height_within_deviation_value_min: {
        type: Sequelize.INTEGER
      },
      height_within_deviation_value_max: {
        type: Sequelize.INTEGER
      },
      height_out_of_range: {
        type: Sequelize.INTEGER
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