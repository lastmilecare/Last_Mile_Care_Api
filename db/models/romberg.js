'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Romberg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Romberg.init({
    option_one: DataTypes.STRING,
    option_two: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Romberg',
  });
  return Romberg;
};