const authRoutes = require('./admin-auth-route.js');
const adminGlobalROute = require('./admin-global-route.js');
const centerRoutes = require('./center-route.js');

module.exports = function (app) {
  authRoutes(app);
  centerRoutes(app);
  adminGlobalROute(app);
  // Add other route files as needed
};