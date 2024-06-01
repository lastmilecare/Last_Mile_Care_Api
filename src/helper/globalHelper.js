const { sequelize, User, userlog } = require("../../db/models");

exports.createUserLogs = async (data) => {
    try {
        const {
            user_id,
            action_type,
            action_description,

        } = data;
        console.log("-------------------------------", data);

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