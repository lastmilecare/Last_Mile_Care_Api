'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('DRIVERMASTERPERSONALs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

      },
      driver_phone: {
        type: DataTypes.STRING,
        allowNull: true
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('DRIVERMASTERPERSONALs');
  }
};