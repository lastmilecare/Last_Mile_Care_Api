'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hiv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hiv.init({
    option_one: DataTypes.STRING,
    option_two: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hiv',
  });
  return Hiv;
};