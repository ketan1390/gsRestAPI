"use strict";

var promise = require('promise');
const sendEmail = require("./SendEmail");
const config = require("../config/Config");

function MessageTrigger() { }


MessageTrigger.prototype.forgotPassword = function (mailId, TempPassword) {
    let body = "", subject = "";
    return new promise(function (resolve, reject) {
    try {
    
    subject = 'Forget Password';
    body = `Hi , <br/> Below is provided you the temporary password to login , you can reset your password after login <br />`;
    body += 'Your Temporary Password is '+TempPassword;
    
    
    sendEmail.send(mailId, subject, body).then(response => {
            
            resolve(true);
    }).catch(err => {
            resolve(false);
    });
    
    } catch (e) {
            
            resolve(false);
    }
    });
    }
    

module.exports = new MessageTrigger();;