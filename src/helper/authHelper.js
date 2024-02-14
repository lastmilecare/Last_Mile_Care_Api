const bcrypt = require('bcryptjs');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;
var jwt = require('jsonwebtoken');

exports.checkUserPass = async (password, userdata ) => {
    let makeResponseObject={};
    let passwordIsValid = bcrypt.compareSync(password, userdata.password);
     if (!passwordIsValid) {
      return  {"status":"invalid_password"};
    }
    
    const token = jwt.sign(
      {
        expiresIn: '72h',
        data: {
          id: userdata.id,
        },
         
      },
      configJwttoken
    );
    console.log(userdata);
    makeResponseObject.token = token;
    makeResponseObject.role=userdata.slug;
    makeResponseObject.username=userdata.username
     return makeResponseObject;
  };
  