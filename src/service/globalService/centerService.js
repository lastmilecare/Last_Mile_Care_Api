const { where } = require("sequelize");
const {
  sequelize,
  Center,
  User,
  Centeruser, Permission
} = require("../../../db/models");
const bcrypt = require("bcryptjs");

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

async function assignCenterToUser(req, getData) {
  try {
    const { username, name, phone, email, password, center_id } = req.body;

    if (await checkUserNameExist(username.trim().toLowerCase())) {
      sendError(res, 400, "Username Already Exists", 'Username Already Exists');
      return
    }
    if (await checkEmailExist(email.toLowerCase())) {
      sendError(res, 400, "Email Already Exists", 'Email Already Exists');
      return
    }
    if (await checkPhoneExist(phone)) {
      sendError(res, 400, "Email Already Exists", 'Email Already Exists');
      return
    }

    const data = {
      username: username.trim().toLowerCase(),
      name,
      phone,
      email: email.toLowerCase(),
      role_id: getData.role_id,
      permission_id: getData.id,
      status: true,
      isAdmin: false,
      password: bcrypt.hashSync(password, 8),
      center_id
    }

    const userInsert = await User.create(data)
    await Centeruser.create({
      user_id: userInsert.id,
      center_id: center_id
    })
    return userInsert;
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
        { model: User, as: 'user', attributes: ['id', 'username', 'name', 'status', 'phone', 'email'] }, // Include associated User details
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



module.exports = { updateCenter, findCenter, getCenterUser, centerStatusUpdate, assignCenterToUser, findAllCenter, insertCenter };
