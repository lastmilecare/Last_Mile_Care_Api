const { where } = require("sequelize");
const {
  sequelize,
  Center,
  User,
  Centeruser, Permission
} = require("../../../db/models");
const bcrypt = require("bcryptjs");
const { sendSuccess, sendError } = require('../../util/responseHandler');

const { checkEmailExist, checkUserNameExist, checkPhoneExist } = require("../../helper/authHelper");

async function insertCenter(data) {
  try {
    return await Center.create(data);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateCenter(centerId, data) {
  try {
    const center = await Center.findByPk(centerId);
    if (!center) {
      throw new Error("Center not found");
    }
    await center.update(data);
    return center;
  } catch (error) {
    throw new Error(error);
  }
}

async function findAllCenter(req) {
  try {
    return await Center.findAll({ order: [['id', 'DESC']] });
  } catch (error) {
    throw new Error(error);
  }
}

async function assignCenterToUser(req, res, getData) {
  try {
    const { username, name, phone, email, password, center_id, signature, short_code } = req.body;
    const phoneNumber = String(phone)

    const getLastCenterId = await Centeruser.findOne({
      order: [['id', 'DESC']],
    });


    const nextId = getLastCenterId ? parseInt(getLastCenterId.id) + 1 : 1;
    // const external_id = `${short_code}00${nextId}`;
    const external_id = `${short_code}${nextId.toString().padStart(3, '0')}`;

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
      center_id,
      external_id: external_id
    }

    const userInsert = await User.create(data);
    console.log(signature);
    const userData = await Centeruser.create({
      user_id: userInsert.id,
      center_id: center_id,
      signature: signature,
      short_code: short_code
    })
    const resData = { signature, userInsert }
    return resData;
  } catch (error) {
    throw new Error(error);
  }
}

async function centerStatusUpdate(id, status) {
  try {
    return await Center.update({ status: status }, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function getCenterUser(req) {
  try {
    const centerUsers = await Centeruser.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email'] }, // Include associated User details
        { model: Center, as: 'center' } // Include associated Center details
      ],
      order: [['id', 'DESC']],
    });

    return centerUsers;
  } catch (error) {
    throw new Error(error);
  }
}
async function findCenter(id) {
  try {
    const result = await Center.findOne({
      where: { id: id }
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
}



module.exports = {
  updateCenter,
  findCenter,
  getCenterUser,
  centerStatusUpdate,
  assignCenterToUser,
  findAllCenter,
  insertCenter
};
