'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centeruser extends Model {
     
    static associate(models) {
      // define association here
    }
  }
  Centeruser.init({
    user_id: DataTypes.STRING,
    center_id:DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Centeruser',
  });
  return Centeruser;
};