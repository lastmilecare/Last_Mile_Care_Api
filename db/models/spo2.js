'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SPO2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SPO2.init({
    standard_value_min: DataTypes.STRING,
    standard_value_max: DataTypes.STRING,
    within_deviation_value_min: DataTypes.STRING,
    within_deviation_value_max: DataTypes.STRING,
    out_of_range: DataTypes.STRING,
    units: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SPO2',
  });
  return SPO2;
};