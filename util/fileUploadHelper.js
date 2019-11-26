const multer = require('multer')
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });
const getStream = require('into-stream');
const Config = require('../config/Config');
const AWS=require("aws-sdk");
const Util=require('./CustomFunctions');

 
const imageUpload = async(req, res, next) => {
    try {
        let DirName='';
        let requestDTO= req.body? req.body:{}; 
        requestDTO.directory=requestDTO.directory?requestDTO.directory:"";      
        switch(requestDTO.directory.toString()){        
        case "DL":
                DirName=Config.AWS.S3.DLImagePath;
            break;
        case "user":
                DirName=Config.AWS.S3.ProfileImagePath;
            break;
        default:
            //
            break;
        }
        if(DirName){
            let s3bucket = new AWS.S3({
                accessKeyId: Config.AWS.S3.accessKey,
                secretAccessKey: Config.AWS.S3.secretKey,
                Bucket: Config.AWS.S3.Bucket
                });
                var params = {
                Bucket: Config.AWS.S3.Bucket,
                Key: `${DirName}${req.file.originalname.toString().replace(' ','-')}`,
                Body: req.file.buffer,
                ContentType: "image/png"
                }
                s3bucket.upload(params,(err,result)=>{
                if(err){                
                    res.status(Config.Constant.APIResCode.InvalidAccessToken).json({
                        "status": false,
                        "message": Util.FormatException("", err),
                        "result": {}
                    });
                }else{
                    result['imgName']=req.file.originalname.toString().replace(' ','-');
                    res.status(Config.Constant.APIResCode.Success).json({
                        "status": true,
                        "message": "Congratulations, successfully saved!",
                        "result": result
                    });
                }            
                })
        }else{
            res.status(Config.Constant.APIResCode.BadRequest).json({
                "status": false,
                "message": "kindly define directory",
                "result": {}
            });
        }
         
    } catch (e) {
       return res.status(Config.Constant.APIResCode.ServerError).json({
            "status": false,
            "message": Util.FormatException("", e),
            "result": {}
        });
    }
}

const imageUpload1 = async(req, res, next) => {
    try {
        let DirName='';
        let requestDTO= req.body? req.body:{}; 
        requestDTO.directory=requestDTO.directory?requestDTO.directory:"";      
        switch(requestDTO.directory.toString()){        
        case "DL":
                DirName=Config.AWS.S3.DLImagePath;
            break;
        case "user":
                DirName=Config.AWS.S3.ProfileImagePath;
            break;
        default:
            //
            break;
        }
        if(DirName){
            let s3bucket = new AWS.S3({
                accessKeyId: Config.AWS.S3.accessKey,
                secretAccessKey: Config.AWS.S3.secretKey,
                Bucket: Config.AWS.S3.Bucket
                });
                var params = {
                Bucket: Config.AWS.S3.Bucket,
                Key: `${DirName}${req.file.originalname.toString().replace(' ','-')}`,
                Body: req.file.buffer,
                ContentType: "image/png"
                }
                s3bucket.upload(params,(err,result)=>{
                if(err){                
                    res.status(Config.Constant.APIResCode.InvalidAccessToken).json({
                        "status": false,
                        "message": Util.FormatException("", err),
                        "result": {}
                    });
                }else{
                    result['imgName']=req.file.originalname.toString().replace(' ','-');
                    res.status(Config.Constant.APIResCode.Success).json({
                        "status": true,
                        "message": "Congratulations, successfully saved!",
                        "result": result
                    });
                }            
                })
        }else{
            res.status(Config.Constant.APIResCode.BadRequest).json({
                "status": false,
                "message": "kindly define directory",
                "result": {}
            });
        }
         
    } catch (e) {
       return res.status(Config.Constant.APIResCode.ServerError).json({
            "status": false,
            "message": Util.FormatException("", e),
            "result": {}
        });
    }
}

module.exports ={
    singleFileUpload,
    imageUpload

}