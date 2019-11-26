"use strict";
const Joi = require('@hapi/joi');
const path = require('path');
const RequestValidator = require('../schema/validationSchema/Request');
const UserModel = require('../model/Users');
const Config = require('../config/Config');
const Util = require('../util/CustomFunctions');
const JwtHelper = require('../util/JwtTokenHelper');
const MailHelper = require('../util/MailHelper');
const MailSend = require('../util/MessageTriggers');

class UserController {
  /**
 * @api {post} /api/v1/user/register register
 * @apiName register
 * @apiGroup Common Kitchen user
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription user or kitchen register
 * @apiParam {number} type user type (1,2) 1->'Customer',2->'Kitchen' 
 * @apiParam {String} name user name required when type is 1
 * @apiParam {String} email user email id
 * @apiParam {String} mobile_no user mobile required when type is 1
 * @apiParam {String} device_token user mobile
 * @apiParam {String} device_type user device type enum('1','2','3') "1"->'Website',"2"->'Android',"3"->'iOS'		
 * @apiParam {String} password user account password
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "User registered successfully",
                "result": {
                    "user_id": 174,
                    "@full_error": "q91",
                    "email": "q9211111@gmail.com"
                }
            }
 *      
 * @apiVersion 1.0.0
 **/
  SignUp(req, res) {
    const LangMsg = Config.Messages[req.app.get("lang")];
    try {
      Joi.validate(req.body, RequestValidator.Signup(LangMsg), function(error, value) {
        if (error && error.details[0]) {
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
          return;
        }
        UserModel.SignUp(req.body)
          .then(response => {
            
            //MailHelper.SendEmailVerification(response.emailId,req.body.firstName?req.body.firstName:'',function(er,rt){
              Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.LinkVerificationMsg, response);
            //});
            MailHelper.SendEmailVerification(response.emailId,req.body.firstName?req.body.firstName:'',function(er,rt){
              Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.LinkVerificationMsg, response);
            });



          }).catch(err => {

            if (err == 'EMAIL_EXISTS') {
              Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Conflict, Util.FormatException(LangMsg.EmailExist), null);
            
            } else {
              Util.SaveException(path.basename(__filename), 'SignUp - model - catch-->', err);
              Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(LangMsg.Something_Went_Wrong), err);
            }
          });
      })
    } catch (e) {
      Util.SaveException(path.basename(__filename), 'SignUp', e.stack.toString());
      Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
    }
  }

/**
 * @api {post} /api/v1/user/user-login user-login
 * @apiName user-login
 * @apiGroup AppService 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription user-login 
 * @apiParam {String} email customer email id
 * @apiParam {String} password customer account password
 * @apiParam {String} device_token customer mobile
 * @apiParam {String} device_type customer device type enum('1','2','3') "1"->'Website',"2"->'Android',"3"->'iOS'	
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Login Successfull",
                "result":  {
                    "user_id": 13,
                    "email": "rahultest7@yopmail.com",
                    "is_email_verified": "1",
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsdGVzdDdAeW9wbWFpbC5jb20iLCJ1c2VyX2lkIjoxMywiaWF0IjoxNTcyOTQ1MzQyLCJleHAiOjE1NzI5NjY5NDJ9.yyVMYjcHZU4zAf1mOB5e88ii6qlzqzSxDr4nfQvN5mg",
                    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzI5NDUzNDIsImV4cCI6MTU3NTUzNzM0Mn0.0DNNOPeZeOMaAW8ALnHpXbv8ZI3T07YCorsMst2rmJo",
                    "role_id": 1,
                    "is_active": "1",
                    "is_profile_updated": "0",
                    "name": "Rahul Test",
                    "address": "",
                    "latitude": "",
                    "longitude": "",
                    "mobile_no": "1234567891",
                    "device_token": "qqq1111",
                    "device_type": "1"
                }
            }
 *      
 * @apiVersion 1.0.0
 **/
Login(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];
  try {
    Joi.validate(req.body, RequestValidator.Login(LangMsg), function(error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }      
              
      UserModel.Login(req.body)
        .then(response => {
          if (response.is_email_verified == '0') {
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.EmailVerify, null);
          }
          if(response.role_id !=1){
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.InvalidUserType, {});
          }
          if (response.is_active == '0') {
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserBlocked, null);
          }
          console.log(response);
          let dto = {
            user_id: 0,
            email: '',
            is_email_verified: '0',
            access_token: '',
            refresh_token: '',
            role_id: 1,
            is_active: '0',
            is_profile_updated: '0',
            name: '',
            address: '',
            latitude: '',
            longitude: '',
            mobile_no: '',
            device_token:req.body.device_token,
            device_type:req.body.device_type
          };
          let tokens = JwtHelper.generateToken({
            email: response.email,
            user_id: response.user_id
          });

          dto.user_id = response.user_id;
          dto.email = response.email;
          dto.is_email_verified = response.is_email_verified;
          dto.access_token = tokens.accessToken;
          dto.refresh_token = tokens.refreshToken;
          dto.role_id=response.role_id;
          dto.is_active = response.is_active;
          dto.is_profile_updated= response.is_profile_updated;
          dto.name= response.name;
          dto.address= response.address;
          dto.latitude= response.latitude;
          dto.longitude= response.longitude;
          dto.mobile_no= response.mobile_no;
          dto.device_token=req.body.device_token;
          dto.device_type=req.body.device_type;

          UserModel.SaveRefreshToken({
            userId: response.user_id,
            refreshToken: tokens.refreshToken,
            expTime: Config.JWT.RefreshTokenLife,
            deviceToken: req.body.device_token,
            deviceType: req.body.device_type,
            userType:response.role_id
          }).then((dt) => {
            Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.LoginSuccessfull, dto);
          }).catch((rfErr) => {
            Util.SaveException(path.basename(__filename), 'Login - model-save-refresh token error', rfErr);
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(rfErr), null);
          });
        }).catch(err => {
          console.log(err); 
          if(err=='PASSWORD_INVALID'){
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Unauthorized, LangMsg.InvalidLoginCred, null);
          }else if(err=='EMAILID_INVALID'){
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Unauthorized, LangMsg.InvalidLoginCred, null);
          }else{
            Util.SaveException(path.basename(__filename), 'Login - model error', err);
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(err), null);
          }            
        });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'Login', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}


