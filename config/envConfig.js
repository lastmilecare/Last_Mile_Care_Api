const dotenv = require('dotenv');
dotenv.config(); 
 
  const port = process.env.PORT || 3000;
   const API_PREFIX_ADMIN = process.env.API_PREFIX_ADMIN || '/api/v1/admin';

  // Database
  const databaseName = process.env.DATABASE_NAME || 'default_database';
  const userName = process.env.USER_NAME || 'default_user';
  const password = process.env.PASSWORD || 'default_password';
  const host = process.env.HOST || 'localhost';
  const JWT_ADMIN =process.env.JWT_ADMIN 
  // Email
  const emailApiKey = process.env.EMAIL_API_KEY || 'default_email_api_key';
  const emailFrom = process.env.EMAIL_FROM || 'default_email@example.com';

  // Other Keys
  const secretKey = process.env.SECRET_KEY || 'default_secret_key';
  const anotherKey = process.env.ANOTHER_KEY || 'default_another_key';
  const prefix = {
    admin: API_PREFIX_ADMIN
  };
  
 
module.exports = {
  port,
  JWT_ADMIN,
  prefix,
  database: {
    name: databaseName,
    user: userName,
    password,
    host,
  },
  email: {
    apiKey: emailApiKey,
    from: emailFrom,
  },
  otherKeys: {
    secretKey,
    anotherKey,
  },
};
 