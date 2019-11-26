const multer = require('multer')
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });
const azureStorage = require('azure-storage');
const getStream = require('into-stream');
const config = require('../config/Config')
const async = require("async");
//const commonUtil = require('./common.util');
const Util = require('./CustomFunctions');

const azureStorageConfig = {
    accountName: config.BlobConfig.accountName,
    accountKey: config.BlobConfig.accountKey,
    blobURL: 'https://grubsnapblob.blob.core.windows.net/',
    containerName: config.BlobConfig.containerName
};

uploadFileToBlob = async (directoryPath, file) => {
    return new Promise((resolve, reject) => {
        const fileName = file.originalname.toString().replace(' ', '-');
        const blobName = getBlobName(fileName);
        const stream = getStream(file.buffer);
        const streamLength = file.buffer.length;
        var options = { contentSettings: { contentType: file.mimetype } }
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);
        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, options, err => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    filename: blobName,
                    originalname: file.originalname,
                    size: streamLength,
                    path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                    url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${blobName}`
                });
            }
        });

    });
};


const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};


const imageUpload = async (req, res, next) => {
    try {
        const image = await uploadFileToBlob('files', req.file); // images is a directory in the Azure container
        return res.json(image);
    } catch (error) {
        next(error);
    }
}


const multiplefileUpload = async (req, res, next) => {
    try {
        const LangMsg = config.KitchenMsg[req.app.get("lang")];
        let azureUrls = [];
        await Promise.all(req.files.map(async (file) => {
            let result = await uploadFileToBlob('files', file);
            azureUrls.push(result)
        }));

        return Util.MakeJsonResponse(res, true, config.Constant.APIResCode.Success, LangMsg.FileUpload , azureUrls);

    } catch (error) {
        next(error);
    }
}


const deleteBlobFile = async (blobName) => {
    try {
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);
        blobService.deleteBlobIfExists(config.blobConfig.containerName, `${blobName.split('/')[4]}/${blobName.split('/')[5]}`, (err, data) => {
            // console.log("file", err, data);
        });
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    singleFileUpload,
    imageUpload,
    multiplefileUpload,
    deleteBlobFile

}