const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { create } = require('express-handlebars');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4080;

const contactRouter = require('./public/routes/contact');
const aboutRouter = require('./public/routes/about');
const indexRouter = require('./public/routes/index');
const blogRouter = require('./public/routes/blog'); // Import blog router

// Set up view engine
const hbs = create({ extname: '.hbs', layoutsDir: path.join(__dirname, 'public/views/layouts'), defaultLayout: 'main' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public/views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter); // Add blog route

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
