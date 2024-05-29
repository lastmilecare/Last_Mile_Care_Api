const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require("body-parser")

const cookieParser = require('cookie-parser');
const { port } = require('./config/envConfig');
const indexRoutes = require('./src/route/index-route.js');
const app = express();
const fileUpload = require('express-fileupload');

//
app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Parse URL-encoded bodies

app.use(fileUpload());
app.use(cookieParser()); // Add cookie-parser middleware

app.use(cors());
indexRoutes(app);

app.get('/', (req, res) => {
  res.json({ message: 'Updated Code 04-05-2024' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
