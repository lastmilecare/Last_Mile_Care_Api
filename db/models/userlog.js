'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userlog.init({
    user_id: {
      type: DataTypes.INTEGER
    },

    action_type: {
      type: DataTypes.STRING
    },
    action_description: {
      type: DataTypes.JSON
    },

    action_time: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'userlog',
  });
  return userlog;
};