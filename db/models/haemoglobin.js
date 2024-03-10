'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Haemoglobin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Haemoglobin.init({
    standard_value_min: DataTypes.STRING,
    standard_value_max: DataTypes.STRING,
    within_deviation_value_min: DataTypes.STRING,
    within_deviation_value_max: DataTypes.STRING,
    units: DataTypes.STRING,
    out_of_range: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Haemoglobin',
  });
  return Haemoglobin;
};