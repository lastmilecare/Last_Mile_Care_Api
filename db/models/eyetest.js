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
    spherical_right_within_deviation_value_min_below: DataTypes.STRING,
    spherical_right_within_deviation_value_min: DataTypes.STRING,
    spherical_right_out_of_range_below: DataTypes.STRING,
    spherical_right_out_of_range: DataTypes.STRING,
    cylindrical_right_within_deviation_value_min_below: DataTypes.STRING,
    cylindrical_right_within_deviation_value_min: DataTypes.STRING,
    cylindrical_right_out_of_range_below: DataTypes.STRING,
    cylindrical_right_out_of_range: DataTypes.STRING,
    spherical_left_within_deviation_value_min_below: DataTypes.STRING,
    spherical_left_within_deviation_value_min: DataTypes.STRING,
    spherical_left_out_of_range_below: DataTypes.STRING,
    spherical_left_out_of_range: DataTypes.STRING,
    cylindrical_left_within_deviation_value_min_below: DataTypes.STRING,
    cylindrical_left_within_deviation_value_min: DataTypes.STRING,
    cylindrical_left_out_of_range_below: DataTypes.STRING,
    cylindrical_left_out_of_range: DataTypes.STRING,
    colour_blindness_option_1: DataTypes.STRING,
    colour_blindness_option_2: DataTypes.STRING



  }, {
    sequelize,
    modelName: 'Eyetest',
  });
  return Eyetest;
};