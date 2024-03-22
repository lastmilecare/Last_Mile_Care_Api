
const { sendSuccess, sendError } = require('../../../util/responseHandler');
const { sequelize, User } = require("../../../../db/models");
// 
exports.userList = async (req, res) => {
    try {
        const result = await User.findAll({
            raw: true, nest: true, attributes: ['username',
                'name',
                'role_id',
                'email',
                'phone',
                'status']
        });
        sendSuccess(res, 200, result, 'User List');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
};