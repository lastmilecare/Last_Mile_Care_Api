const slugify = require('slugify');
const { sendSuccess, sendError } = require('../../../util/responseHandler');
const HttpStatusCodes = require('../../../const/HttpStatusCode.js');
const rolseService = require('../../../service/adminService/rolseService.js');
const userService = require('../../../service/adminService/userService.js');
const authService = require('../../../service/adminService/authService.js');
const authHelper = require('../../../helper/authHelper.js');
const {
  sequelize,
  Role,
  User, userlog,
  Permission
} = require("../../../../db/models");
const bcrypt = require("bcryptjs");
const { checkEmailExist, checkUserNameExist, checkPhoneExist } = require("../../../helper/authHelper.js");
const { createUserLogs } = require("../../../helper/globalHelper.js");


exports.roleDetails = async (req, res) => {
  if (!req.body.id) {
    sendError(res, 400, "Role ID Required", 'Role ID Required');
    return;
  }
  try {
    const insert = await rolseService.getRoleData(req.body.id);
    sendSuccess(res, 200, insert, 'Role Fetch successfully');
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
  }
};

exports.updateRole = async (req, res) => {
  if (!req.body.id) {
    sendError(res, 400, "Role ID Required", 'Role ID Required');
    return;
  }
  if (!req.body.role_title) {
    sendError(res, 400, "Role Title Required", 'Role Title Required');
    return;
  }
  try {
    const data = {
      role_title: req.body.role_title,
      slug: createSlug(req.body.role_title)
    };
    const insert = await rolseService.updateRole(data, req.body.id);
    sendSuccess(res, 200, insert, 'Update Role successfully');
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
  }
};

exports.createRole = async (req, res) => {
  try {
    const data = {
      role_title: req.body.role_title,
      slug: createSlug(req.body.role_title)
    };

    const insert = await rolseService.roleInsert(data);
    sendSuccess(res, 201, insert, 'Craete Role successfully');
  } catch (error) {
    console.log(error);
    sendError(res, 500, error, 'Invalid input');
  }
};
//
exports.viewRole = async (req, res) => {
  try {
    const view = await rolseService.rolefindAll();
    sendSuccess(res, 200, view, 'Success');
  } catch (error) {
    console.log(error);
    sendError(res, 500, error, 'Invalid input');
  }
};

exports.adminCreate = async (req, res) => {
  const currentUser = req.userId;
  try {
    if (!req.body.permission_id) {
      sendError(res, 404, "permission id required", 'permission id required');

    }
    const phone = String(req.body.phone);
    const getData = await userService.checkRole(req.body.permission_id);

    if (!getData) {
      sendError(res, 404, "Invalid permission id", 'Invalid permission id');
    }


    if (await checkUserNameExist(req.body.username.trim().toLowerCase())) {
      sendError(res, 400, "Username Already Exists", 'Username Already Exists');
      return
    }
    if (await checkEmailExist(req.body.email.toLowerCase())) {
      sendError(res, 400, "Email Already Exists", 'Email Already Exists');
      return
    }
    if (await checkPhoneExist(phone)) {
      sendError(res, 400, "phone Already Exists", 'phone Already Exists');
      return
    }
    const getRole = await userService.getRole("admin");
    const nextId = await userService.getLastId(getRole)
    const extId = nextId ? parseInt(nextId.id) + 1 : 1;
    const external_id = `A${extId.toString().padStart(3, '0')}`;
    const data = {
      external_id: external_id,
      username: req.body.username.trim().toLowerCase(),
      role_id: getData.role_id,
      email: req.body.email.toLowerCase(),
      name: req.body.name,
      permission_id: req.body.permission_id,
      phone: phone,
      status: true,
      isAdmin: true,
      password: bcrypt.hashSync(req.body.password, 8),
    }
    const result = await userService.createUser(data);
    const description = `create a new admin user ${external_id}, `
    await authHelper.createUserLogs(result.id, "create_admin_user", description);
    const logData = {
      user_id: currentUser,
      action_type: "adminCreate",
      action_description: data
    }
    await createUserLogs(logData);

    sendSuccess(res, 201, result.username, 'Success');
  } catch (error) {
    console.log(error);
    sendError(res, 500, error, 'Invalid input');
  }
};

exports.adminAuth = async (req, res) => {
  try {
    if (!req.body.email) {
      sendError(res, 400, "Email ID Required", 'Email ID Required');
      return;
    }
    if (!req.body.password) {
      sendError(res, 400, "Password ID Required", 'Password ID Required');
      return;
    }
    const result = await authService.adminAuth(req.body.email, req.body.password);
    if (result.status == "no_user_found") {
      sendError(res, 404, "no_user_found", 'No User Found!');
      return
    }
    if (result.status == "account_inactive") {
      sendError(res, 401, "account_inactive", 'account inactive!');
      return
    }
    if (result.slug != "admin") {
      sendError(res, 401, "Invalid_role", 'Invalid ROle');
      return
    }
    const tokenData = await authHelper.checkUserPass(req.body.password, result, res);
    if (tokenData.status == "invalid_password") {
      sendError(res, 404, "no_user_found or invalid_password", 'Invalid Password');
      return;
    }
    const mergedData = { ...tokenData, ...result };
    sendSuccess(res, 200, tokenData, 'Login Successfully');
    return;
  } catch (error) {
    sendError(res, 500, "internal server error", error);
    return;
  }
};

