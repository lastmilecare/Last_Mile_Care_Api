'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DRIVERFAMILYHISTORY extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DRIVERFAMILYHISTORY.init({

    driver_phone: {
      type: DataTypes.STRING
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    family_member_1_relation: {
      type: DataTypes.STRING
    },
    family_member_2_relation: {
      type: DataTypes.STRING
    },
    family_member_1: {
      type: DataTypes.STRING
    },
    family_member_2: {
      type: DataTypes.STRING
    },
    parent_diabetic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    parent_hypertension: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    parent_hypotension: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    other_genetic_disease: {
      type: DataTypes.STRING, // Change data type to STRING
      allowNull: false,
      defaultValue: 'None' // Set a default value if needed
    }
  }, {
    sequelize,
    modelName: 'DRIVERFAMILYHISTORY',
  });
  return DRIVERFAMILYHISTORY;
};