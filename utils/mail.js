const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'developerhb15@gmail.com',
    pass: 'japessuyktuacmyy',
  },
});

module.exports = {
  transporter,
};
