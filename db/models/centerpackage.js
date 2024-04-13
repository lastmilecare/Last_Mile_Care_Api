'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centerpackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Centerpackage.belongsTo(models.Packagemanagment, { foreignKey: 'package_id', as: 'package' });
      Centerpackage.belongsTo(models.Center, { foreignKey: 'center_id', as: 'center' });

    }
  }
  Centerpackage.init({
    package_price: DataTypes.STRING,
    package_frequency: DataTypes.STRING,
    package_id: DataTypes.BIGINT,
    center_id: DataTypes.BIGINT,

  }, {
    sequelize,
    modelName: 'Centerpackage',
  });
  return Centerpackage;
};