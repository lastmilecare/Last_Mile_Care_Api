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
  User,
  Permission
} = require("../../../../db/models");

const bcrypt = require("bcryptjs");

exports.createRole = async (req, res) => {
  console.log(req.body);
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
  try {
    const data = {
      username: req.body.username.trim().toLowerCase(),
      role_id: req.body.role_id,
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      isAdmin: true,
      password: bcrypt.hashSync(req.body.password, 8),
    }
    const result = await userService.createUser(data);
    sendSuccess(res, 201, result.username, 'Success');
  } catch (error) {
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
    console.log("result", result);
    if (result.status == "no_user_found") {
      sendError(res, 404, "no_user_found", 'No User Found!');

    }
    const tokenData = await authHelper.checkUserPass(req.body.password, result, res);
    if (tokenData.status == "invalid_password") {
      sendError(res, 404, "no_user_found or invalid_password", 'Invalid Password');
      return;
    }
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

exports.userStatusUpdate = async (req, res) => {
  try {
    if (!req.body.id) {
      sendError(res, 400, "bad request", 'id required');
    }

    if (!req.body.status) {
      sendError(res, 400, "bad request", 'status required');
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

    const data = {
      username: req.body.username.trim().toLowerCase(),
      role_id: req.body.role_id,
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
  }
}

function createSlug(inputString) {
  // Using the slugify package
  return slugify(inputString, {
    replacement: '-',        // Replace spaces with -
    remove: /[$*_+~.()'"!\-:@]/g, // Remove characters to be replaced
    lower: true              // Convert to lowercase
  });
}
