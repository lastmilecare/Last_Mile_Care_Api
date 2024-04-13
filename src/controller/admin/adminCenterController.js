const { sendSuccess, sendError } = require('../../util/responseHandler');
const centerService = require('../../service/globalService/centerService');
const userService = require('../../service/adminService/userService.js');
const bcrypt = require("bcryptjs");

const {
  sequelize,
  Center,
  User,
  Centeruser,

} = require("../../../db/models");

// 
exports.createCenter = async (req, res) => {



  const {
    project_start_date,
    project_name,
    project_unique_id,
    project_district,
    project_state,
    project_address,
    agency_name,
    agency_district,
    agency_state,
    agency_spoc_name,
    agency_spoc_email,
    agency_spoc_contact_number,

    project_end_date,
    agency_spoc_alternate_name,
    agency_spoc_alternate_contact_number
  } = req.body;




  const requiredFields = [
    'project_start_date',
    'project_name',
    'project_unique_id',
    'project_district',
    'project_state',
    'project_address',
    'agency_name',
    'agency_district',
    'agency_state',
    'agency_spoc_name',
    'agency_spoc_email',


  ];

  try {
    const missingFields = requiredFields.filter(field => {
      return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
    });

    console.log("Missing Fields:", missingFields); // Log missing fields

    if (missingFields.length > 0) {
      const msg = missingFields.join(', ');
      return sendError(res, 400, msg + " is required", 'Invalid input');

    }

    const data = {
      project_start_date,
      project_name,
      project_unique_id,
      project_district,
      project_state,
      project_address,
      agency_name,
      agency_district,
      agency_state,
      agency_spoc_name,
      agency_spoc_email,
      agency_spoc_contact_number,
      status: true,
      project_end_date,
      agency_spoc_alternate_name,
      agency_spoc_alternate_contact_number,
      project_signed_agreement_file: req.filePath
    };
    console.log(req);

    const insert = await centerService.insertCenter(data);
    sendSuccess(res, 201, insert, 'Create Center successfully');
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
  }
};

exports.viewCenter = async (req, res) => {
  try {
    const result = await centerService.findAllCenter(req);
    sendSuccess(res, 200, result, 'View Center successfully');
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
  }
}
//

