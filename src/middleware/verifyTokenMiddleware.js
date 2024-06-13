const jwt = require('jsonwebtoken');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;
const { sendSuccess, sendError } = require('../../src/util/responseHandler');

const { sequelize, User, Role } = require("../../db/models");

const verifyTokenMiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies

    if (!token) {
        return sendError(res, 400, "Token ID Required", 'Token ID Required');
    }

    jwt.verify(token, configJwttoken, async (err, decoded) => {
        if (err) {
            console.log(err);
            if (err.name === 'JsonWebTokenError') {
                return sendError(res, 401, "JsonWebTokenError", 'JsonWebTokenError');
            }
            if (err.name === 'TokenExpiredError') {
                return sendError(res, 401, "Token has expired", 'Token has expired');
            }
            return sendError(res, 500, "JsonWebTokenError", 'Failed to authenticate token');
        }
        if (decoded.exp <= Date.now() / 1000) {
            return sendError(res, 401, "Token Expired", 'Token has expired');
        }

        try {
            const getUser = await User.findOne({
                where: { id: decoded.data.id, isAdmin: true, status: true },
                attributes: ['role_id', 'id', 'isAdmin'],
                include: {
                    model: Role, // Assuming Role is the name of your Role model
                    as: 'role',
                    attributes: ['id', 'slug'], // Include specific attributes of the Role model
                },
                raw: true,
                nest: true
            });

            if (!getUser) {
                return sendError(res, 401, "User not found or not authorized", 'User not found or not authorized');
            }

            req.userId = decoded.data.id;
            next();
        } catch (error) {
            console.error('Error fetching user:', error);
            return sendError(res, 500, "Server error", 'Failed to fetch user');
        }
    });
};




module.exports = verifyTokenMiddleware;
