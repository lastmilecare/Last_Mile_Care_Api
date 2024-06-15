const bcrypt = require('bcryptjs');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;
const configJwttokenCenter = configJwt.JWT_CENTER;
const { sequelize, User, userlog } = require("../../db/models");
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.checkUserPass = async (password, userdata, res) => {
  try {
    console.log("userdata----", userdata);



    let passwordIsValid = bcrypt.compareSync(password, userdata.password);
    if (!passwordIsValid) {
      return { "status": "invalid_password" };
    }

    const token = jwt.sign(
      {
        data: {
          id: userdata.id,
        },
      },
      configJwttoken,
      { expiresIn: '10d' } // Token expires after 10 days
    );
    let makeResponseObject = {
      token,
      role: userdata.slug,
      username: userdata.username,
      isAdmin: userdata.isAdmin,
      permission: userdata.permission || null
    };

    const cookieOptions = {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,

    };
    res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));

    return makeResponseObject;
  } catch (error) {
    // Handle any potential errors here
    console.error('Error in generating JWT token:', error);
    throw error;
  }
};

exports.checkUserPassCenter = async (password, userdata, res) => {
  try {
    let passwordIsValid = bcrypt.compareSync(password, userdata.password);

    if (!passwordIsValid) {
      return { "status": "invalid_password" };
    }

    const token = jwt.sign(
      {
        data: {
          id: userdata.id,
        },
      },
      configJwttokenCenter,
      { expiresIn: '10d' } // Token expires after 10 days
    );

    let makeResponseObject = {
      token,
      role: userdata.slug,
      username: userdata.username,
      isAdmin: userdata.isAdmin,
      permission: userdata.permission || null
    };

    const cookieOptions = {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
      httpOnly: true,
      // Add other cookie options as needed
    };
    res.setHeader('Set-Cookie', cookie.serialize('center_token', token, cookieOptions));

    return makeResponseObject;
  } catch (error) {
    // Handle any potential errors here
    console.error('Error in generating JWT token:', error);
    throw error;
  }
};

exports.checkEmailExist = async (email) => {
  try {
    const checkEmail = await User.findOne({ where: { email: email } });
    return !!checkEmail
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.checkUserNameExist = async (username) => {
  try {
    const checkUserName = await User.findOne({ where: { username: username } });
    return !!checkUserName
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.checkPhoneExist = async (phone) => {
  try {
    const checkphone = await User.findOne({ where: { phone: phone } });
    return !!checkphone
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.createUserLogs = async (userId, type, description) => {
  try {
    await userlog.create({
      user_id: userId,
      action_type: type,
      action_description: description,
      action_time: new Date(),
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
};
//cet login
exports.checkUserPassCet = async (password, userdata, res) => {
  try {
    let passwordIsValid = bcrypt.compareSync(password, userdata.password);

    if (!passwordIsValid) {
      return { "status": "invalid_password" };
    }

    const token = jwt.sign(
      {
        data: {
          id: userdata.id,
        },
      },
      configJwttokenCenter,
      { expiresIn: '10d' } // Token expires after 10 days
    );

    let makeResponseObject = {
      token,
      role: userdata.slug,
      username: userdata.username,
      isAdmin: false,
      isCet: true,
      permission: userdata.permission || null
    };

    const cookieOptions = {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
      httpOnly: true,
      // Add other cookie options as needed
    };
    res.setHeader('Set-Cookie', cookie.serialize('cet_token', token, cookieOptions));

    return makeResponseObject;
  } catch (error) {
    // Handle any potential errors here
    console.error('Error in generating JWT token:', error);
    throw error;
  }
};