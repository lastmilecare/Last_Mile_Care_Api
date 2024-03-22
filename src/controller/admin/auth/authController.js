const slugify = require('slugify');
const { sendSuccess, sendError } = require('../../../util/responseHandler');
const HttpStatusCodes = require('../../../const/HttpStatusCode.js');
const rolseService = require('../../../service/adminService/rolseService.js');
const userService = require('../../../service/adminService/userService.js');
const authService = require('../../../service/adminService/authService.js');
const authHelper = require('../../../helper/authHelper.js');

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

    }
    if (!req.body.password) {
      sendError(res, 400, "Password ID Required", 'Password ID Required');

    }
    const result = await authService.adminAuth(req.body.email, req.body.password);
    console.log(result);
    if (result.status == "no_user_found") {
      sendError(res, 404, "no_user_found", 'No User Found!');
    }
    const tokenData = await authHelper.checkUserPass(req.body.password, result, res);
    if (tokenData.status == "invalid_password") {
      sendError(res, 404, "no_user_found", 'Invalid Password');
    }
    sendSuccess(res, 200, tokenData, 'Login Successfully');

  } catch (error) {
    sendError(res, 500, "internal server error", error);
  }
};

exports.createPermission = async (req, res) => {
  try {
    const data = {
      user_id: req.body.id,
      permission_group: req.body.permission_group,
      permission_type: req.body.permission_type,
    }
    const result = await authService.insertPermission(data);
    sendSuccess(res, 200, result, 'Permission Create  Successfully');

  } catch (error) {
    sendError(res, 500, "internal server error", error);

  }
}

exports.viewPermission = async (req, res) => {
  try {

    const result = await authService.findPermission(req);
    sendSuccess(res, 200, result, 'Permission View  Successfully');

  } catch (error) {
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



function createSlug(inputString) {
  // Using the slugify package
  return slugify(inputString, {
    replacement: '-',        // Replace spaces with -
    remove: /[$*_+~.()'"!\-:@]/g, // Remove characters to be replaced
    lower: true              // Convert to lowercase
  });
}
