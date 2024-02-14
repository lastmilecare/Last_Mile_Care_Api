const {
    sequelize,
    Role,
    User
  } = require("../../db/models");
  
 
  async function createUser(data) {
    try {
       return await User.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
    module.exports = {   createUser };
    