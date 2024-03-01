const {
  sequelize,
  Role,
  User,
  Permission
} = require("../../../db/models");


async function adminAuth(email, password) {
  try {
    const result = await User.findOne({ where: { email: email }, raw: true, nest: true });
    const findRole = await Role.findOne({ where: { id: result.role_id }, raw: true, nest: true });
    if (result) {
      const mergedData = { ...result, ...findRole };
      return mergedData;
    }
    else {
      return { "status": "no_user_found" };
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function insertPermission(data) {
  try {
    return await Permission.create(data);
  } catch (error) {
    throw new Error(error);
  }

}

async function findPermission(req) {
  try {
    return await Permission.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

async function changeStatue(id, status) {
  try {
    return await User.update({ status: status }, {
      where: {
        id: id,
      },
    })
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { changeStatue, findPermission, insertPermission, adminAuth };
