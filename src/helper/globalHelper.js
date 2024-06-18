const {
    sequelize,
    User,
    userlog,
    Center,
    Cetuser,
    Centeruser, } = require("../../db/models");
const bcrypt = require("bcryptjs");

exports.createUserLogs = async (data) => {
    try {
        const {
            user_id,
            action_type,
            action_description,
            user_ip,
            action_time,

        } = data;

        const insert = await userlog.create({
            user_id: user_id,
            action_type: action_type,
            user_ip: user_ip,
            action_description: action_description,
            action_time: action_time,
        })
        return insert;
    } catch (error) {
        // Handle any potential errors here

        throw error;
    }
};

exports.getCenterId = async (id) => {
    try {
        return await Centeruser.findOne({ where: { user_id: id }, raw: true, nest: true })

    } catch (error) {


        throw error;
    }
};
exports.getCetId = async (id) => {
    try {
        return await Cetuser.findOne({ where: { user_id: id }, raw: true, nest: true })

    } catch (error) {


        throw error;
    }
};

exports.assignCetToUser = async (req, res, getData) => {
    try {
        const { username, name, phone, email, password, cet_id } = req.body;
        const phoneNumber = String(phone)

        // const getLastCenterId = await Centeruser.findOne({
        //     order: [['id', 'DESC']],
        // });


        // const nextId = getLastCenterId ? parseInt(getLastCenterId.id) + 1 : 1;
        // // const external_id = `${short_code}00${nextId}`;
        // const external_id = `${short_code}${nextId.toString().padStart(3, '0')}`;

        const data = {
            username: username.trim().toLowerCase(),
            name,
            phone: phoneNumber,
            email: email.toLowerCase(),
            role_id: getData.role_id,
            permission_id: getData.id,
            status: true,
            isAdmin: false,
            password: bcrypt.hashSync(password, 8),
            // center_id,
            // external_id: external_id
        }

        const userInsert = await User.create(data);
        const userData = await Cetuser.create({
            user_id: userInsert.id,
            cet_id: cet_id,

        })
        const resData = { userData, userInsert }
        return resData;
    } catch (error) {
        throw new Error(error);
    }
}; 