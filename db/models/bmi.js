'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BMI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BMI.init({
    bmi_standard_value_min: {
      type: DataTypes.STRING
    },
    bmi_standard_value_max: {
      type: DataTypes.STRING
    },
    bmi_within_deviation_value_min: {
      type: DataTypes.STRING
    },
    bmi_within_deviation_value_max: {
      type: DataTypes.STRING
    },
    bmi_out_of_range: {
      type: DataTypes.STRING
    },
    bmi_units: {
      type: DataTypes.STRING
    },

    weighti_standard_value_min: {
      type: DataTypes.STRING
    },
    weight_standard_value_max: {
      type: DataTypes.STRING
    },
    weight_within_deviation_value_min: {
      type: DataTypes.STRING
    },
    weight_within_deviation_value_max: {
      type: DataTypes.STRING
    },
    weight_out_of_range: {
      type: DataTypes.STRING
    },
    weight_units: {
      type: DataTypes.STRING
    },


    height_standard_value_min: {
      type: DataTypes.STRING
    },
    height_standard_value_max: {
      type: DataTypes.STRING
    },
    height_within_deviation_value_min: {
      type: DataTypes.STRING
    },
    height_within_deviation_value_max: {
      type: DataTypes.STRING
    },
    height_out_of_range: {
      type: DataTypes.STRING
    },
    height_units: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'BMI',
  });
  return BMI;
};