'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centeruser extends Model {

    static associate(models) {
      Centeruser.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Centeruser.belongsTo(models.Center, { foreignKey: 'center_id', as: 'center' });
    }
  }
  Centeruser.init({
    user_id: DataTypes.STRING,
    center_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Centeruser',
  });
  return Centeruser;
};