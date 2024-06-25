const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { create } = require('express-handlebars');
const helpers = require('./public/helpers/handlebars');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4080;

const contactRouter = require('./public/routes/contact');
const aboutRouter = require('./public/routes/about');
const indexRouter = require('./public/routes/index');
const blogRouter = require('./public/routes/blog');
const pf2eRouter = require('./public/routes/pf2e');
const dnd5eRouter = require('./public/routes/dnd5e');
const sr5Router = require('./public/routes/sr5');
const applyRouter = require('./public/routes/apply');

// Set up view engine
const hbs = create({ extname: '.hbs', layoutsDir: path.join(__dirname, 'public/views/layouts'), defaultLayout: 'main', helpers });
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
app.use('/blog', blogRouter);
app.use('/games/pf2e', pf2eRouter);
app.use('/games/dnd5e', dnd5eRouter);
app.use('/games/sr5', sr5Router);
app.use('/games/apply', applyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
