'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Center extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Center.init({
    createdBy: DataTypes.BIGINT,
    project_start_date: DataTypes.STRING,
    project_name: DataTypes.STRING,
    project_unique_id: DataTypes.STRING,
    project_district: DataTypes.STRING,
    project_state: DataTypes.STRING,
    project_address: DataTypes.STRING,
    agency_name: DataTypes.STRING,
    agency_district: DataTypes.STRING,
    agency_state: DataTypes.STRING,
    agency_spoc_name: DataTypes.STRING,
    agency_spoc_email: DataTypes.STRING,
    agency_spoc_contact_number: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
     
  }, {
    sequelize,
    modelName: 'Center',
  });
  return Center;
};