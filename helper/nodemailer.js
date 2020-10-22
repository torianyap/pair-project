var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'toriany6@gmail.com',
    pass: 'GreyFoxofL1ght'
  }
});


module.exports = transporter
