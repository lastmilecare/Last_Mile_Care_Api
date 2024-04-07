'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eyetests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      left_eye_far_sight_standard_min_1: Sequelize.INTEGER,
      left_eye_far_sight_standard_min_2: Sequelize.INTEGER,
      left_eye_far_sight_standard_min_3: Sequelize.INTEGER,
      left_eye_far_sight_standard_max_1: Sequelize.INTEGER,
      left_eye_far_sight_standard_max_2: Sequelize.INTEGER,
      left_eye_far_sight_standard_max_3: Sequelize.INTEGER,
      left_eye_far_sight_deviation_min_1: Sequelize.INTEGER,
      left_eye_far_sight_deviation_min_2: Sequelize.INTEGER,
      left_eye_far_sight_deviation_min_3: Sequelize.INTEGER,
      left_eye_far_sight_deviation_max_1: Sequelize.INTEGER,
      left_eye_far_sight_deviation_max_2: Sequelize.INTEGER,
      left_eye_far_sight_deviation_max_3: Sequelize.INTEGER,
      right_eye_far_sight_standard_min_1: Sequelize.INTEGER,
      right_eye_far_sight_standard_min_2: Sequelize.INTEGER,
      right_eye_far_sight_standard_min_3: Sequelize.INTEGER,
      right_eye_far_sight_standard_max_1: Sequelize.INTEGER,
      right_eye_far_sight_standard_max_2: Sequelize.INTEGER,
      right_eye_far_sight_standard_max_3: Sequelize.INTEGER,
      right_eye_far_sight_deviation_min_1: Sequelize.INTEGER,
      right_eye_far_sight_deviation_min_2: Sequelize.INTEGER,
      right_eye_far_sight_deviation_min_3: Sequelize.INTEGER,
      right_eye_far_sight_deviation_max_1: Sequelize.INTEGER,
      right_eye_far_sight_deviation_max_2: Sequelize.INTEGER,
      right_eye_far_sight_deviation_max_3: Sequelize.INTEGER,
      left_eye_near_sight_standard_min_1: Sequelize.INTEGER,
      left_eye_near_sight_standard_min_2: Sequelize.INTEGER,
      left_eye_near_sight_standard_min_3: Sequelize.INTEGER,
      left_eye_near_sight_standard_max_1: Sequelize.INTEGER,
      left_eye_near_sight_standard_max_2: Sequelize.INTEGER,
      left_eye_near_sight_standard_max_3: Sequelize.INTEGER,
      left_eye_near_sight_deviation_min_1: Sequelize.INTEGER,
      left_eye_near_sight_deviation_min_2: Sequelize.INTEGER,
      left_eye_near_sight_deviation_min_3: Sequelize.INTEGER,
      left_eye_near_sight_deviation_max_1: Sequelize.INTEGER,
      left_eye_near_sight_deviation_max_2: Sequelize.INTEGER,
      left_eye_near_sight_deviation_max_3: Sequelize.INTEGER,
      right_eye_near_sight_standard_min_1: Sequelize.INTEGER,
      right_eye_near_sight_standard_min_2: Sequelize.INTEGER,
      right_eye_near_sight_standard_min_3: Sequelize.INTEGER,
      right_eye_near_sight_standard_max_1: Sequelize.INTEGER,
      right_eye_near_sight_standard_max_2: Sequelize.INTEGER,
      right_eye_near_sight_standard_max_3: Sequelize.INTEGER,
      right_eye_near_sight_deviation_min_1: Sequelize.INTEGER,
      right_eye_near_sight_deviation_min_2: Sequelize.INTEGER,
      right_eye_near_sight_deviation_min_3: Sequelize.INTEGER,
      right_eye_near_sight_deviation_max_1: Sequelize.INTEGER,
      right_eye_near_sight_deviation_max_2: Sequelize.INTEGER,
      right_eye_near_sight_deviation_max_3: Sequelize.INTEGER,
      left_eye_vision_far_standard_min: Sequelize.INTEGER,
      left_eye_vision_far_standard_max: Sequelize.INTEGER,
      left_eye_vision_far_deviation_min: Sequelize.INTEGER,
      left_eye_vision_far_deviation_max: Sequelize.INTEGER,
      right_eye_vision_far_standard_min: Sequelize.INTEGER,
      right_eye_vision_far_standard_max: Sequelize.INTEGER,
      right_eye_vision_far_deviation_min: Sequelize.INTEGER,
      right_eye_vision_far_deviation_max: Sequelize.INTEGER,
      left_eye_vision_near_standard_min: Sequelize.INTEGER,
      left_eye_vision_near_standard_max: Sequelize.INTEGER,
      left_eye_vision_near_deviation_min: Sequelize.INTEGER,
      left_eye_vision_near_deviation_max: Sequelize.INTEGER,
      right_eye_vision_near_standard_min: Sequelize.INTEGER,
      right_eye_vision_near_standard_max: Sequelize.INTEGER,
      right_eye_vision_near_deviation_min: Sequelize.INTEGER,
      right_eye_vision_near_deviation_max: Sequelize.INTEGER,
      color_blindness_option_1: Sequelize.STRING,
      color_blindness_option_2: Sequelize.STRING,
      units_eye_test: Sequelize.STRING,

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
    await queryInterface.dropTable('Eyetests');
  }
};