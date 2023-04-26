const sgMail = require('@sendgrid/mail');
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "gkushagra4812@gmail.com",
        pass: process.env.EMAIL_PASSWORD
    },
});

// For sending mails to invitee emails 
function mailer(link, emails, name, passcode) {
    emails.forEach(email => {
        const msg = {
            to: email,
            from: 'gkushagra4812@gmail.com',
            subject: 'Invite for meeting on Chill Zone',
            html: name + ' is inviting you for a meeting on Chill Zone: <strong><a href=' + process.env.HOSTING_URL + 'join/' + link + '>Join Now</a></strong><br>Meeting Chat Page: <strong><a href=' + process.env.HOSTING_URL + 'chat/' + link + '>Chat</a></strong>' + '<br>Passcode: <strong>' + passcode + '</strong>',
        };
        transporter
            .sendMail(msg)
            .then(() => {
                console.log('Email sent to ' + email + ' by ' + name);
            })
            .catch((err) => {
                console.error('Email failed from ' + name + ' to ' + email);
            });
    });
}

module.exports = mailer;