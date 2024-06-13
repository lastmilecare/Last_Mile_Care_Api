const { where } = require("sequelize");
const {
  sequelize,
  Role,
  User,
  Permission
} = require("../../../db/models");


async function checkRole(permission_id) {
  try {
    return await Permission.findOne({
      where: { id: permission_id },
      raw: true,
      nest: true
    });
  } catch (error) {
    throw new Error(error);
  }
}
async function getRole(slug) {
  try {

    return await Role.findOne({
      where: { slug: slug },

      order: [['id', 'DESC']],
      raw: true,
      nest: true
    });
  } catch (error) {
    throw new Error(error);
  }
}
async function getLastId(getRole) {
  try {

    return await User.findOne({
      where: { role_id: getRole.id },
      order: [['id', 'DESC']],
      raw: true,
      nest: true
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function createUser(data) {
  try {
    return await User.create(data);
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  checkRole,
  getRole,
  getLastId,
  createUser
};
