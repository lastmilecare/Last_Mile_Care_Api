'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      Role.hasMany(models.Permission, { foreignKey: 'role_id', as: 'permissions' });

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