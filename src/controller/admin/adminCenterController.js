const { sendSuccess, sendError } = require('../../util/responseHandler');
const centerService = require('../../service/globalService/centerService');

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
    status
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
    'status'
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
      status
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
    }

    const result = await centerService.assignCenterToUser(req);
    sendSuccess(res, 201, result, 'Center assign successfully');
  } catch (error) {
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
      sendError(res, 400, "bad request", 'id required');
    }

    if (!req.body.status) {
      sendError(res, 400, "bad request", 'status required');
    }
    const result = await centerService.centerStatusUpdate(req.body.id, req.body.status);
    sendSuccess(res, 200, result, 'Status Update Successfully');
  } catch (error) {
    sendError(res, 500, error, 'Invalid input');
  }
}