const jwt = require('jsonwebtoken');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;
const { sendSuccess, sendError } = require('../../src/util/responseHandler');


const verifyTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies

    if (!token) {
        return sendError(res, 400, "Token ID Required", 'Token ID Required');
    }

    jwt.verify(token, configJwttoken, (err, decoded) => {
        if (err) {
            console.log(err);
            if (err.name === 'JsonWebTokenError') {
                return sendError(res, 401, "JsonWebTokenError", 'JsonWebTokenError');

            }
            return sendError(res, 500, "JsonWebTokenError", 'Failed to authenticate token');
        }
        req.userId = decoded.data.id;
        next();
    });
};


module.exports = verifyTokenMiddleware;
