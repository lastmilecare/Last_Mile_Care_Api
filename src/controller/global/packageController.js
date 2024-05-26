const { sendSuccess, sendError } = require('../../util/responseHandler');
const {
    sequelize,
    Packagemanagment,
    Centerpackage,
    Package,
    Center
} = require("../../../db/models");
// 
exports.addPackage = async (req, res) => {

    try {
        const { package_name, package_id, package_list, short_code } = req.body

        const getLastCenterId = await Packagemanagment.findOne({
            order: [['id', 'DESC']], // Correctly specify the order by clause
        });

        // Extract the numeric part and increment it
        const nextId = getLastCenterId ? parseInt(getLastCenterId.id) + 1 : 1;
        const external_id = `${short_code}00${nextId}`;
        const data = {
            external_id: external_id,
            package_type: short_code,
            package_name,
            package_id,
            package_list,
            status: true
        }
        const insert = await Packagemanagment.create(data);

        sendSuccess(res, 201, insert, 'addPackage successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
        return
    }
};
exports.listPackage = async (req, res) => {

    try {

        const reqData = await Packagemanagment.findAll({ raw: true, nest: true, order: [['id', 'DESC']] });
        sendSuccess(res, 200, reqData, 'Success');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
        return
    }
};

exports.updatePackageStatus = async (req, res) => {

    try {
        if (!req.body.id) {
            sendError(res, 400, "bad request", 'id required');
            return
        }

        if (typeof req.body.status !== 'boolean') {
            sendError(res, 400, "bad request , status required", 'status required');
            return
        }
        const user = await Packagemanagment.findOne({ where: { id: req.body.id } });

        if (!user) {
            sendError(res, 404, "User id not found", 'User id not found');
            return
        }
        const result = await Packagemanagment.update({ status: req.body.status }, {
            where: {
                id: req.body.id,
            },
        })
        sendSuccess(res, 200, result, 'Status Update Successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");

    }
};
exports.addPackageTOCenter = async (req, res) => {
    const {
        package_price,
        package_frequency,
        package_id,
        center_id, short_code } = req.body
    try {
        const getLastCenterId = await Centerpackage.findOne({
            order: [['id', 'DESC']], // Correctly specify the order by clause
        });

        // Extract the numeric part and increment it
        const nextId = getLastCenterId ? parseInt(getLastCenterId.id) + 1 : 1;
        const external_id = `${short_code}00${nextId}`;

        const data = {
            package_price,
            package_frequency,
            package_id,
            center_id,
            external_id: external_id,
            status: true
        };

        const reqData = await Centerpackage.create(data);

        sendSuccess(res, 201, reqData, 'Centerpackage created Successfully');
    } catch (error) {
        return sendError(res, 500, error, 'Invalid input');
    }
};



exports.viewCenterPackage = async (req, res) => {
    try {
        const reqData = await Centerpackage.findAll({
            include: [
                { model: Packagemanagment, as: 'package' }, // Include associated Package details
                { model: Center, as: 'center' } // Include associated Center details
            ],
            raw: true, nest: true,
            order: [['id', 'DESC']]
        });
        sendSuccess(res, 200, reqData, 'Centerpackage created Successfully');
    } catch (error) {
        console.log(error);
        return sendError(res, 500, error, 'Invalid input');
    }
};


exports.packageDetails = async (req, res) => {

    if (!req.body.id) {
        sendError(res, 400, "bad request", 'id required');
        return;
    }
    try {
        const reqData = await Packagemanagment.findOne({
            where: {
                id: req.body.id // Corrected syntax for the where clause
            },
            raw: true,
            nest: true
        });

        sendSuccess(res, 200, reqData, 'Package details retrieved successfully');
    } catch (error) {
        return sendError(res, 500, error, 'Error retrieving package details');
    }
};

exports.packageUpdate = async (req, res) => {
    const { id, package_name, package_id, package_list } = req.body;

    if (!req.body.id) {
        sendError(res, 400, "bad request", 'id required');
        return;
    }
    try {
        let packageToUpdate = await Packagemanagment.findByPk(id);

        // Check if the package exists
        if (!packageToUpdate) {
            sendError(res, 404, 'Not found', 'Package not found');
            return;
        }

        // Update package attributes with new data
        packageToUpdate.package_name = package_name;
        packageToUpdate.package_id = package_id;
        packageToUpdate.package_list = package_list;

        // Save the updated package
        await packageToUpdate.save();

        sendSuccess(res, 200, packageToUpdate, 'Package updated successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};

exports.centerPackageDetails = async (req, res) => {

    if (!req.body.id) {
        sendError(res, 400, "bad request", 'id required');
        return;
    }
    try {
        const reqData = await Centerpackage.findOne({
            where: {
                id: req.body.id // Corrected syntax for the where clause
            },
            raw: true,
            nest: true
        });

        sendSuccess(res, 200, reqData, 'Package details retrieved successfully');
    } catch (error) {
        sendError(res, 500, error, 'Error retrieving package details');
    }
};

exports.centerPackageUpdate = async (req, res) => {
    try {
        const { id, package_price, package_frequency, package_id, center_id } = req.body;

        // Check if the ID is provided
        if (!id) {
            sendError(res, 400, 'Bad request', 'Center package ID is required for updating');
            return;
        }

        // Find the center package by its ID
        let centerPackageToUpdate = await Centerpackage.findByPk(id);

        // Check if the center package exists
        if (!centerPackageToUpdate) {
            sendError(res, 404, 'Not found', 'Center package not found');
            return;
        }

        // Update center package attributes with new data
        centerPackageToUpdate.package_price = package_price;
        centerPackageToUpdate.package_frequency = package_frequency;
        centerPackageToUpdate.package_id = package_id;
        centerPackageToUpdate.center_id = center_id;

        // Save the updated center package
        await centerPackageToUpdate.save();

        sendSuccess(res, 200, centerPackageToUpdate, 'Center package updated successfully');
    } catch (error) {
        sendError(res, 500, error, 'Failed to update center package');
    }
};

exports.updateCenterPackageStatus = async (req, res) => {

    try {
        if (!req.body.id) {
            sendError(res, 400, "bad request", 'id required');
            return
        }

        if (typeof req.body.status !== 'boolean') {
            sendError(res, 400, "bad request , status required", 'status required');
            return
        }
        const user = await Centerpackage.findOne({ where: { id: req.body.id } });

        if (!user) {
            sendError(res, 404, "User id not found", 'User id not found');
            return
        }
        const result = await Centerpackage.update({ status: req.body.status }, {
            where: {
                id: req.body.id,
            },
        })
        sendSuccess(res, 200, result, 'Status Update Successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");

    }
};


