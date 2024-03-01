const { sendSuccess, sendError } = require('../../util/responseHandler');
const centerService = require('../../service/globalService/centerService');

exports.updateMaster = async (req, res) => {
    try {

        sendSuccess(res, 201, insert, 'Create Center successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

    }

}