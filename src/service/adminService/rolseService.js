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
async function getRoleData(id) {
  try {
    return await Role.findOne({ where: { id: id }, raw: true, nest: true });
  } catch (error) {
    throw new Error(error);
  }
}
async function updateRole(data, id) {
  try {
    return await Role.update(data, { where: { id: id } });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { updateRole, getRoleData, roleInsert, rolefindAll };
