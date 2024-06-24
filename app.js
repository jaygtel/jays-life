const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const hbsHelpers = require('./src/helpers/handlebars');

// Load environment variables
dotenv.config();

const app = express();

// Set up Handlebars with helpers
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: hbsHelpers,
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views')); // Set the views directory

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./src/routes/index'));
app.use('/contact', require('./src/routes/contact'));
app.use('/about', require('./src/routes/about')); // Add about route

// Start the server
const PORT = process.env.PORT || 4080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
