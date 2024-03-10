'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bloodgroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bloodgroup.init({

    option_1: {
      type: DataTypes.STRING
    },
    option_2: {
      type: DataTypes.STRING
    },
    option_3: {
      type: DataTypes.STRING
    },
    option_4: {
      type: DataTypes.STRING
    },
    option_5: {
      type: DataTypes.STRING
    },
    option_6: {
      type: DataTypes.STRING
    },
    option_7: {
      type: DataTypes.STRING
    },
    option_8: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Bloodgroup',
  });
  return Bloodgroup;
};