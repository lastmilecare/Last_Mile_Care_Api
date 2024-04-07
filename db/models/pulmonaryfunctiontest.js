'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pulmonaryfunctiontest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pulmonaryfunctiontest.init({
    standard_value_min: DataTypes.INTEGER,
    standard_value_max: DataTypes.INTEGER,
    within_deviation_value_min: DataTypes.INTEGER,
    within_deviation_value_max: DataTypes.INTEGER,
    out_of_range: DataTypes.INTEGER,
    units: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pulmonaryfunctiontest',
  });
  return Pulmonaryfunctiontest;
};