exports.assignCenter = async (req, res) => {
  try {

    if (!req.body.center_id) {
      sendError(res, 400, "bad request", 'center id required');
      return
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
    console.log("fffffffffff")
    const result = await centerService.assignCenterToUser(req, getData);
    sendSuccess(res, 201, result, 'Center assign successfully');
  } catch (error) {
    console.log("error", error)
    sendError(res, 500, error, 'Invalid input');
  }
}
exports.centerUser = async (req, res) => {
  try {

    const result = await centerService.getCenterUser(req);
    sendSuccess(res, 200, result, 'Success');
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
  }
}

exports.updateCenterStatus = async (req, res) => {
  try {
    if (!req.body.id) {
      sendError(res, 400, "bad request , id required", 'id required');
      return
    }

    if (typeof req.body.status !== 'boolean') {
      sendError(res, 400, "bad request , status required", 'status required');
      return
    }

    const result = await centerService.centerStatusUpdate(req.body.id, req.body.status);
    sendSuccess(res, 200, result, 'Status Update Successfully');
    return
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
    return
  }
}

exports.centerEdit = async (req, res) => {
  try {
    if (!req.body.id) {
      sendError(res, 400, "bad request , id required", 'id required');
    }


    const result = await centerService.findCenter(req.body.id);
    sendSuccess(res, 200, result, 'Status Update Successfully');
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
  }
}


exports.centerUpdate = async (req, res) => {
  console.log(req.body)
  const {
    project_start_date,
    project_name,
    project_unique_id,
    project_district,
    project_state,
    project_address,
    agency_name,
    agency_district,
    agency_state,
    agency_spoc_name,
    agency_spoc_email,
    agency_spoc_contact_number,

    project_end_date,
    agency_spoc_alternate_name,
    agency_spoc_alternate_contact_number,
    id
  } = req.body;

  const requiredFields = [
    'project_start_date',
    'project_name',
    'project_unique_id',
    'project_district',
    'project_state',
    'project_address',
    'agency_name',
    'agency_district',
    'agency_state',
    'agency_spoc_name',
    'agency_spoc_email',
    'agency_spoc_contact_number',
    'id'
  ];

  try {
    const missingFields = requiredFields.filter(field => {
      return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
    });

    console.log("Missing Fields:", missingFields); // Log missing fields

    if (missingFields.length > 0) {
      const msg = missingFields.join(', ');
      return res.status(400).json({ error: msg + " is required" });
    }

    const data = {
      project_start_date,
      project_name,
      project_unique_id,
      project_district,
      project_state,
      project_address,
      agency_name,
      agency_district,
      agency_state,
      agency_spoc_name,
      agency_spoc_email,
      agency_spoc_contact_number,
      status,
      project_end_date,
      agency_spoc_alternate_name,
      agency_spoc_alternate_contact_number,
      project_signed_agreement_file: req.filePath
    };

    // Assuming you have a function to update the center
    const centerId = id; // Assuming centerId is passed as a URL parameter
    const updatedCenter = await centerService.updateCenter(centerId, data);

    // Return the updated center
    sendSuccess(res, 200, updatedCenter, ' Update Successfully');
  } catch (error) {
    // Handle errors
    sendError(res, 500, error);
  }

}

exports.centerUserDetails = async (req, res) => {
  if (!req.body.id) {
    sendError(res, 400, "id  required", 'id  required');
    return;
  }

  try {
    const userId = req.body.id; // Assuming userId is sent in the request params
    const userDetails = await User.findByPk(userId, {
      include: [
        { model: Centeruser, as: 'centerusers' },
        { model: Center, through: { attributes: [] }, as: 'centers' }
      ],
      exclude: ['password']
    });

    if (!userDetails) {
      sendError(res, 404, 'User not found', 'User not found');
      return;
    }
    const { password, ...userDetailsWithoutPassword } = userDetails.toJSON();

    sendSuccess(res, 200, userDetailsWithoutPassword, 'User details retrieved successfully');
  } catch (error) {
    console.log(error);
    sendError(res, 500, error, 'Invalid input');
  }
}


exports.centerUserUpdate = async (req, res) => {
  try {
    // Destructure request body
    const { id, username, name, permission_id, phone, email, password, center_id } = req.body;

    // Find the user record to update
    let user = await User.findByPk(id);
    if (!user) {
      return sendError(res, 404, 'User not found', 'User not found');
    }
    const getData = await userService.checkRole(permission_id);

    if (!getData) {
      sendError(res, 404, "Invalid permission id", 'Invalid permission id');
      return
    }

    // Update user data with new values
    user.username = username;
    user.name = name;
    user.role_id = getData.role_id;
    user.permission_id = permission_id;
    user.phone = phone;
    user.email = email;
    user.password = password; // You might want to handle password hashing here
    await user.save();

    // If center_id is provided, update associated center
    if (center_id) {
      let centeruser = await Centeruser.findOne({ where: { user_id: id } });
      if (!centeruser) {
        // Create new centeruser if not exists
        centeruser = await Centeruser.create({ user_id: id, center_id: center_id });
      } else {
        // Update existing centeruser
        centeruser.center_id = center_id;
        await centeruser.save();
      }
    }

    // Send success response with updated user data
    sendSuccess(res, 200, user, 'User data updated successfully');
  } catch (error) {
    // Handle errors
    return sendError(res, 500, error.message, 'Invalid input');
  }
}


exports.updateCenterUserStatus = async (req, res) => {
  console.log("ddddddddddd")
  try {
    if (!req.body.id) {
      sendError(res, 400, "bad request", 'id required');
      return
    }

    if (typeof req.body.status !== 'boolean') {
      sendError(res, 400, "bad request , status required", 'status required');
      return
    }
    const user = await User.findOne({ where: { id: req.body.id } });

    if (!user) {
      sendError(res, 404, "User id not found", 'User id not found');
      return
    }
    const result = await User.update({ status: req.body.status }, {
      where: {
        id: req.body.id,
      },
    })
    sendSuccess(res, 200, result, 'Status Update Successfully');

  } catch (error) {
    sendError(res, 500, "internal server error");

  }
}

