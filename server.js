const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { port } = require('./config/envConfig');
const indexRoutes = require('./src/route/index-route.js');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
// Set consistent limits
const jsonLimit = "1gb";
const urlencodedLimit = "1gb";
const fileUploadLimit = 100 * 1024 * 1024; // 100MB
app.set('trust proxy', 1);
//proxy
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: urlencodedLimit }));
app.use(fileUpload({ limits: { fileSize: fileUploadLimit } }));
app.use(cookieParser());
///ip
app.use((req, res, next) => {
  let ip = req.ip || req.connection.remoteAddress;

  // Check for the x-forwarded-for header if behind a proxy
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  }
  //fff  console.log('User IP Address:', ip);
  req.userIp = ip; // Attach the IP to the request object if needed elsewhere

  next();
});
indexRoutes(app);

app.get('/', (req, res) => {
  res.json({ message: `Update - 1 ->>>> Dev Server is running on port ${port}` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
