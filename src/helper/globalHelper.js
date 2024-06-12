const {
    sequelize,
    User,
    userlog,
    Center,
    Centeruser } = require("../../db/models");

exports.createUserLogs = async (data) => {
    try {
        const {
            user_id,
            action_type,
            action_description,

        } = data;

        const insert = await userlog.create({
            user_id: user_id,
            action_type: action_type,
            action_description: action_description,
            action_time: new Date(),
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