'use strict';
const express = require('express'),
  router = express.Router(),
  AuthMiddleware = require('../../middleware/AuthMiddleware');
// Require controller modules.

const Controller = require('../../controllers/Controller');
const uploadFile = require('../../util/uploadfile');

/**
 *  user management routes
 */
router.post('/register', AuthMiddleware.AnonymousAuthorize, Controller.SignUp);
router.post('/user-login', AuthMiddleware.AnonymousAuthorize, Controller.Login);
router.post('/kitchen-login', AuthMiddleware.AnonymousAuthorize, Controller.KitchenLogin);
router.post('/admin-login', AuthMiddleware.AnonymousAuthorize, Controller.AdminLogin);
router.post('/access-token', AuthMiddleware.AnonymousAuthorize, Controller.GetAccessToken);
router.post('/access-token-admin', AuthMiddleware.AnonymousAuthorize, Controller.FetchAccessToken);
router.post('/forgot-password', AuthMiddleware.AnonymousAuthorize, Controller.ForgetPassword);
router.put('/reset-password', AuthMiddleware.AnonymousAuthorize, Controller.ResetPassword);
router.put('/change-password', AuthMiddleware.GrubSnapAuthorizeCommon, Controller.ChangePassword);
router.put('/change-password-admin', AuthMiddleware.GrubSnapAuthorizeAdmin, Controller.AdminChangePassword);
router.put('/set-delivery-address', AuthMiddleware.GrubSnapAuthorizeApp, Controller.SetDeliveryAddress);
router.get('/get-profile', AuthMiddleware.GrubSnapAuthorizeApp, Controller.GetProfile);
router.put('/update-profile', AuthMiddleware.GrubSnapAuthorizeApp, Controller.UpdateProfile);
router.put('/update-image', AuthMiddleware.GrubSnapAuthorizeApp, Controller.UpdateImage);

router.get('/users-list', AuthMiddleware.GrubSnapAuthorizeAdmin, Controller.UsersList );
router.put('/update-user-status/:user_id', AuthMiddleware.GrubSnapAuthorizeAdmin, Controller.UpdateUserStatus );
router.put('/user-block/:user_id', AuthMiddleware.GrubSnapAuthorizeAdmin, Controller.UserBlock );


router.get('/azure-sas-token', AuthMiddleware.AnonymousAuthorize, Controller.AzureSasToken );
router.post('/upload-file', AuthMiddleware.AnonymousAuthorize, uploadFile.singleFileUpload.single('image'), uploadFile.imageUpload);




module.exports = router;
