
const { sendSuccess, sendError } = require('../../../util/responseHandler');
const { sequelize, User, Role, Permission } = require("../../../../db/models");
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
                'isAdmin',
                'permission_id',
                'id'
            ],
            where: { isAdmin: true },
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'role_title', 'slug']
                },
                {
                    model: Permission,
                    as: 'permission',
                    attributes: ['id', 'permission_name']
                }
            ],
            raw: true, nest: true,
            order: [['id', 'DESC']]
        });
        sendSuccess(res, 200, result, 'User List');
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "internal server error");
    }
};