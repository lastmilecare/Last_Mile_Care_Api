'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CHOLESTEROL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CHOLESTEROL.init({
    total_cholesterol_standard_value_min: {
      type: DataTypes.INTEGER
    },
    total_cholesterol_standard_value_max: {
      type: DataTypes.INTEGER
    },
    total_cholesterol_within_deviation_value_min: {
      type: DataTypes.INTEGER
    },
    total_cholesterol_within_deviation_value_max: {
      type: DataTypes.INTEGER
    },
    total_cholesterol_out_of_range: {
      type: DataTypes.INTEGER
    },
    total_cholesterol_units: {
      type: DataTypes.STRING
    },
    ld_cholesterol_standard_value_min: {
      type: DataTypes.INTEGER
    },
    ld_cholesterol_standard_value_max: {
      type: DataTypes.INTEGER
    },
    ld_cholesterol_within_deviation_value_min: {
      type: DataTypes.INTEGER
    },
    ld_cholesterol_within_deviation_value_max: {
      type: DataTypes.INTEGER
    },
    ld_cholesterol_out_of_range: {
      type: DataTypes.INTEGER
    },
    ld_cholesterol_units: {
      type: DataTypes.STRING
    },
    hd_cholesterol_standard_value_min: {
      type: DataTypes.INTEGER
    },
    hd_cholesterol_standard_value_max: {
      type: DataTypes.INTEGER
    },
    hd_cholesterol_within_deviation_value_min: {
      type: DataTypes.INTEGER
    },
    hd_cholesterol_within_deviation_value_max: {
      type: DataTypes.INTEGER
    },
    hd_cholesterol_out_of_range: {
      type: DataTypes.INTEGER
    },
    hd_cholesterol_units: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'CHOLESTEROL',
  });
  return CHOLESTEROL;
};