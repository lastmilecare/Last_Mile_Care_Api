const authRoutes = require('./admin-auth-route.js');
const adminGlobalROute = require('./admin-global-route.js');
const centerRoutes = require('./center-route.js');
const centerAuthRoutes = require('./center-auth-route.js');
const doctorAuthRoutes = require('./doctor-route.js');
const cetAuthRoutes = require('./cet-route.js');


module.exports = function (app) {
  authRoutes(app);
  centerRoutes(app);
  adminGlobalROute(app);
  centerAuthRoutes(app);
  doctorAuthRoutes(app);
  cetAuthRoutes(app);
  // Add other route files as needed
};