const {
  sequelize,
  Role,
  User
} = require("../../../db/models");


async function roleInsert(data) {
  try {
    return await Role.create(data);
  } catch (error) {
    throw new Error(error);
  }
}

async function rolefindAll() {
  try {
    return await Role.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { roleInsert, rolefindAll };
