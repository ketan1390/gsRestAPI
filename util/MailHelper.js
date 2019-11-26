const config = require('../config/Config');
const Util = require("./CustomFunctions");
const path = require('path');
const  nodemailer = require('nodemailer');

class MailHelper {
    /**
     * 
     * @param {*} toRecipients // [{"emailId": "test@techaheadcorp.com","name": "test"}]
     * @param {*} subject // "My first email"
     * @param {*} txtBody // ""My first Mailjet email text""
     * @param {*} htmlBody // html body
     * @param {*} cb 
     */
 Send(toRecipients,subject,txtBody,htmlBody,cb) {
    try {
        if(!toRecipients || toRecipients.length==0){
            return cb?cb('Invalid request parameter',null):null;
        }else{

            let recipients= [] ;
            toRecipients.forEach(element => {
                let a = {
                    "Email": element.emailId?element.emailId:""
                    };
                recipients.push(a);
            });       
            
            const mailRequest = mailjet
                            .post("send")
                            .request({
                                "FromEmail":config.MailjetConfig.FromEmailId,
                                "FromName":config.MailjetConfig.FromName,
                                "Subject":subject?subject:"",
                                "Html-part": htmlBody?htmlBody:"",
                                "Recipients":recipients
                            });
                
                mailRequest
                .then((result) => {
                    return cb?cb(null,result.body):null;
                })
                .catch((err) => {
                    Util.SaveException(path.basename(__filename), ' mailHelper.Send', err);
                    return cb?cb(err,null):null;
                });

                }
    } catch (e) {
        Util.SaveException(path.basename(__filename), 'catch block mailHelper.Send exception', e);
        return cb?cb(e,null):null;
    }
 }
 SendEmailVerification(emailId,firstName,cb){
     try{
         let imageBaseUrl=config.MediaStorage.baseUrl;
         let emailTxt=Util.AesEncript(emailId);
         emailTxt=Util.EncodeBase64(emailTxt);
         let verifyLink=`${config.VerificationLink.Registration}?uuid=${emailTxt}`;
        let content = `
        <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Boxlty - mail verification</title>
    <link rel="icon" type="image/x-icon" href="${imageBaseUrl}logo-mini.png">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet">
</head>
<body>
    <div style="font-family: 'Open Sans', Arial, sans-serif;">
        <table style="background:#f3f3f3; width:100%;" cellpadding="0" cellspacing="0" border="0">
            <tbody>
                <tr>
                    <td style="padding: 50px;">
                        <table style="width: 550px;height: 100%;margin: 0 auto" cellpadding="0" cellspacing="0"
                            border="0">
                            <tbody>
                                <tr>
                                    <td style="padding-top: 20px;text-align: center">
                                        <img style="width: 100px;" src="${imageBaseUrl}logo.png" alt="Logo">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="border-radius: 10px;background: #fff;padding: 30px 60px 20px 60px;margin-top: 10px;display: block;">
                                        
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: 500;font-style:
                                              normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #161616;margin-bottom: 10px;">
                                            Hi ${firstName},</p>
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                            Thanks for getting started with Boxlty! We need a little more information to complete your registration, including
											confirmation of your email address. click below to comfirm your email address:
										</p>
                                        <a href="${verifyLink}"
                                            style="background: #cf3692;border: none;color: #fff;padding: 8px 20px;border-radius: 4px;display: inline-block;margin-bottom: 20px;cursor: pointer;">
											Verify email
										</a>                                            
                                        <p style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                            <b style="font-size: 20px;margin-right:10px;">OR</b>
                                            If you’re having trouble clicking the button, copy and paste the URL below into your web browser. 
                                        </p>
                                        <a href="${verifyLink}" style="display: block; font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: 500;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #2b80ff; margin-bottom: 15px;">
                                        ${verifyLink}
                                        </a>
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                            If you did not make this request, please contact us or ignore this message.
                                        </p>
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #bbbbbb;">
                                            This is an automatically generated email please do not reply to this email.
                                            If
                                            you face any issues, please contact us at help@boxlty.com</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="width:135px;margin: 20px auto 0 auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <table style="float:left;margin-right:15px;" cellpadding="0" cellspacing="0"
                                            border="0">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                        <img style="display: block;margin: auto;max-width: 8px;"
                                                            src="${imageBaseUrl}fb.png" alt="facebook">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="float:left;margin-right:15px;" cellpadding="0" cellspacing="0"
                                            border="0">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                        <img style="display: block;margin: auto;max-width: 15px;"
                                                            src="${imageBaseUrl}twitter.png" alt="facebook">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="float:left;" cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                        <img style="display: block;margin: auto;max-width: 15px;"
                                                            src="${imageBaseUrl}youtube.png" alt="facebook">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 20px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td
                                        style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        Copyright &copy; 2019 Boxlty. All rights reserved.</td>
                                </tr>
                                <tr>
                                    <td style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style:
                                              normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color:
                                              #bbb;text-align: center; padding-top: 15px;"> Don't like these emails? <a
                                            style="color:inherit;" href="#">Unsubscribe</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>        
        `;
        let recipients=[]; recipients.push({"emailId": emailId});
        this.Send(recipients,"Confirm your Boxlty email address!",'',content,function(err,res){
            if(err){
                return cb?cb(err,null):null;
            }else{
                return cb?cb(null,res):null;
            }
        });       
       
     }catch(e){
        Util.SaveException(path.basename(__filename), 'catch block mailHelper.SendEmailVerification exception', e);
        return cb?cb(e,null):null;
     }
 } 
 /**
  * Method:SendOTP
  * Purpose: to send otp in case of forget password
  * @param {*} emailId 
  * @param {*} cb 
  */
 SendOTP(emailId,otp,cb){
  try{
     let imageBaseUrl=config.MediaStorage.baseUrl;      
     let content = `
     <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Boxlty - OTP Mailer</title>
    <link rel="icon" type="image/x-icon" href="${imageBaseUrl}logo-mini.png">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet">
</head>

<body>
    <div style="font-family: 'Open Sans', Arial, sans-serif;">
        <table style="background:#f3f3f3; width:100%;" cellpadding="0" cellspacing="0" border="0">
            <tbody>
                <tr>
                    <td style="padding: 50px;">
                        <table style="width: 550px;height: 100%;margin: 0 auto" cellpadding="0" cellspacing="0"
                            border="0">
                            <tbody>
                                <tr>
                                    <td style="padding-top: 20px;text-align: center">
                                        <img style="width: 100px;" src="${imageBaseUrl}logo.png" alt="Logo">
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="border-radius: 10px;background: #fff;padding: 30px 60px 20px 60px;margin-top: 10px;display: block;">
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 18px;font-weight: 500;font-style: normal;font-stretch: normal;line-height: 1.11;letter-spacing: normal;color: #2b80ff;">
                                            Your OTP is here! </p>
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: 500;font-style:
                                              normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #161616;margin-bottom: 10px;">
                                            Hi,
                                        </p>
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                            Please enter below OTP to reset your Boxlty account password.
                                        </p>
                                       
                                        <p style="font-family: 'Open Sans', Arial, sans-serif;font-size: 28px;font-weight: 900;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                                ${otp}
                                        </p>
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                            If you did not make this request, please contact us or ignore this message.
                                        </p>
                                        <p
                                            style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #bbbbbb;">
                                            This is an automatically generated email please do not reply to this email.
                                            If
                                            you face any issues, please contact us at help@boxlty.com
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="width:135px;margin: 20px auto 0 auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <table style="float:left;margin-right:15px;" cellpadding="0" cellspacing="0"
                                            border="0">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                        <img style="display: block;margin: auto;max-width: 8px;"
                                                            src="${imageBaseUrl}fb.png" alt="facebook">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="float:left;margin-right:15px;" cellpadding="0" cellspacing="0"
                                            border="0">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                        <img style="display: block;margin: auto;max-width: 15px;"
                                                            src="${imageBaseUrl}twitter.png" alt="facebook">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="float:left;" cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                        <img style="display: block;margin: auto;max-width: 15px;"
                                                            src="${imageBaseUrl}youtube.png" alt="facebook">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin: 20px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td
                                        style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                        Copyright &copy; 2019 Boxlty. All rights reserved.</td>
                                </tr>
                                <tr>
                                    <td style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style:
                                              normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color:
                                              #bbb;text-align: center; padding-top: 15px;"> Don't like these emails? <a
                                            style="color:inherit;" href="#">Unsubscribe</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>        
     `;
     let recipients=[]; recipients.push({"emailId": emailId,"name": ""});
     this.Send(recipients,"Your OTP for resetting Boxlty Password",'',content,function(err,res){
        //
        if(err){
            return cb?cb(err,null):null;
        }else{
            return cb?cb(null,res):null;
        }
        
     });  
  }catch(e){
     Util.SaveException(path.basename(__filename), 'catch block mailHelper.SendEmailVerification exception', e);
     return cb?cb(e,null):null;
  }
}
SendPropertyInvitation(invitedMembers,firstName,propertyName,cb){
    try{
        let imageBaseUrl=config.MediaStorage.baseUrl;
        let verifyLink=`${config.VerificationLink.WebsiteHome}`;
       let content = `
       <!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <title>Boxlty - mail verification</title>
   <link rel="icon" type="image/x-icon" href="${imageBaseUrl}logo-mini.png">
   <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet">
</head>
<body>
   <div style="font-family: 'Open Sans', Arial, sans-serif;">
       <table style="background:#f3f3f3; width:100%;" cellpadding="0" cellspacing="0" border="0">
           <tbody>
               <tr>
                   <td style="padding: 50px;">
                       <table style="width: 550px;height: 100%;margin: 0 auto" cellpadding="0" cellspacing="0"
                           border="0">
                           <tbody>
                               <tr>
                                   <td style="padding-top: 20px;text-align: center">
                                       <img style="width: 100px;" src="${imageBaseUrl}logo.png" alt="Logo">
                                   </td>
                               </tr>
                               <tr>
                                   <td
                                       style="border-radius: 10px;background: #fff;padding: 30px 60px 20px 60px;margin-top: 10px;display: block;">  
                                       <p
                                           style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                           <strong>${firstName}</strong> would like to invite you to be the part of Team member.
										   Kindly register yourself on Boxlty web app to enjoy your ownership.
                                       </p>
                                       <a href="${verifyLink}"
                                           style="background: #cf3692;border: none;color: #fff;padding: 8px 20px;border-radius: 4px;display: inline-block;margin-bottom: 20px;cursor: pointer;">
                                           Click
                                       </a>                                            
                                       <p style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                           <b style="font-size: 20px;margin-right:10px;">OR</b>
                                           If you’re having trouble clicking the button, copy and paste the URL below into your web browser. 
                                       </p>
                                       <a href="${verifyLink}" style="display: block; font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: 500;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #2b80ff; margin-bottom: 15px;">
                                       ${verifyLink}
                                       </a>
                                       <p
                                           style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;">
                                           If you did not make this request, please contact us or ignore this message.
                                       </p>
                                       <p
                                           style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #bbbbbb;">
                                           This is an automatically generated email please do not reply to this email.
                                           If
                                           you face any issues, please contact us at help@boxlty.com
									   </p>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                       <table style="width:135px;margin: 20px auto 0 auto;" cellpadding="0" cellspacing="0" border="0">
                           <tbody>
                               <tr>
                                   <td>
                                       <table style="float:left;margin-right:15px;" cellpadding="0" cellspacing="0"
                                           border="0">
                                           <tbody>
                                               <tr>
                                                   <td
                                                       style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                       <img style="display: block;margin: auto;max-width: 8px;"
                                                           src="${imageBaseUrl}fb.png" alt="facebook">
                                                   </td>
                                               </tr>
                                           </tbody>
                                       </table>
                                       <table style="float:left;margin-right:15px;" cellpadding="0" cellspacing="0"
                                           border="0">
                                           <tbody>
                                               <tr>
                                                   <td
                                                       style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                       <img style="display: block;margin: auto;max-width: 15px;"
                                                           src="${imageBaseUrl}twitter.png" alt="facebook">
                                                   </td>
                                               </tr>
                                           </tbody>
                                       </table>
                                       <table style="float:left;" cellpadding="0" cellspacing="0" border="0">
                                           <tbody>
                                               <tr>
                                                   <td
                                                       style="background: #e6e6e6;color:#2b80ff;border-radius: 100%;height: 35px;width: 35px; margin-right:20px;">
                                                       <img style="display: block;margin: auto;max-width: 15px;"
                                                           src="${imageBaseUrl}youtube.png" alt="facebook">
                                                   </td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                       <table style="margin: 20px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                           <tbody>
                               <tr>
                                   <td
                                       style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;">
                                       Copyright &copy; 2019 Boxlty. All rights reserved.</td>
                               </tr>
                               <tr>
                                   <td style="font-family: 'Open Sans', Arial, sans-serif;font-size: 14px;font-weight: normal;font-style:
                                             normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color:
                                             #bbb;text-align: center; padding-top: 15px;"> Don't like these emails? <a
                                           style="color:inherit;" href="#">Unsubscribe</a>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </td>
               </tr>
           </tbody>
       </table>
   </div>
</body>

</html>        
       `;
       let recipients=[]; 
       recipients=invitedMembers;
       this.Send(recipients,"Boxlty property invitation",'',content,function(err,res){
           if(err){
               return cb?cb(err,null):null;
           }else{
               return cb?cb(null,res):null;
           }
       });       
      
    }catch(e){
       Util.SaveException(path.basename(__filename), 'catch block mailHelper.SendEmailVerification exception', e);
       return cb?cb(e,null):null;
    }
}
}
module.exports = new MailHelper();
