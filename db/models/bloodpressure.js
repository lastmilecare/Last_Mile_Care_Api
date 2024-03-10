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
    systolic_standard_value_min: DataTypes.STRING,
    systolic_standard_value_max: DataTypes.STRING,
    systolic_within_deviation_value_min: DataTypes.STRING,
    systolic_within_deviation_value_max: DataTypes.STRING,
    systolic_units: DataTypes.STRING,
    systolic_out_of_range: DataTypes.STRING,

    diastolic_standard_value_min: DataTypes.STRING,
    diastolic_standard_value_max: DataTypes.STRING,
    diastolic_within_deviation_value_min: DataTypes.STRING,
    diastolic_within_deviation_value_max: DataTypes.STRING,
    diastolic_units: DataTypes.STRING,
    diastolic_out_of_range: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bloodpressure',
  });
  return Bloodpressure;
};