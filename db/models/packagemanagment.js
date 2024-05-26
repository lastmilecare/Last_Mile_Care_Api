'use strict';
const {
  Model,
  BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packagemanagment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Packagemanagment.init({
    package_name: DataTypes.STRING,
    package_id: DataTypes.STRING,
    package_type: DataTypes.STRING,
    package_list: {
      type: DataTypes.JSON
    },
    status: DataTypes.BOOLEAN,
    external_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Packagemanagment',
  });
  return Packagemanagment;
};