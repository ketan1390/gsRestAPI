'use strict';
require('dotenv').config();
const env = process.env.NODE_ENV?process.env.NODE_ENV:'dev'; // 'dev' or 'prod'

//import app Constant
const appConstant = require('./AppConstants');
//import language
const Messages = require('../locales/Messages');
const dev = {
    App: {
        Port: process.env.PORT || 8080,
        Http: ''
    },
    SmtpConfig:{
        username: 'support@grubsnap.com',
        password: 'As45174517!',
        host: 'smtp.office365.com',
        from: 'support@grubsnap.com',
        port:587,
        secure: true
    },
    DbMySql: {
        host: "staging-database.mysql.database.azure.com",
        user: "techahead@staging-database",
        password: "WxgJrDjXFagsbh3Q",
        database: "grub_snap",
        multipleStatements: true,
        charset : 'utf8mb4' ,
        debug   :  false,
        connectionLimit : 100
    },
    AnonymousReqSecret:{
        ClientSecret: 'TveHJp1mGINShFkYEG33IKCHmDpP7a19pMmlTKXvGlfrGqE6OvaKSfcyAUaI3bP' 
    },
    Constant: appConstant,
    Messages: Messages,
    VersionStatus: {
        Continue: 2000,
        NormalUpdate: 2001,
        ForceUpdate: 2002
    },
    AesSecretKey: '08277A08B0ABA70703E28A5FCED7396D',
    AesSecretIVKey: 'D9062EA86462F77E',
    AesSecretKeyConfiguration: '08277A08B0ABA70703E28A5FCED7396D',
    AesSecretIVKeyConfiguration: 'D9062EA86462F77E',
    MediaStorage:{
        baseUrl:''
    },
    BlobConfig :{
        accountName : 'grubsnapblob',
        accountKey : 'Ro3GU5+bdpwLgpv6ooSt5GzkgFswmXrJRGOMKn8gk8MIQKXHt88zmzk4tg9SVwvlxYClhJU6VdRhQ8AyV5EKvQ==',
        containerName : 'grubsnap' 
    },
    AWSRuntime:'',
    AWSAccessKeyId: '',
    AWSSecretAccessKey:'',
    AWSRegion: 'us-east-1',
    JWT:{
        TokenLife: 6*60*60, // Note: in seconds!,(min*sec)
        RefreshTokenLife:30*24*60*60, // Note: in seconds!, (day*hr*min*sec)
        Secret:'46ivcjfeo6RcgzHhbHgakMDdDNEmocMQaMX13URvBUFk69UxON4ZXoFEL6yqhQZ',
        RefreshTokenSecret:'MROXig854vCmHhNQbD4H74xrYKIBOypS8nsoaDfwQAIrKIyOMRnA30P2TSl43zo',
        ResetSecret:'46ivcjfeo6RcgzHhbHgakMDdDNEmocMQaMX13URvBUFk69UxON4ZXoFEL6yqhQZ12z0'
    },
    VerificationLink:{
        Registration:'http://13.71.4.60/boxlty-web/verify-email/',
        ForgetPassword:'http://10.11.6.18:8080/',
        ForgetPasswordCustomer:'http://10.11.6.18:8080/',
        WebsiteHome:''
    },
    OTPLength: 4,
    StripeSecretkey: '',
    RadiusKM: 5,
    SearchItemPerPage: 10,
    
};
const prod = {
    App: {
        Port: process.env.PORT || 8080,
        Http: 'http://10.11.6.18'
    },
    MailjetConfig:{
        MJ_APIKEY_PUBLIC:'',
        MJ_APIKEY_PRIVATE:'',
        MJ_API_VERSION:'',
        FromEmailId:'',
        FromName:''
    },
    DbMySql: {
        host: "staging-database.mysql.database.azure.com",
        user: "techahead@staging-database",
        password: "WxgJrDjXFagsbh3Q",
        database: "grub_snap",
        multipleStatements: true,
        charset : 'utf8mb4' ,
        debug   :  false,
        connectionLimit : 100
    },
    AnonymousReqSecret:{
        ClientSecret: 'TveHJp1mGINShFkYEG33IKCHmDpP7a19pMmlTKXvGlfrGqE6OvaKSfcyAUaI3bP' 
    },
    Constant: appConstant,
    Messages: Messages,
    VersionStatus: {
        Continue: 2000,
        NormalUpdate: 2001,
        ForceUpdate: 2002
    },
    AesSecretKey: '08277A08B0ABA70703E28A5FCED7396D',
    AesSecretIVKey: 'D9062EA86462F77E',
    AesSecretKeyConfiguration: '08277A08B0ABA70703E28A5FCED7396D',
    AesSecretIVKeyConfiguration: 'D9062EA86462F77E',
    MediaStorage:{
        baseUrl:''
    },
    AWSRuntime:'',
    AWSAccessKeyId: '',
    AWSSecretAccessKey:'',
    AWSRegion: 'us-east-1',
    JWT:{
        TokenLife:60*60, // Note: in seconds!,(min*sec)
        RefreshTokenLife:7*24*60*60, // Note: in seconds!, (day*hr*min*sec)
        Secret:'46ivcjfeo6RcgzHhbHgakMDdDNEmocMQaMX13URvBUFk69UxON4ZXoFEL6yqhQZ',
        RefreshTokenSecret:'MROXig854vCmHhNQbD4H74xrYKIBOypS8nsoaDfwQAIrKIyOMRnA30P2TSl43zo',
        ResetSecret:'46ivcjfeo6RcgzHhbHgakMDdDNEmocMQaMX13URvBUFk69UxON4ZXoFEL6yqhQZ12z0'
    },
    VerificationLink:{
        Registration:'http://10.11.6.18:8080/',
        ForgetPassword:'http://10.11.6.18:8080/',
        WebsiteHome:''
    },
    OTPLength: 4,
    StripeSecretkey: '',
    RadiusKM: 5,
    SearchItemPerPage: 10,
};
const config = { dev, prod };
module.exports = config[env];