/**
 * @api {post} /api/v1/user/kitchen-login kitchen login
 * @apiName kitchen-login
 * @apiGroup KitchenService 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription kitchen login 
 * @apiParam {String} email kitchen email id
 * @apiParam {String} password kitchen account password
 * @apiParam {String} device_token device token
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Login Successfull",
                "result":  {
                  "user_id": 6,
                  "email": "rahultest5@yopmail.com",
                  "is_email_verified": "1",
                  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsdGVzdDVAeW9wbWFpbC5jb20iLCJ1c2VyX2lkIjo2LCJpYXQiOjE1NzI2MTQxMjYsImV4cCI6MTU3MjYzNTcyNn0.mIMrJsvhFngbLBgai5bkg-BeyRS6a_cTgTezfQ2W8jw",
                  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzI2MTQxMjYsImV4cCI6MTU3NTIwNjEyNn0.F7fdVYtQVUB9bKbssCqk1coXpEwuX_g5LaDE-ycZRug",
                  "role_id": 2,
                  "is_active": "1",
                  "is_profile_updated": "0",
                  "owner_name": "",
                  "device_token": "qqq1111"
              }
            }
 *      
 * @apiVersion 1.0.0
 **/
KitchenLogin(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];
  try {
    Joi.validate(req.body, RequestValidator.KitchenLogin(LangMsg), function(error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
      console.log(req.body); 
      if(req.headers['is_website']){
        //
      }else{
        //req.body.password = Util.AesDecript(req.body.password); //req.body.password
      }
              
      UserModel.KitchenLogin(req.body)
        .then(response => {
          if (response.is_email_verified == '0') {
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.EmailVerify, null);
          }
          if(response.role_id !=2){
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.InvalidUserType, {});
            }
          if (response.is_active == '0') {
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserBlocked, null);
          }

          
          let dto = {
            user_id: 0,
            email: '',
            is_email_verified: '0',
            access_token: '',
            refresh_token: '',
            role_id: 2,
            is_active: '0',
            is_profile_updated: '0',
            owner_name: '',
            device_token:req.body.device_token,
            kitchen_image : '',
            kitchen_id : ''
          };
          let tokens = JwtHelper.generateToken({
            email: response.email,
            user_id: response.user_id
          });

          dto.user_id = response.user_id;
          dto.email = response.email;
          dto.is_email_verified = response.is_email_verified;
          dto.is_active = response.is_active;
          dto.access_token = tokens.accessToken;
          dto.refresh_token = tokens.refreshToken;
          dto.role_id=response.role_id;
          dto.is_profile_updated= response.is_profile_updated;
          dto.owner_name= response.owner_name;
          dto.device_token=req.body.device_token;
          dto.kitchen_image = response.kitchen_image;
          dto.kitchen_id = response.kitchen_id;
          
          UserModel.SaveRefreshToken({
            userId: response.user_id,
            refreshToken: tokens.refreshToken,
            expTime: Config.JWT.RefreshTokenLife,
            deviceToken: req.body.device_token,
            deviceType: '1',
            userType:response.role_id
            
          }).then((dt) => {
            Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.LoginSuccessfull, dto);
          }).catch((rfErr) => {
            Util.SaveException(path.basename(__filename), 'Login - model-save-refresh token error', rfErr);
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(rfErr), null);
          });
        }).catch(err => {
          console.log(err); 
          if(err=='PASSWORD_INVALID'){
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Unauthorized, LangMsg.InvalidLoginCred, null);
          }else if(err=='EMAILID_INVALID'){
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Unauthorized, LangMsg.InvalidLoginCred, null);
          }else{
            Util.SaveException(path.basename(__filename), 'Login - model error', err);
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(err), null);
          }            
        });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'Login', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}


/**
 * @api {post} /api/v1/user/access-token access-token
 * @apiName access-token
 * @apiGroup Common Kitchen user  
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription kitchen/User access-token 
 * @apiParam {String} user_id customer user_id
 * @apiParam {String} device_token system/app deviceId
 * @apiParam {String} refresh_token refresh_token
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Fetched Successfully.",
                "result": {
                              "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsdGVzdDVAeW9wbWFpbC5jb20iLCJ1c2VyX2lkIjo2LCJpYXQiOjE1NzE4Mzc2MTksImV4cCI6MTU3MTg1OTIxOX0.arFJSQngMJHeLowk-9SYomVGXsE1xpmUmMuAdC0e9nM"
                          }
              }
 *      
 * @apiVersion 1.0.0
 **/
