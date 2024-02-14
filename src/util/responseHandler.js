'use strict';
const HttpStatusCode = require('../const/HttpStatusCode.js');

function formatResponse(status,code, data = null, message = '') {
  return {
    status,
    code,
    data,
    message,
  };
}

function sendSuccess(res, code , data = null, message = 'Success') {
  res.status(HttpStatusCode.OK.code).json(formatResponse('success', code,data, message));
}

function sendError(res, code ,  statusCode, message = 'Error') {
  // Use the provided status code from HttpStatusCode module
  res.status(statusCode).json(formatResponse('error', code,null, message));
}

module.exports = { sendSuccess, sendError };
