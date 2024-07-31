const { sendSuccess, sendError } = require('../../src/util/responseHandler');
const { Op } = require('sequelize');
const { DRIVERMASTER } = require("../../db/models");

const checkDriverNumber = async (req, res, next) => {
    const contactNumber = req.body.contactNumber;

    try {
        // Check if exact contactNumber already exists
        const exactNumber = await DRIVERMASTER.findOne({
            where: { contactNumber: contactNumber },
            attributes: ['contactNumber', 'id'],
            raw: true,
            nest: true
        });

        if (exactNumber) {
            return sendError(res, 400, "Phone number already exists", 'Phone number already exists');
        }

        // Check if any contactNumber contains the provided value (like search)
        const similarNumber = await DRIVERMASTER.findOne({
            where: {
                contactNumber: {
                    [Op.like]: `%${contactNumber}%`
                }
            },
            attributes: ['contactNumber', 'id'],
            raw: true,
            nest: true
        });

        if (similarNumber) {
            return sendError(res, 400, "Similar phone number already exists", 'Similar phone number already exists');
        }

        // If no conflicts, proceed to next middleware or route handler
        next();
    } catch (error) {
        console.error('Error fetching user:', error);
        return sendError(res, 500, "Server error", 'Failed to fetch user');
    }
};

module.exports = checkDriverNumber;
