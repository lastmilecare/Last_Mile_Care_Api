'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DRIVERMASTERPERSONAL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DRIVERMASTERPERSONAL.belongsTo(models.DRIVERMASTER, { foreignKey: 'driver_id' });

    }
  }
  DRIVERMASTERPERSONAL.init({
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    driver_phone: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    blood_group: {
      type: DataTypes.STRING,
      allowNull: true
    },
    diabetes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hypertension: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hypotension: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    epilepsy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    physical_disability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    physical_disability_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mental_disability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    mental_disability_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    vision_issues: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    vision_issues_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hearing_issues: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hearing_issues_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    major_accident: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    other_medical_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    alcohol_consumption: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    smoking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tobacco_consumption: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    birthmark_identification: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'DRIVERMASTERPERSONAL',
  });
  return DRIVERMASTERPERSONAL;
};