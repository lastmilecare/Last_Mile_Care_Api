'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vision.init({
    option_1: DataTypes.STRING,
    option_2: DataTypes.STRING,
    option_3: DataTypes.STRING,
    option_4: DataTypes.STRING,
    option_5: DataTypes.STRING,
    option_6: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Vision',
  });
  return Vision;
};