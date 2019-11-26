'use strict';
const Config = require('../config/Config');
const Util = require('../util/CustomFunctions');
const path = require('path');
const jwt = require('jsonwebtoken');
const JwtHelper = require('../util/JwtTokenHelper');
const UserModel = require('../model/Users');
module.exports = {
    AnonymousAuthorize: function (req, res, next) {
        const LangMsg = Config.Messages[req.app.get("lang")];
        try {
           req.headers['client_secret'] = req.headers['client_secret']?req.headers['client_secret']:(req.headers['client-secret']?req.headers['client-secret']:'');
        
            //-------------------------- START Check AnonymousAuthorize
            if (Config.AnonymousReqSecret['ClientSecret'] === req.headers['client_secret']) {
               return next();
            } else {
                return res.status(Config.Constant.APIResCode.Unauthorized).json({
                    "status": false,
                    "message": Util.FormatException(LangMsg.Unauthorized, ''),
                    "result": {}
                });
            }
            //-------------------------- END Check AnonymousAuthorize
        } catch (e) {
            Util.SaveException(path.basename(__filename), 'AnonymousAuthorize', e.stack.toString());
            return res.status(Config.Constant.APIResCode.ServerError).json({
                "status": false,
                "message": Util.FormatException(LangMsg.WebError, e.stack.toString()),
                "result": {}
            });
        }
    },
    GrubSnapAuthorizeApp: ((req, res, next) => {
        const LangMsg = Config.Messages[req.app.get("lang")];
        try {
            /**
             * Authenticate user using Jwt token auth mechanism 
             */            
            let accessToken = req.headers['access_token']?req.headers['access_token']:(req.headers['access-token']?req.headers['access-token']:'');
            req.headers['access_token']=accessToken;
            if(!accessToken){
                return res.status(Config.Constant.APIResCode.Unauthorized).json({
                    "status": false,
                    "message": Util.FormatException(LangMsg.AuthError, ''),
                    "result": {}
                });
            }else{
                JwtHelper.verify(accessToken).then((v)=>{
                    
                    UserModel.CheckUser({uId:v.user_id})
                    .then(response => {
                        if(response.is_email_verified=='0'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.EmailVerify, {});
                        }else if(response.role_id !=1){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.InvalidUserType, {});
                        }else if(response.is_active=='0'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserBlocked, {});
                        }else if(response.is_deleted=='1'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserDeleted, {});
                        }else{
                            
                            req.body['decodedUserId'] = v.user_id; 
                            return next();
                        }
                        
                    }).catch(err => {         
                        let msg=''; let code=0;
                        switch(err){
                        case 'USER_NOT_EXISTS':
                            msg=LangMsg.NoRecord;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        default: msg=err;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        }
                        Util.SaveException(path.basename(__filename), 'CheckUser - model error', err);       
                        Util.MakeJsonResponse(res, false, code, Util.FormatException(msg), {});
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
            }
            //-------------------------- END Check CognitoAuthorize
        } catch (e) {
            Util.SaveException(path.basename(__filename), 'BoxtlyAuthorize', e.stack.toString());
            return res.status(Config.Constant.APIResCode.ServerError).json({
                "status": false,
                "message": Util.FormatException(LangMsg.WebError, e.stack.toString()),
                "result": {}
            });
        }
    }),
    GrubSnapAuthorizeKitchen: ((req, res, next) => {
        const LangMsg = Config.Messages[req.app.get("lang")];
        try {
            /**
             * Authenticate user using Jwt token auth mechanism 
             */            
            let accessToken = req.headers['access_token']?req.headers['access_token']:(req.headers['access-token']?req.headers['access-token']:'');
            req.headers['access_token']=accessToken;
            if(!accessToken){
                return res.status(Config.Constant.APIResCode.Unauthorized).json({
                    "status": false,
                    "message": Util.FormatException(LangMsg.AuthError, ''),
                    "result": {}
                });
            }else{
                JwtHelper.verify(accessToken).then((v)=>{
                    
                    UserModel.CheckUser({uId:v.user_id})
                    .then(response => {
                        if(response.is_email_verified=='0'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.EmailVerify, {});
                        }else if(response.role_id !=2){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.InvalidUserType, {});
                        }else if(response.is_active=='0'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserBlocked, {});
                        }else if(response.is_deleted=='1'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserDeleted, {});
                        }else{
                            
                            req.body['decodedUserId'] = v.user_id; 
                            return next();
                        }
                        
                    }).catch(err => {         
                        let msg=''; let code=0;
                        switch(err){
                        case 'USER_NOT_EXISTS':
                            msg=LangMsg.NoRecord;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        default: msg=err;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        }
                        Util.SaveException(path.basename(__filename), 'CheckUser - model error', err);       
                        Util.MakeJsonResponse(res, false, code, Util.FormatException(msg), {});
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
            }
            //-------------------------- END Check CognitoAuthorize
        } catch (e) {
            Util.SaveException(path.basename(__filename), 'BoxtlyAuthorize', e.stack.toString());
            return res.status(Config.Constant.APIResCode.ServerError).json({
                "status": false,
                "message": Util.FormatException(LangMsg.WebError, e.stack.toString()),
                "result": {}
            });
        }
    }),
    GrubSnapAuthorizeCommon: ((req, res, next) => {
        const LangMsg = Config.Messages[req.app.get("lang")];
        try {
            /**
             * Authenticate user using Jwt token auth mechanism 
             */            
            let accessToken = req.headers['access_token']?req.headers['access_token']:(req.headers['access-token']?req.headers['access-token']:'');
            req.headers['access_token']=accessToken;
            if(!accessToken){
                return res.status(Config.Constant.APIResCode.Unauthorized).json({
                    "status": false,
                    "message": Util.FormatException(LangMsg.AuthError, ''),
                    "result": {}
                });
            }else{
                JwtHelper.verify(accessToken).then((v)=>{
                    
                    UserModel.CheckUser({uId:v.user_id})
                    .then(response => {
                        if(response.is_email_verified=='0'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.EmailVerify, {});
                        }else if(response.role_id !=1 && response.role_id !=1){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.InvalidUserType, {});
                        }else if(response.is_active=='0'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserBlocked, {});
                        }else if(response.is_deleted=='1'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.UserDeleted, {});
                        }else{
                            
                            req.body['decodedUserId'] = v.user_id; 
                            return next();
                        }
                        
                    }).catch(err => {         
                        let msg=''; let code=0;
                        switch(err){
                        case 'USER_NOT_EXISTS':
                            msg=LangMsg.NoRecord;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        default: msg=err;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        }
                        Util.SaveException(path.basename(__filename), 'CheckUser - model error', err);       
                        Util.MakeJsonResponse(res, false, code, Util.FormatException(msg), {});
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
            }
            //-------------------------- END Check CognitoAuthorize
        } catch (e) {
            Util.SaveException(path.basename(__filename), 'BoxtlyAuthorize', e.stack.toString());
            return res.status(Config.Constant.APIResCode.ServerError).json({
                "status": false,
                "message": Util.FormatException(LangMsg.WebError, e.stack.toString()),
                "result": {}
            });
        }
    }),

    GrubSnapAuthorizeAdmin: ((req, res, next) => {
        const LangMsg = Config.Messages[req.app.get("lang")];
        try {
            /**
             * Authenticate user using Jwt token auth mechanism 
             */            
            let accessToken = req.headers['access_token']?req.headers['access_token']:(req.headers['access-token']?req.headers['access-token']:'');
            req.headers['access_token']=accessToken;
            if(!accessToken){
                return res.status(Config.Constant.APIResCode.Unauthorized).json({
                    "status": false,
                    "message": Util.FormatException(LangMsg.AuthError, ''),
                    "result": {}
                });
            }else{
                JwtHelper.verify(accessToken).then((v)=>{
                    UserModel.CheckAdmin({uId:v.admin_user_id})
                    .then(response => {
                        if(response.is_email_verified=='0'){
                            Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.Forbidden, LangMsg.EmailVerify, {});
                        }else{
                            req.body['decodedAdminId'] = response.admin_user_id; 
                            return next();
                        }
                        
                    }).catch(err => {         
                        let msg=''; let code=0;
                        switch(err){
                        case 'ADMIN_NOT_EXISTS':
                            msg=LangMsg.NoRecord;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        default: msg=err;
                            code=Config.Constant.APIResCode.Forbidden;
                            break;
                        }
                        Util.SaveException(path.basename(__filename), 'CheckAdmin - model error', err);       
                        Util.MakeJsonResponse(res, false, code, Util.FormatException(msg), {});
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
            }
            //-------------------------- END Check CognitoAuthorize
        } catch (e) {
            Util.SaveException(path.basename(__filename), 'GrubSnapAuthorize', e.stack.toString());
            return res.status(Config.Constant.APIResCode.ServerError).json({
                "status": false,
                "message": Util.FormatException(LangMsg.WebError, e.stack.toString()),
                "result": {}
            });
        }
    })
}