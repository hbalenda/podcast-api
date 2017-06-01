const nodemailer = require('nodemailer');

module.exports = function(req, res) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PW
      }
  });

  let mailOptions = {
      from: `${req.body.email}`,
      to: process.env.SUBMISSION_EMAIL,
      subject: req.body.subject,
      text: req.body.body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      } else {
        res.json({
          result: "success",
          message: "Message sent!"
        })
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });

}
