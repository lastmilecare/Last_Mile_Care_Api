'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    role_title: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};