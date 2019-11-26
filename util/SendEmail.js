const promise = require('promise');
nodemailer = require('nodemailer');
const config = require('../config/Config');

/**
 * Send Email Class
 * with default paramters 
 * host  
 * port
 * username
 * password
 * from
 */
class SendEmail {

    constructor()   {}

    //custom email function to send mails 
    send(to, subject, html) {
        return new Promise((resolve, reject) => {
            try {
                let transporter = nodemailer.createTransport(
                    {
                        host: config.SmtpConfig.host,
                        port: config.SmtpConfig.port,
                        secure: false,  // use SSL
                        auth: {
                            user: config.SmtpConfig.username,
                            pass: config.SmtpConfig.password
                        },
                        logger: false,
                        debug: true
                    }, {
                        from: config.SmtpConfig.from,
                        headers: {
                            'X-Laziness-level': 1000 // just an example header, no need to use this
                        }
                    }
                );

                let mailOptions = {
                    from: config.SmtpConfig.from, // sender address
                    to: to, // list of receivers
                    subject: subject, // Subject line
                    text: html, // plain text body
                    html: html // html body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    try{
                        if (error) {
                            reject(error);
                        }else{
                            resolve(true);
                        }
                        
                    } catch(e) {
                        reject(e);
                    }
                    
                    
                });
            } catch (e) {
                console.log('e', e)
                reject(e)
            }
        })
    }
}


module.exports = new SendEmail();
