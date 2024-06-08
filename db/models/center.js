'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Center extends Model {

    static associate(models) {
      Center.belongsToMany(models.User, { through: models.Centeruser, foreignKey: 'center_id', as: 'users' });

    }
  }
  Center.init({
    external_id: DataTypes.STRING,
    createdBy: DataTypes.BIGINT,
    project_start_date: DataTypes.STRING,
    project_name: DataTypes.STRING,
    project_unique_id: DataTypes.STRING,
    project_district: DataTypes.STRING,
    project_state: DataTypes.STRING,
    project_address: DataTypes.STRING,
    agency_name: DataTypes.STRING,
    agency_address: DataTypes.STRING,
    agency_district: DataTypes.STRING,
    agency_state: DataTypes.STRING,
    agency_spoc_name: DataTypes.STRING,
    agency_spoc_email: DataTypes.STRING,
    agency_spoc_contact_number: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    project_end_date: DataTypes.STRING,
    agency_spoc_alternate_name: DataTypes.STRING,
    agency_spoc_alternate_contact_number: DataTypes.STRING,
    project_signed_agreement_file: DataTypes.STRING,
    short_code: DataTypes.STRING,
    center_shortcode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Center',
  });
  return Center;
};