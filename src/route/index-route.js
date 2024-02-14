const authRoutes = require('./admin-auth-route.js');
const userRoutes = require('./user-auth-route.js');
const adminGlobalROute = require('./admin-global-route.js');

module.exports = function (app) {
  authRoutes(app);
  userRoutes(app);
  adminGlobalROute(app);
  // Add other route files as needed
};