const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  getLanguage: () => process.env.LANGUAGE || 'en',
  currentYear: () => new Date().getFullYear()
};
