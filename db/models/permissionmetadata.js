'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissionmetadata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permissionmetadata.init({
    permission_id: DataTypes.BIGINT,
    page_name: DataTypes.STRING,
    permission_type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  }, {
    sequelize,
    modelName: 'Permissionmetadata',
  });
  return Permissionmetadata;
};