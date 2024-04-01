'use strict';
const HttpStatusCode = require('../const/HttpStatusCode.js');
function formatResponse(status, code, data = null, message = '') {
  return {
    status,
    code,
    data,
    message,
  };
}

function sendSuccess(res, code, data = null, message = 'Success') {
  return res.status(HttpStatusCode.OK.code).json(formatResponse(true, code, data, message));
}

function sendError(res, code, message) {
  // Use the provided status code from HttpStatusCode module
  return res.status(code).json(formatResponse(false, code, null, message));
}
module.exports = { sendSuccess, sendError };
