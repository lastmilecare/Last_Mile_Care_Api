'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bloodpressure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bloodpressure.init({
    systolic_standard_value_min: DataTypes.INTEGER,
    systolic_standard_value_max: DataTypes.INTEGER,
    systolic_within_deviation_value_min: DataTypes.INTEGER,
    systolic_within_deviation_value_max: DataTypes.INTEGER,
    systolic_units: DataTypes.STRING,
    systolic_out_of_range: DataTypes.INTEGER,

    diastolic_standard_value_min: DataTypes.INTEGER,
    diastolic_standard_value_max: DataTypes.INTEGER,
    diastolic_within_deviation_value_min: DataTypes.INTEGER,
    diastolic_within_deviation_value_max: DataTypes.INTEGER,
    diastolic_units: DataTypes.STRING,
    diastolic_out_of_range: DataTypes.INTEGER,
    within_deviation_value_min_Below: DataTypes.STRING,
    within_deviation_value_max_Below: DataTypes.STRING,
    out_of_range_below: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bloodpressure',
  });
  return Bloodpressure;
};