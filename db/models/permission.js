'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.belongsTo(models.Role, { foreignKey: 'role_id', as: 'Role' });
      Permission.hasMany(models.Permissionmetadata, { foreignKey: 'permission_id', as: 'Permissionmetadata' });

    }
  }
  Permission.init({
    role_id: DataTypes.BIGINT,
    permission_name: DataTypes.STRING,
    //permission_type: DataTypes.ARRAY(DataTypes.STRING),  

  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};