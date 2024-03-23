const {
  sequelize,
  Role,
  User,
  Permission,
  Permissionmetadata
} = require("../../../db/models");


async function adminAuth(email, password) {
  try {
    const result = await User.findOne({ where: { email: email }, raw: true, nest: true });
    if (result) {
      const findRole = await Role.findOne({ where: { id: result.role_id }, raw: true, nest: true });
      const mergedData = { ...result, ...findRole };
      console.log(mergedData);
      return mergedData;

    }

    else {
      return { status: "no_user_found" };
    }
  } catch (error) {
    throw new Error(error);
  }
}


async function insertPermission(permissionData) {
  try {
    return await Permission.create(permissionData);

  } catch (error) {
    throw new Error(error);
  }

}
async function insertPermissionMetadata(metadata) {
  console.log(metadata);

  try {
    const insert = await Permissionmetadata.create(metadata);
    return insert
  } catch (error) {
    throw new Error(error);
  }
}

async function findPermission(req) {
  try {
    return await Permission.findAll({
      include: {
        model: Permissionmetadata,
        as: 'Permissionmetadata' // Assuming you've defined an alias for the association
      }
    });
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

module.exports = { insertPermissionMetadata, changeStatue, findPermission, insertPermission, adminAuth };
