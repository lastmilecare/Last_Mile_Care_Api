'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hearingtest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hearingtest.init({
    left_ear_standard_value_max: DataTypes.STRING,
    left_ear_standard_value_min: DataTypes.STRING,
    left_ear_within_deviation_value_min: DataTypes.STRING,
    left_ear_within_deviation_value_max: DataTypes.STRING,
    left_ear_out_of_range: DataTypes.STRING,
    left_ear_units: DataTypes.STRING,
    left_ear_attach_certificate_of_incorporation: DataTypes.STRING,
    right_ear_standard_value_max: DataTypes.STRING,
    right_ear_standard_value_min: DataTypes.STRING,
    right_ear_within_deviation_value_min: DataTypes.STRING,
    right_ear_within_deviation_value_max: DataTypes.STRING,
    right_ear_out_of_range: DataTypes.STRING,
    right_ear_units: DataTypes.STRING,
    right_ear_attach_certificate_of_incorporation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Hearingtest',
  });
  return Hearingtest;
};