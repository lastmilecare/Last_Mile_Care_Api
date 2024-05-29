const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { port } = require('./config/envConfig');
const indexRoutes = require('./src/route/index-route.js');
const fileUpload = require('express-fileupload');

const app = express();

// Set consistent limits
const jsonLimit = "1gb";
const urlencodedLimit = "1gb";
const fileUploadLimit = 100 * 1024 * 1024; // 100MB

app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: urlencodedLimit }));
app.use(fileUpload({ limits: { fileSize: fileUploadLimit } }));
app.use(cookieParser());
app.use(cors());

indexRoutes(app);

app.get('/', (req, res) => {
  res.json({ message: 'Updated Code 04-05-2024' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
