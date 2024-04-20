const jwt = require('jsonwebtoken');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_CENTER;
const { sendSuccess, sendError } = require('../../src/util/responseHandler');
const { sequelize, User, Role } = require("../../db/models");

const verifyTokenMiddleware = async (req, res, next) => { // Add async keyword here
    const token = req.cookies.center_token; // Get the token from cookies

    if (!token) {
        return sendError(res, 400, "Token Required", 'Token Required');
    }

    try {
        const decoded = await new Promise((resolve, reject) => { // Wrap jwt.verify in a Promise
            jwt.verify(token, configJwttoken, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        if (decoded.exp <= Date.now() / 1000) {
            return sendError(res, 401, "Token Expired", 'Token has expired');
        }

        const getUser = await User.findOne({
            where: { id: decoded.data.id, isAdmin: false },
            attributes: ['role_id', 'id'],
            include: {
                model: Role, // Assuming Role is the name of your Role model
                as: 'role',
                attributes: ['id', 'slug'], // Include specific attributes of the Role model
            },
            raw: true,
            nest: true
        });
        if (!getUser.role.slug == 'center') {
            sendError(res, 401, "Invalid_role", 'Invalid ROle');
        }
        req.userId = decoded.data.id;
        next();
    } catch (err) {
        console.log(err);
        if (err.name === 'JsonWebTokenError') {
            return sendError(res, 401, "JsonWebTokenError", 'JsonWebTokenError');
        }
        if (err.name === 'TokenExpiredError') {
            return sendError(res, 401, "Token has expired", 'Token has expired');
        }
        return sendError(res, 500, "Failed to authenticate token", 'Failed to authenticate token');
    }
};

module.exports = verifyTokenMiddleware;