GetAccessToken(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];
  try {
    Joi.validate(req.body, RequestValidator.GetAccessToken(LangMsg), function(error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
      UserModel.GetAccessToken(req.body)
        .then(response => {
          delete response['refresh_token'];
          let dt = JwtHelper.getAccessToken(JSON.parse(JSON.stringify(response)));
          Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.FetchSuccess, dt);
        }).catch(err => {
          let msg = '';let code=Config.Constant.APIResCode.Success;
          switch (err) {
            case 'REFRESH_EXPIRED':
              msg = LangMsg.ExpireToken;
              code=Config.Constant.APIResCode.RefreshExpired;                
              break;
            case 'INVALID_TOKEN':
              msg = LangMsg.InvalidToken;
              code=Config.Constant.APIResCode.InvalidRefreshToken;
              break;
            case 'INVALID_USER':
              msg = LangMsg.NoRecord;
              code=Config.Constant.APIResCode.NotFound;
              break;
            case 'VALID':
              msg = LangMsg.FetchSuccess;
              code=Config.Constant.APIResCode.Success;
              break;
            default:
              msg = err;
              code=Config.Constant.APIResCode.BadRequest;
              break;
          }
          Util.SaveException(path.basename(__filename), 'GetAccessToken - model error', err);
          Util.MakeJsonResponse(res, false, code, Util.FormatException(msg), null);
        });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'GetAccessToken', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}

/**
 * @api {post} /api/v1/user/forgot-password forgot-password
 * @apiName forgot-password
 * @apiGroup Common - kitchen/user/admin 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription  kitchen/User/Admin forgot-password
 * @apiParam {String} email user email
 * @apiParam {number} type user type (1,2,3) 1->'Customer',2->'Kitchen',3->'admin'
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {"status":true,"message":"Temporary password send to your email id","result":{}}
 *      
 * @apiVersion 1.0.0
 **/
ForgetPassword(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];    
  try {
    Joi.validate(req.body, RequestValidator.ForgetPass(LangMsg), function (error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }      
      
      UserModel.GenerateUserPassword(req.body)
      .then(response => {

          MailSend.forgotPassword(req.body.email, response.tempPass).then(result => {
            if(result){
              console.log('result', result);
              console.log('result1', Config.Constant.APIResCode.Success , '+' , LangMsg.EmailSendSuccess)
                Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.EmailSendSuccess, {});
            }
              
          }).catch(err => {
              Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Something_Went_Wrong, err && err.message ? err.message : langMsg.webError, {});
          });


      }).catch(err => {
        let msg = '';
        switch (err) {
          case 'USER_EMAIL_NOT_EXISTS':
            msg = LangMsg.NoRecord;
            break;
          default: msg = err;
            break;
        }
        Util.SaveException(path.basename(__filename), 'ForgetPassword - model error', err);
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
      });

      // UserModel.ForgetPassword({emailId: req.body.email})
      //   .then(response => {   
          
      //     let token = JwtHelper.getResetToken({email: req.body.email,user_id: response.user_id});
      //     let activationUrl = Config.VerificationLink.ForgetPasswordCustomer+'/'+token;
      //     let activeUrl = {url:activationUrl}
      //     // MailHelper.SendOTP(req.body.emailId,otp,function(er,tr){
      //     //   Util.MakeJsonResponse(res, status, code, msg, null);
      //     // });

      //     Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.RestPasswordUrlSent, activeUrl);
                         
         
      //   }).catch(err => { 
      //     let msg='';let code=0;
      //     switch(err){
      //       case 'INVALID':
      //           msg=LangMsg.InvalidEmailId;
      //           code=Config.Constant.APIResCode.NotFound;
      //         break;
      //       default: msg=err;
      //           code = Config.Constant.APIResCode.Forbidden;
      //         break;
      //     }
      //     Util.SaveException(path.basename(__filename), 'ForgetPassword - model error', err);       
      //     Util.MakeJsonResponse(res, false, code, Util.FormatException(msg), null);
      //   });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'ForgetPassword', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}

/**
 * @api {put} /api/v1/user/reset-password  reset-password
 * @apiName reset-password
 * @apiGroup Common - kitchen/user/admin 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription user/kitchen reset-password
 * @apiParam {String} token customer reset token
 * @apiParam {String} password customer reset password
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Password Changed Successfuly",
                "result": {}
              }
 *      
 * @apiVersion 1.0.0
 **/
ResetPassword(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];    
  try {
    Joi.validate(req.body, RequestValidator.ResetPass(LangMsg), function (error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }  
      let pass='';  
      
      pass=req.body.password;
      let token = req.body.token;


      JwtHelper.verifyResetToken(token).then((v)=>{
        
        UserModel.ResetPassword({uId: v.user_id,password:pass})
        .then(response => {   
          let msg=''; let status=false;let code=0;
          switch(Util.ConvertInt(response)){
            case 1: // invalid email or user deleted
              msg=LangMsg.NoRecord;
              code=Config.Constant.APIResCode.NotFound;
              break;
            case 2: // success
              msg=LangMsg.PasswordChangeSuccess;
              code=Config.Constant.APIResCode.Success;
              status=true;
            break;              
            default: // 0 or unknown
                msg=LangMsg.SomethingWentWrong;
              break; 
          }                    
          Util.MakeJsonResponse(res, status, code, msg, null);
        }).catch(err => { 
          let msg='';
          switch(err){
            case 'INVALID_USER':
                msg=LangMsg.NoRecord;
              break;
            default: msg=err;
              break;
          }
          Util.SaveException(path.basename(__filename), 'ResetPassword - model error', err);       
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
        });

      }).catch((err)=>{
          switch (err.name) {
              case 'TokenExpiredError':
                  res.status(Config.Constant.APIResCode.AccessExpired).json({
                      "status": false,
                      "message": Util.FormatException(LangMsg.ExpireToken, 'Failed to authenticate token.'),
                      "result": {}
                  });
                  break;
              default:
                  res.status(Config.Constant.APIResCode.InvalidAccessToken).json({
                      "status": false,
                      "message": Util.FormatException(LangMsg.AuthError, 'Invalid token.'),
                      "result": {}
                  });
                  break;
          }
      })
      
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'ResetPassword', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}

/**
 * @api {put} /api/v1/user/change-password change-password
 * @apiName user/kitchen change-password
 * @apiGroup Common Kitchen user  
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} access_token
 * @apiDescription change-password
 * @apiParam {String} old_pass customer old password
 * @apiParam {String} new_pass customer new password
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Password Updated Successfully",
                "result": {}
              }
 *      
 * @apiVersion 1.0.0
 **/
ChangePassword(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];    
  try {
    Joi.validate(req.body, RequestValidator.ChangePassword(LangMsg), function (error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
      
      let old_pass='';  
      let new_pass='';
      
      old_pass=req.body.old_pass;
      new_pass=req.body.new_pass;
      
      let dto={oldPass:old_pass,newPass:new_pass,userId:req.body.decodedUserId};
      UserModel.ChangePassword(dto)
        .then(response => { 
          Util.MakeJsonResponse(res, true,Config.Constant.APIResCode.Success, LangMsg.UserPasswordUpdated, response);
        }).catch(err => {         
          let msg='';
          switch(err){
            case 'USER_NOT_EXISTS':
                msg=LangMsg.NoRecord;
              break;
            case 'INVALID_PASSWORD':
                msg=LangMsg.InvalidOldPassword;
              break;
            default: msg=err;
              break;
          }
          Util.SaveException(path.basename(__filename), 'ChangePassword - model error', err);       
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
        });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'ChangePassword', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}

/**
 * @api {put} /api/v1/user/set-delivery-address user set-delivery-address
 * @apiName set-delivery-address
 * @apiGroup AppService 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} access_token
 * @apiDescription user set-delivery-address
 * @apiParam {String} city customer city minimum 3 max 20
 * @apiParam {String} address customer address minimum 3 max 255
 * @apiParam {String} zipcode customer address minimum 3 max 15
 * @apiParam {String} mobile_no customer mobile max 15
 * @apiParam {decimal} latitude example->27.203822
 * @apiParam {decimal} longitude example->77.501122
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Success",
                "result": {}
              }
 *      
 * @apiVersion 1.0.0
 **/
SetDeliveryAddress(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];    
  try {
    Joi.validate(req.body, RequestValidator.SetDeliveryAddress(LangMsg), function (error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
      
      const input=req.body;
      UserModel.SetDeliveryAddress(input)
        .then(response => { 
          Util.MakeJsonResponse(res, true,Config.Constant.APIResCode.Success, LangMsg.Success, null);
        }).catch(err => {         
          let msg='';
          msg=err
          Util.SaveException(path.basename(__filename), 'SetDeliveryAddress - model error', err);       
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
        });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'SetDeliveryAddress', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}

/**
 * @api {get} /api/v1/user/get-profile get user profile
 * @apiName  user get-profile
 * @apiGroup AppService 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} access_token
 * @apiDescription get user profile
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Success",
                "result":  {
                  "user_id": 13,
                  "email": "rahultest7@yopmail.com",
                  "name": "Rahul Test",
                  "mobile_no": "1234567891",
                  "profile_image": "",
                  "address": "",
                  "city": "",
                  "zipcode": "",
                  "latitude": "",
                  "longitude": ""
              }
  }
 *      
 * @apiVersion 1.0.0
 **/
GetProfile(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];    
  try {
    
    Joi.validate(req.body, RequestValidator.GetProfile(LangMsg), function (error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
      
      let userId = req.body.decodedUserId?req.body.decodedUserId:0;
      
      UserModel.GetProfile(userId)
        .then(response => {
          let finalData = response?response:{};
          
          Util.MakeJsonResponse(res, true,Config.Constant.APIResCode.Success, LangMsg.Success, finalData);
          
          
        }).catch(err => {         
          let msg='';
          switch(err){
            case 'INVALID_USER':
                msg=LangMsg.NoRecord;
              break;
            default: msg=err;
              break;
          }
          Util.SaveException(path.basename(__filename), 'GetProfile - model error', err);       
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
        });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'GetProfile', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}

/**
 * @api {put} /api/v1/user/update-profile update customer Profile
 * @apiName update-profile
 * @apiGroup AppService 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} access_token
 * @apiDescription update customer Profile
 * @apiParam {String} city customer city minimum 3 max 20
 * @apiParam {String} address customer address minimum 3 max 255
 * @apiParam {String} zipcode customer address minimum 3 max 15
 * @apiParam {decimal} latitude example->27.203822
 * @apiParam {decimal} longitude example->77.501122
 * @apiParam {String} name user name
 * @apiParam {String} mobile_no user mobile
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Profile Updated Successfully",
                "result": {
                    "user_id": 13,
                    "email": "rahultest7@yopmail.com",
                    "name": "Rahul Test",
                    "mobile_no": "1234567891",
                    "profile_image": "",
                    "address": "dfdsfsdfsdf",
                    "city": "test",
                    "zipcode": "1231312",
                    "latitude": "22.123456",
                    "longitude": "22.123456"
                }
            }
 *      
 * @apiVersion 1.0.0
 **/
UpdateProfile(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];    
  try {
    
    Joi.validate(req.body, RequestValidator.UpdateProfile(LangMsg), function (error, value) {
      
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
      
      let userId = req.body.decodedUserId?req.body.decodedUserId:0;
      
      UserModel.UpdateProfile(req.body)
      .then(response => {
        
                       
        UserModel.GetProfile(userId)
          .then(response => {
            let finalData = response?response:{};
            
            Util.MakeJsonResponse(res, true,Config.Constant.APIResCode.Success, LangMsg.ProfileUpdateSuccess, finalData);
            
            
          }).catch(err => {         
            let msg='';
            switch(err){
              case 'INVALID_USER':
                  msg=LangMsg.NoRecord;
                break;
              default: msg=err;
                break;
            }
            Util.SaveException(path.basename(__filename), 'GetProfile - model error', err);       
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
          });

        }).catch(err => {         
          let msg=err;
          Util.SaveException(path.basename(__filename), 'GetProfile - model error', err);       
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
        });

    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'GetProfile', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}


/**
 * @api {put} /api/v1/user/update-image update customer image
 * @apiName update-image
 * @apiGroup AppService 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} access_token
 * @apiDescription update customer image
 * @apiParam {String} profile_image max 50
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {
                "status": true,
                "message": "Success",
                "result": {}
            }
 *      
 * @apiVersion 1.0.0
 **/
UpdateImage(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];    
  try {
    
    Joi.validate(req.body, RequestValidator.UpdateImage(LangMsg), function (error, value) {
      
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
            
      UserModel.UpdateImage(req.body)
      .then(response => {
        
            
          Util.MakeJsonResponse(res, true,Config.Constant.APIResCode.Success, LangMsg.Success, null);
          
        }).catch(err => {         
          let msg=err;
          Util.SaveException(path.basename(__filename), 'UpdateImage - model error', err);       
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
        });

    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'UpdateImage', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}


/*** admin api's */

    /**
   * @api {post} /api/v1/user/admin-login admin Login
   * @apiName admin-login
   * @apiGroup admin 
   * @apiHeader {String} content-type application/json
   * @apiHeader {String} client_secret
   * @apiDescription admin logins to the his private admin panel
   * @apiParam {String} email email
   * @apiParam {String} password password
   * 
   * @apiSuccess {boolean} status           true/false
   * @apiSuccess {Number}  statusCode       universal status code
   * @apiSuccess {String}  message          response message string
   * @apiSuccess {Object}  result             result
   * @apiSuccessExample {json} Success-Response:
              *  HTTP/1.1 200 OK
              * {"status":true,"message":"Login Successfull","result":{"admin_user_id":1,"email":"admin@grubsnap.com","access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdydWJzbmFwLmNvbSIsImFkbWluX3VzZXJfaWQiOjEsImlhdCI6MTU3MzE5NzM1MiwiZXhwIjoxNTczMjE4OTUyfQ.aAZ8J6rZhMmhIU0TnjUrXNDL0TtjzNWQrL9CxmNNum0","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzMxOTczNTIsImV4cCI6MTU3NTc4OTM1Mn0.Gt-2iZWT8Iztv1kW5npOgY1ccE32FD-rdJTSDtY_Ums"}}
   *      
   * @apiVersion 1.0.0
   **/
  AdminLogin(req, res) {
    const LangMsg = Config.Messages[req.app.get("lang")];
    try {
      Joi.validate(req.body, RequestValidator.AdminLogin(LangMsg), function (error, value) {
        if (error && error.details[0]) {
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
          return;
        } else {
          req.body.password = Util.AesConfigurationEncrypt(req.body.password);

          UserModel.AdminLogin(req.body).then(response => {
            if (response.length < 1) {
              return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.EmailOrPasswordIncorrect, null);
            } else {
              let tokens = JwtHelper.generateToken({
                email: req.body.email,
                admin_user_id: response.admin_user_id
              });


              let adminDetail = {};
              adminDetail.admin_user_id = response.admin_user_id;
              adminDetail.email = req.body.email;
              adminDetail.access_token = tokens.accessToken;
              adminDetail.refresh_token = tokens.refreshToken;


              UserModel.AdminSaveRefreshToken({
                admin_user_id: response.admin_user_id,
                refresh_token: tokens.refreshToken,
                expiration_time: Config.JWT.RefreshTokenLife
              }).then((dt) => {
                Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.LoginSuccessfull, adminDetail);
              }).catch((rfErr) => {
                Util.SaveException(path.basename(__filename), 'Admin Login - model-save-refresh token error', rfErr);
                Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(rfErr), null);
              });
            }

          }).catch(err => {

            Util.SaveException(path.basename(__filename), 'Login - model error', err);
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(err), null);

          });
        }
      })
    } catch (e) {
      Util.SaveException(path.basename(__filename), 'Login', e.stack.toString());
      Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
    }
  }

    /**
     * @api {put} /api/v1/user/change-password Admin ChangePassword
     * @apiName change-password
     * @apiGroup admin 
     * @apiHeader {String} content-type application/json
     * @apiHeader {String} client_secret
     * @apiDescription admin change his own password from the admin settings panel
     * @apiParam {String} old_password old_password
     * @apiParam {String} new_password new_password
     * 
     * @apiSuccess {boolean} status           true/false
     * @apiSuccess {Number}  statusCode       universal status code
     * @apiSuccess {String}  message          response message string
     * @apiSuccess {Object}  result             result
     * @apiSuccessExample {json} Success-Response:
                *  HTTP/1.1 200 OK
                * {"status":true,"message":"Password updated successfully","result":{}}
     *      
     * @apiVersion 1.0.0
     **/
    AdminChangePassword(req, res) {
      const LangMsg = Config.Messages[req.app.get("lang")];
      try {
        Joi.validate(req.body, RequestValidator.ChangePassword(LangMsg), function (error, value) {
          if (error && error.details[0]) {
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
            return;
          }
  
          let tokenUser = JwtHelper.getJWTPayload(req.headers['access_token']);
          if (tokenUser.admin_user_id != req.body.decodedAdminId) {
            return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Unauthorized, LangMsg.AuthError, null);
          }
          let OldPassword = '';
          let NewPassword = '';
  
          OldPassword = req.body.old_password;
          NewPassword = req.body.new_password;
  
          let JsonRequest = { AdminUserId: req.body.decodedAdminId, OldPassword: req.body.old_password, NewPassword: req.body.new_password };
          UserModel.AdminChangePassword(JsonRequest)
            .then(response => {
              Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.AdminPasswordUpdated, response);
            }).catch(err => {
              let msg = '';
              switch (err) {
                case 'ADMIN_NOT_EXISTS':
                  msg = LangMsg.NoRecord;
                  break;
                case 'INVALID_PASSWORD':
                  msg = LangMsg.InvalidOldPassword;
                  break;
                default: msg = err;
                  break;
              }
              Util.SaveException(path.basename(__filename), 'ChangePassword - model error', err);
              Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
            });
        })
      } catch (e) {
        Util.SaveException(path.basename(__filename), 'ChangePassword', e.stack.toString());
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
      }
    }

/**
 * @api {post} /api/v1/user/access-token-admin access-token-admin
 * @apiName access-token-admin
 * @apiGroup admin 
 * @apiHeader {String} content-type application/json
 * @apiHeader {String} client_secret
 * @apiDescription admin access-token 
 * @apiParam {String} refresh_token refresh_token
 * @apiParam {String} admin_user_id admin_user_id
 * 
 * @apiSuccess {boolean} status           true/false
 * @apiSuccess {Number}  statusCode       universal status code
 * @apiSuccess {String}  message          response message string
 * @apiSuccess {Object}  result             result
 * @apiSuccessExample {json} Success-Response:
            *  HTTP/1.1 200 OK
            * {"status":true,"message":"Token fetched successfully","result":{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl91c2VyX2lkIjoxLCJlbWFpbCI6ImFkbWluQGdydWJzbmFwLmNvbSIsImlhdCI6MTU3MzE5NzMwNSwiZXhwIjoxNTczMjE4OTA1fQ.szXauYpyUpJ4MlTdj9ECRn0yzbQrutvfPXxOa_f0zN4"}}
 *      
 * @apiVersion 1.0.0
 **/
FetchAccessToken(req, res) {
  const LangMsg = Config.Messages[req.app.get("lang")];
  try {
    let RequestType = {};
    RequestType.admin_user_id = req.body.admin_user_id;
    RequestType.refresh_token = req.body.refresh_token;
    Joi.validate(RequestType, RequestValidator.FetchAccessToken(LangMsg), function (error, value) {
      if (error && error.details[0]) {
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
        return;
      }
      UserModel.FetchAccessToken(req.body)
        .then(response => {
          delete response['refresh_token'];
          let dt = JwtHelper.getAccessToken(JSON.parse(JSON.stringify(response)));
          dt.access_token = dt.accessToken;
          delete dt.accessToken;
          Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.FetchSuccess, dt);
        }).catch(err => {
          let msg = '';let code=Config.Constant.APIResCode.Success;
          switch (err) {
            case 'REFRESH_EXPIRED':
              msg = LangMsg.ExpireToken;
              code=Config.Constant.APIResCode.RefreshExpired;                
              break;
            case 'INVALID_TOKEN':
              msg = LangMsg.InvalidToken;
              code=Config.Constant.APIResCode.InvalidRefreshToken;
              break;
            case 'INVALID_ADMIN':
              msg = LangMsg.NoRecord;
              code=Config.Constant.APIResCode.NotFound;
              break;
            case 'VALID':
              msg = LangMsg.FetchSuccess;
              code=Config.Constant.APIResCode.Success;
              break;
            default:
              msg = err;
              code=Config.Constant.APIResCode.BadRequest;
              break;
          }
          Util.SaveException(path.basename(__filename), 'FetchAccessToken - model error', err);
          Util.MakeJsonResponse(res, false, code, Util.FormatException(msg), null);
        });
    })
  } catch (e) {
    Util.SaveException(path.basename(__filename), 'FetchAccessToken', e.stack.toString());
    Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
  }
}

  /**
   * @api {get} /api/v1/user/users-list?search_keyword=&page_num=1/2/3 user UsersList
   * @apiName users-list
   * @apiGroup admin/user  
   * @apiHeader {String} content-type application/json
   * @apiHeader {String} access_token
   * @apiDescription admin manage users listing to the admin panel
   * @apiParam {String} search_keyword search_keyword
   * @apiParam {String} page_num page_num
   * 
   * @apiSuccess {boolean} status           true/false
   * @apiSuccess {Number}  statusCode       universal status code
   * @apiSuccess {String}  message          response message string
   * @apiSuccess {Object}  result           result
   * @apiSuccessExample {json} Success-Response:
              *  HTTP/1.1 200 OK
              * {"status":true,"message":"Users data found","result":{"totalUsersCount":3,"usersList":[{"totalUsersCount":3,"user_id":13,"email":"rahultest7@yopmail.com","is_email_verified":"1","is_active":"1","is_deleted":"0","first_name":"","last_name":"","mobile_no":"1234567891","address":"dfdsfsdfsdf"},{"totalUsersCount":3,"user_id":12,"email":"sankarshan.pandey@techaheadcorp.com","is_email_verified":"1","is_active":"1","is_deleted":"0","first_name":"Sankarshan","last_name":"Pandey","mobile_no":"9958216610","address":""},{"totalUsersCount":3,"user_id":11,"email":"deepali.vig@techaheadcorp.com","is_email_verified":"1","is_active":"1","is_deleted":"0","first_name":"Deepali","last_name":"Vig","mobile_no":"7065111351","address":""}]}}
   *      
   * @apiVersion 1.0.0
   **/
  UsersList(req, res) {
    const LangMsg = Config.Messages[req.app.get("lang")];
    try {
      Joi.validate(req.query, RequestValidator.UsersList(LangMsg), function (error, value) {
        if (error && error.details[0]) {
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
          return;
        } else {
          const input = req.query || {};
          input.page_num = parseInt(input.page_num) || 1;

          const offset = (input.page_num - 1) * Config.Constant.PageLimit;

          const searchKeyword = input.search_keyword ? decodeURIComponent(input.search_keyword) : '';

          UserModel.UsersList(searchKeyword, Config.Constant.PageLimit, offset).then(response => {
            let result = {};
            
            if (response.length < 1) {
              
              return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.NoUsersListFound, null);
            } else {
              
              result.usersList = response;
              result.totalUsersCount = response[0].totalUsersCount;
              return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.UsersListFound, result);
            }

          }).catch(err => {

            Util.SaveException(path.basename(__filename), 'UsersList - model error', err);
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(err), null);

          });
        }
      })
    } catch (e) {
      Util.SaveException(path.basename(__filename), 'UsersList', e.stack.toString());
      Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
    }
  }

    /**
     * @api {put} /api/v1/user/update-user-status/:user_id?is_active=0/1 user UpdateUserStatus
     * @apiName update-user-status
     * @apiGroup admin/user 
     * @apiHeader {String} content-type application/json
     * @apiHeader {String} access_token
     * @apiParam {String} user_id user_id
     * @apiParam {String} is_active is_active
     * @apiDescription admin user active status has been updated 1 => is active and vice-versa
     * 
     * @apiSuccess {boolean} status           true/false
     * @apiSuccess {Number}  statusCode       universal status code
     * @apiSuccess {String}  message          response message string
     * @apiSuccess {Object}  result           result
     * @apiSuccessExample {json} Success-Response:
                *  HTTP/1.1 200 OK
                * {"status":true,"message":"User account has been actived","result":1}
     *      
     * @apiVersion 1.0.0
     **/
    UpdateUserStatus(req, res) {
      const LangMsg = Config.Messages[req.app.get("lang")];
      try {
        let RequestType = {};
        let UserId = req.params.user_id;
        let IsActive = req.query.is_active;
  
        RequestType.user_id = req.params.user_id ? UserId : '';
        RequestType.is_active = req.query.is_active ? IsActive : '';
        RequestType.role_id = '1';
  
        Joi.validate(RequestType, RequestValidator.UpdateUserStatus(LangMsg), function (error, value) {
          if (error && error.details[0]) {
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
            return;
          } else {
            UserModel.UpdateUserStatus(RequestType).then(response => {
              let SuccessMsg = '';
              if (RequestType.is_active > 0)
                SuccessMsg = LangMsg.UserActive;
              else
                SuccessMsg = LangMsg.UserInActive;
              return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, SuccessMsg, null);
  
  
            }).catch(err => {
              let msg = '';
              switch (err) {
                case 'INVALID_USER':
                  msg = LangMsg.NotACustomer;
                  break;
                default: msg = err;
                  break;
              }
              Util.SaveException(path.basename(__filename), 'UpdateUserStatus - model error', err);
              Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);
  
            });
          }
        })
      } catch (e) {
        Util.SaveException(path.basename(__filename), 'UpdateUserStatus', e.stack.toString());
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
      }
    }

  /**
   * @api {put} /api/v1/user/user-block/:user_id?is_deleted=0/1 user UserBlock
   * @apiName user-block
   * @apiGroup admin/user 
   * @apiHeader {String} content-type application/json
   * @apiHeader {String} access_token
   * @apiParam {String} user_id user_id
   * @apiParam {String} is_deleted is_deleted
   * @apiDescription admin user block status has been updated 1 => blocked and vice-versa
   * 
   * @apiSuccess {boolean} status           true/false
   * @apiSuccess {Number}  statusCode       universal status code
   * @apiSuccess {String}  message          response message string
   * @apiSuccess {Object}  result           result
   * @apiSuccessExample {json} Success-Response:
              *  HTTP/1.1 200 OK
              {"status":true,"message":"User account has been blocked","result":{}}
    *      
    * @apiVersion 1.0.0
    **/
  UserBlock(req, res) {
    const LangMsg = Config.Messages[req.app.get("lang")];
    try {
      let RequestType = {};

      //temporary till front-end integrates the AES
      // let UserId = Util.AesConfigurationEncrypt(req.params.user_id);
      // let IsDeleted = Util.AesConfigurationEncrypt(req.query.is_deleted);
      // let RoleId = Util.AesConfigurationEncrypt(req.query.role_id);

      // RequestType.user_id = req.params.user_id ? Util.AesConfigurationDecrypt(req.params.user_id) : '';
      // RequestType.is_deleted = req.query.is_deleted ? Util.AesConfigurationDecrypt(req.query.is_deleted) : '';
      // RequestType.role_id = req.query.is_deleted ? Util.AesConfigurationDecrypt(req.query.role_id) : '';

      let UserId = req.params.user_id;
      let IsDeleted = req.query.is_deleted;

      RequestType.user_id = req.params.user_id ? UserId : '';
      RequestType.is_deleted = req.query.is_deleted ? IsDeleted : '';
      RequestType.role_id = '1';

      Joi.validate(RequestType, RequestValidator.UserBlock(LangMsg), function (error, value) {
        if (error && error.details[0]) {
          Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
          return;
        } else {
          UserModel.UserBlock(RequestType).then(response => {
            let SuccessMsg = '';
            if (RequestType.is_deleted > 0)
              SuccessMsg = LangMsg.UserBlock;
            else
              SuccessMsg = LangMsg.UserUnBlock;
            return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, SuccessMsg, null);


          }).catch(err => {
            let msg = '';
            switch (err) {
              case 'INVALID_USER':
                msg = LangMsg.NotACustomer;
                break;
              default: msg = err;
                break;
            }
            Util.SaveException(path.basename(__filename), 'UserBlock - model error', err);
            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatException(msg), null);

          });
        }
      })
    } catch (e) {
      Util.SaveException(path.basename(__filename), 'UserBlock', e.stack.toString());
      Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
    }
  }

  /**
     * @api {get} /api/v1/user/azure-sas-token?container_name=&file_name= AzureSasToken
     * @apiName azure-sas-token
     * @apiGroup admin
     * @apiHeader {String} content-type application/json
     * @apiHeader {String} client_secret
     * @apiDescription fetch the azure sas token for file upload on blob storage
     * @apiParam    container_name        container_name
     * @apiParam    file_name               file_name
    
     * @apiSuccess {boolean} status           true/false
     * @apiSuccess {Number}  statusCode       universal status code
     * @apiSuccess {String}  message          response message string
     * @apiSuccess {Object}  result             result
     * @apiSuccessExample {json} Success-Response:
            *  {"status":true,"message":"Azure Sas token retrieved successfully","result":{"token":"st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D","uri":"https://grubsnapblob.blob.core.windows.net/grubsnapblob/BcJQo1hVP1KA__bulb.jpeg?st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D"}}
    **/
   AzureSasToken(req,res){
    const LangMsg = Config.Messages[req.app.get("lang")];
      try{

          let RequestType = {};
          RequestType.container_name = req.query.container_name;
          RequestType.file_name = req.query.file_name;

          Joi.validate(RequestType, RequestValidator.AzureSasToken(LangMsg), function (error, value) {
              if (error && error.details[0]) {
                Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, Util.FormatJoiError(error, LangMsg), null);
                return;
              }
          })

          UserModel.GenerateSasToken(RequestType.container_name, RequestType.file_name).then(result => {
              
                Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.AzureSasToken, result);
          
              }).catch(e => {
                Util.SaveException(path.basename(__filename), 'AzureSasToken', e.stack.toString());
                Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
              })

      }catch (e) {
        Util.SaveException(path.basename(__filename), 'AzureSasToken', e.stack.toString());
        Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(LangMsg.Something_Went_Wrong), null);
      }
                
   }

   
   /**
     * @api {post} /api/v1/user/upload-file UploadFile
     * @apiName upload-file
     * @apiGroup admin
     * @apiHeader {String} content-type application/json
     * @apiHeader {String} authorization
     * @apiDescription upload the image to blob
     * @apiParam   {multipart} image        image
     
     * @apiSuccess {boolean} status           true/false
     * @apiSuccess {Number}  statusCode       universal status code
     * @apiSuccess {String}  message          response message string
     * @apiSuccess {Object}  result             result
     * @apiSuccessExample {json} Success-Response:
            *  {"status":true,"message":"Azure Sas token retrieved successfully","result":{"token":"st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D","uri":"https://grubsnapblob.blob.core.windows.net/grubsnapblob/BcJQo1hVP1KA__bulb.jpeg?st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D"}}
    **/

}
module.exports = new UserController();