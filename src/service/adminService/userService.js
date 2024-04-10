const {
  sequelize,
  Role,
  User,
  Permission
} = require("../../../db/models");


async function checkRole(permission_id) {
  try {
    console.log("ffffffffffffffff")
    return await Permission.findOne({
      where: { id: permission_id },
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
module.exports = { checkRole, createUser };
