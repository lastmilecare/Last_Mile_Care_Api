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
      type: DataTypes.INTEGER
    },
    bmi_standard_value_max: {
      type: DataTypes.INTEGER
    },
    bmi_within_deviation_value_min: {
      type: DataTypes.INTEGER
    },
    bmi_within_deviation_value_max: {
      type: DataTypes.INTEGER
    },
    bmi_out_of_range: {
      type: DataTypes.INTEGER
    },
    bmi_units: {
      type: DataTypes.STRING
    },

    weight_standard_value_min: {
      type: DataTypes.INTEGER
    },
    weight_standard_value_max: {
      type: DataTypes.INTEGER
    },
    weight_within_deviation_value_min: {
      type: DataTypes.INTEGER
    },
    weight_within_deviation_value_max: {
      type: DataTypes.INTEGER
    },
    weight_out_of_range: {
      type: DataTypes.INTEGER
    },
    weight_units: {
      type: DataTypes.STRING
    },


    height_standard_value_min: {
      type: DataTypes.INTEGER
    },
    height_standard_value_max: {
      type: DataTypes.INTEGER
    },
    height_within_deviation_value_min: {
      type: DataTypes.INTEGER
    },
    height_within_deviation_value_max: {
      type: DataTypes.INTEGER
    },
    height_out_of_range: {
      type: DataTypes.INTEGER
    },
    height_units: {
      type: DataTypes.STRING
    },
    within_deviation_value_min_below: DataTypes.STRING,
    within_deviation_value_max_below: DataTypes.STRING,
    out_of_range_below: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BMI',
  });
  return BMI;
};