'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eyetest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Eyetest.init({
    left_eye_far_sight_standard_min_1: DataTypes.INTEGER,
    left_eye_far_sight_standard_min_2: DataTypes.INTEGER,
    left_eye_far_sight_standard_min_3: DataTypes.INTEGER,
    left_eye_far_sight_standard_max_1: DataTypes.INTEGER,
    left_eye_far_sight_standard_max_2: DataTypes.INTEGER,
    left_eye_far_sight_standard_max_3: DataTypes.INTEGER,
    left_eye_far_sight_deviation_min_1: DataTypes.INTEGER,
    left_eye_far_sight_deviation_min_2: DataTypes.INTEGER,
    left_eye_far_sight_deviation_min_3: DataTypes.INTEGER,
    left_eye_far_sight_deviation_max_1: DataTypes.INTEGER,
    left_eye_far_sight_deviation_max_2: DataTypes.INTEGER,
    left_eye_far_sight_deviation_max_3: DataTypes.INTEGER,
    right_eye_far_sight_standard_min_1: DataTypes.INTEGER,
    right_eye_far_sight_standard_min_2: DataTypes.INTEGER,
    right_eye_far_sight_standard_min_3: DataTypes.INTEGER,
    right_eye_far_sight_standard_max_1: DataTypes.INTEGER,
    right_eye_far_sight_standard_max_2: DataTypes.INTEGER,
    right_eye_far_sight_standard_max_3: DataTypes.INTEGER,
    right_eye_far_sight_deviation_min_1: DataTypes.INTEGER,
    right_eye_far_sight_deviation_min_2: DataTypes.INTEGER,
    right_eye_far_sight_deviation_min_3: DataTypes.INTEGER,
    right_eye_far_sight_deviation_max_1: DataTypes.INTEGER,
    right_eye_far_sight_deviation_max_2: DataTypes.INTEGER,
    right_eye_far_sight_deviation_max_3: DataTypes.INTEGER,
    left_eye_near_sight_standard_min_1: DataTypes.INTEGER,
    left_eye_near_sight_standard_min_2: DataTypes.INTEGER,
    left_eye_near_sight_standard_min_3: DataTypes.INTEGER,
    left_eye_near_sight_standard_max_1: DataTypes.INTEGER,
    left_eye_near_sight_standard_max_2: DataTypes.INTEGER,
    left_eye_near_sight_standard_max_3: DataTypes.INTEGER,
    left_eye_near_sight_deviation_min_1: DataTypes.INTEGER,
    left_eye_near_sight_deviation_min_2: DataTypes.INTEGER,
    left_eye_near_sight_deviation_min_3: DataTypes.INTEGER,
    left_eye_near_sight_deviation_max_1: DataTypes.INTEGER,
    left_eye_near_sight_deviation_max_2: DataTypes.INTEGER,
    left_eye_near_sight_deviation_max_3: DataTypes.INTEGER,
    right_eye_near_sight_standard_min_1: DataTypes.INTEGER,
    right_eye_near_sight_standard_min_2: DataTypes.INTEGER,
    right_eye_near_sight_standard_min_3: DataTypes.INTEGER,
    right_eye_near_sight_standard_max_1: DataTypes.INTEGER,
    right_eye_near_sight_standard_max_2: DataTypes.INTEGER,
    right_eye_near_sight_standard_max_3: DataTypes.INTEGER,
    right_eye_near_sight_deviation_min_1: DataTypes.INTEGER,
    right_eye_near_sight_deviation_min_2: DataTypes.INTEGER,
    right_eye_near_sight_deviation_min_3: DataTypes.INTEGER,
    right_eye_near_sight_deviation_max_1: DataTypes.INTEGER,
    right_eye_near_sight_deviation_max_2: DataTypes.INTEGER,
    right_eye_near_sight_deviation_max_3: DataTypes.INTEGER,
    left_eye_vision_far_standard_min: DataTypes.INTEGER,
    left_eye_vision_far_standard_max: DataTypes.INTEGER,
    left_eye_vision_far_deviation_min: DataTypes.INTEGER,
    left_eye_vision_far_deviation_max: DataTypes.INTEGER,
    right_eye_vision_far_standard_min: DataTypes.INTEGER,
    right_eye_vision_far_standard_max: DataTypes.INTEGER,
    right_eye_vision_far_deviation_min: DataTypes.INTEGER,
    right_eye_vision_far_deviation_max: DataTypes.INTEGER,
    left_eye_vision_near_standard_min: DataTypes.INTEGER,
    left_eye_vision_near_standard_max: DataTypes.INTEGER,
    left_eye_vision_near_deviation_min: DataTypes.INTEGER,
    left_eye_vision_near_deviation_max: DataTypes.INTEGER,
    right_eye_vision_near_standard_min: DataTypes.INTEGER,
    right_eye_vision_near_standard_max: DataTypes.INTEGER,
    right_eye_vision_near_deviation_min: DataTypes.INTEGER,
    right_eye_vision_near_deviation_max: DataTypes.INTEGER,
    color_blindness_option_1: DataTypes.STRING,
    color_blindness_option_2: DataTypes.STRING,
    units_eye_test: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Eyetest',
  });
  return Eyetest;
};