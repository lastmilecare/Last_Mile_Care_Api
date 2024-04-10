const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { port } = require('./config/envConfig');
const indexRoutes = require('./src/route/index-route.js');
const app = express();
const fileUpload = require('express-fileupload');

//
console.log(port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser()); // Add cookie-parser middleware

app.use(cors());
indexRoutes(app);

app.get('/', (req, res) => {
  res.json({ message: 'Updated Code 10-04-2024' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
