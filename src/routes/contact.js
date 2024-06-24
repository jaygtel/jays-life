const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
require('dotenv').config();

// MailGun configuration
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },
  host: 'api.eu.mailgun.net' // Specify the European region endpoint
};

const nodemailerMailgun = nodemailer.createTransport(mailgun(auth));

router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.MAILGUN_FROM,
    to: process.env.MAILGUN_TO,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  nodemailerMailgun.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error: ' + error.message });
    }
    res.json({ message: 'Thanks for your message, we will respond within 72 hours.' });
  });
});

module.exports = router;