exports.createPermission = async (req, res) => {
  if (!req.body.role_id || !req.body.Permissionmetadata) {
    sendError(res, 400, "bad request", 'role_id and Permissionmetadata required');
    return;
  }

  try {
    const permissionData = {
      role_id: req.body.role_id,
      permission_name: req.body.permission_name,
    }

    const permissionMetadata = req.body.Permissionmetadata; // Extract Permissionmetadata array

    // Create the permission record
    const permission = await authService.insertPermission(permissionData);

    // Iterate over each metadata object and associate it with the permission
    for (const metadata of permissionMetadata) {
      metadata.permission_id = permission.id; // Assign the permission id to the metadata object
      await authService.insertPermissionMetadata(metadata);
    }

    sendSuccess(res, 200, permission, 'Permission Create Successfully');
  } catch (error) {
    console.log(error);
    sendError(res, 500, "internal server error", error);
  }
}

exports.viewPermission = async (req, res) => {
  try {

    const result = await authService.findPermission(req);
    sendSuccess(res, 200, result, 'Permission View  Successfully');

  } catch (error) {
    console.log(error);
    sendError(res, 500, "internal server error");

  }
}
exports.permissionDetails = async (req, res) => {
  if (!req.body.id) {
    sendError(res, 400, "ID Required", 'ID Required');
    return;
  }
  try {

    const result = await authService.findPermissionData(req.body.id);
    console.log(result);
    sendSuccess(res, 200, result, 'Permission View  Successfully');

  } catch (error) {
    console.log(error);
    sendError(res, 500, "internal server error");

  }
}

exports.permissionUpdate = async (req, res) => {
  if (!req.body.permission_id || !req.body.Permissionmetadata) {
    sendError(res, 400, "Bad request", 'permission_id and Permissionmetadata are required');
    return;
  }

  try {
    const permissionId = req.body.permission_id;
    const permissionMetadata = req.body.Permissionmetadata;
    const pData = {
      permission_name: req.body.permission_name,
      role_id: req.body.role_id,
    }
    await authService.updatePermission(permissionId, pData);
    await authService.permmissionDelete(permissionId);

    for (const metadata of permissionMetadata) {
      const mergedObject = {
        ...metadata,
        permission_id: permissionId
      };
      await authService.permmissiondUpdate(mergedObject);

    }

    sendSuccess(res, 200, pData, 'Permission updated successfully');
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Internal server error", error);
  }
}




//////

exports.userStatusUpdate = async (req, res) => {
  try {
    if (!req.body.id) {
      sendError(res, 400, "bad request , id required ", 'id required');
    }

    if (typeof req.body.status !== 'boolean') {
      sendError(res, 400, "bad request , status required", 'status required');
      return
    }
    const result = await authService.changeStatue(req.body.id, req.body.status);
    sendSuccess(res, 200, result, 'Status Update Successfully');

  } catch (error) {
    sendError(res, 500, "internal server error");

  }
}

exports.userDetails = async (req, res) => {
  try {
    if (!req.body.id) {
      sendError(res, 400, " ID Required", ' ID Required');

    }
    const result = await User.findOne({ where: { id: req.body.id }, attributes: { exclude: ['password'] }, raw: true, nest: true });
    sendSuccess(res, 200, result, 'User data get Successfully');

  } catch (error) {
    sendError(res, 500, "internal server error", error);

  }
}


exports.userUpdate = async (req, res) => {
  try {
    if (!req.body.id) {
      sendError(res, 400, "ID Required", 'ID Required');
      return; // Exit the function early if ID is missing
    }
    if (!req.body.permission_id) {
      sendError(res, 404, "permission id required", 'permission id required');
      return
    }
    //permission_id
    const getData = await userService.checkRole(req.body.permission_id);

    if (!getData) {
      sendError(res, 404, "Invalid permission id", 'Invalid permission id');
      return
    }
    const data = {
      username: req.body.username.trim().toLowerCase(),
      role_id: getData.role_id,
      permission_id: req.body.permission_id,
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      isAdmin: true, // Not sure where isAdmin is coming from, adjust as needed
    };

    // Check if the password is provided in the request body
    if (req.body.password) {
      // If password is provided, hash it and include it in the update data
      data.password = bcrypt.hashSync(req.body.password, 8);
    }

    // Perform the update operation
    await User.update(data, { where: { id: req.body.id } });

    sendSuccess(res, 200, req.body.username, 'User data updated successfully');
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Internal server error", error);
    return
  }
}



exports.userLogs = async (req, res) => {
  try {

    const data = await userlog.findAll({
      include: [{
        model: User,
        as: 'User',
        attributes: ['id', 'username', 'email'], // Specify attributes to include
      }],
      order: [
        ['id', 'DESC']
      ]
    });
    sendSuccess(res, 200, data, '  success');

    // sendSuccess(res, 200, req.body.username, 'User data updated successfully');
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Internal server error", error);

    return
  }
}





//

function createSlug(inputString) {
  // Using the slugify package
  return slugify(inputString, {
    replacement: '-',        // Replace spaces with -
    remove: /[$*_+~.()'"!\-:@]/g, // Remove characters to be replaced
    lower: true              // Convert to lowercase
  });
}



