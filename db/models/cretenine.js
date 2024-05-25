'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cretenine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cretenine.init({
    standard_value_min: DataTypes.INTEGER,
    standard_value_max: DataTypes.INTEGER,
    within_deviation_value_min: DataTypes.INTEGER,
    within_deviation_value_max: DataTypes.INTEGER,
    units: DataTypes.STRING,
    out_of_range: DataTypes.INTEGER,
    within_deviation_value_min_Below: DataTypes.STRING,
    within_deviation_value_max_Below: DataTypes.STRING,
    out_of_range_below: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cretenine',
  });
  return Cretenine;
};