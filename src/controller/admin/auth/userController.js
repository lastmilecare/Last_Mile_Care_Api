
const { sendSuccess, sendError } = require('../../../util/responseHandler');
const { sequelize, User, Role } = require("../../../../db/models");
// 
exports.userList = async (req, res) => {
    try {
        const result = await User.findAll({
            attributes: [
                'username',
                'name',
                'role_id',
                'email',
                'phone',
                'status',
                'id'
            ],
            include: {
                model: Role,
                as: 'role',
                attributes: ['id', 'role_title', 'slug']
            },
            raw: true, nest: true,
        });
        sendSuccess(res, 200, result, 'User List');
    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error");
    }
};