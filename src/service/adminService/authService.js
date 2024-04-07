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
      const findRole = await Role.findOne({
        where: { id: result.role_id },
        include: [
          {
            model: Permission,
            as: 'permissions',
            include: [
              { model: Permissionmetadata, as: 'Permissionmetadata', raw: true, nest: true }
            ]
          }
        ],

      });
      const mergedData = { ...result, ...findRole };
      return mergedData;
    }

    else {
      return { status: "no_user_found" };
    }

  } catch (error) {
    console.log(error);
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
      include: [
        {
          model: Permissionmetadata,
          as: 'Permissionmetadata' // Assuming you've defined an alias for the association
        },
        {
          model: Role, // Include the Role model
          as: 'Role' // Assuming you've defined an alias for the association
        }
      ]

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
async function findPermissionData(id) {
  console.log("---------------", id);
  try {

    return await Permission.findOne({
      where: {
        id: id,
      },

      include: {
        model: Permissionmetadata,
        as: 'Permissionmetadata' // Assuming you've defined an alias for the association
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
async function updatePermission(permissionId, newData) {
  try {
    // Update the permission record
    await Permission.update(newData, { where: { id: permissionId } });
    // Fetch and return the updated permission record
    return await Permission.findByPk(permissionId);
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePermissionMetadata(metadataId, newData) {
  try {
    // Update the permission metadata record
    await Permissionmetadata.update(newData, { where: { id: metadataId } });
    // Fetch and return the updated permission metadata record
    return await Permissionmetadata.findByPk(metadataId);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { updatePermission, updatePermissionMetadata, findPermissionData, insertPermissionMetadata, changeStatue, findPermission, insertPermission, adminAuth };


