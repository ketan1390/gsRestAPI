const promise = require('promise'),
	Config = require('../config/Config');	
const crypto = require('crypto');
const SqlQueryBuilder = require("../util/SqlQueryBuilder");

function custom_func() {

}

custom_func.prototype.randomString = function () {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 9; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
custom_func.prototype.replaceArrayOfString = function (string, find, replace) {
	var replaceString = string;
	var regex;
	return new promise(function (resolve, reject) {
		if (find.length > 0 && replace.length > 0 && string != "") {

			each(find, function (item, next) {
				var indexof = find.indexOf(item);
				regex = new RegExp(item, "g");
				replaceString = replaceString.replace(regex, replace[indexof]);
				next(null, item);
			}, function (err, transformed) {
				resolve(replaceString);
			});
		} else {
			resolve(replaceString);
		}
	});
};
custom_func.prototype.getRandomInteger = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

/*
* Method: ConvertInt
* Purpose: To convert data in javascript number type
* @param {*} value
* @response {*} number type value
*/
custom_func.prototype.ConvertInt = function (value) {
	try {
		if(typeof(value)=="number") {
			return Number(value);
		} else {
			value=value?value:'';
			value=value.replace(/[^0-9]/g, '');
			return isNaN(Number(value))?0:Number(value);
		}
	} catch(e) {
		return '';
	}
};

custom_func.prototype.ConvertBool = function (value) {
	let res=false;
	try {
		value=value?value:false;
		if(typeof(value)=="number") {
			value = Number(value);
		} else if(typeof(value)=="boolean") {
			//value = (value);
		}else if(typeof(value)=="string") {
			value = (value).toString();
		}else {
			value=(value?value:"").toString();
			value=value.replace(/[^0-9]/g, '');
			value= isNaN(Number(value))?0:Number(value);
		}
		switch(value){
			case 1: res=true;
			break;
			case 0: res=false;
			break;
			case "false": res=false;
			break;
			case "true": res=true;
			break;
			case 'false': res=false;
			break;
			case 'true': res=true;
			break;
			case false: res=false;
			break;
			case true: res=true;
			break;
		}
		return res;
	} catch(e) {
		return res;
	}
};

custom_func.prototype.MakeJsonResponse = function (res, successStatus, statusCode, message, result, appVersion) {
	res.status(statusCode).json({
		"status": successStatus,
		"message": message,
		"result": result ? result : {}
	});
};

custom_func.prototype.daysdifference = function (date1, date2) {
	// The number of milliseconds in one day
	var ONEDAY = 1000 * 60 * 60 * 24;
	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);

	// Convert back to days and return
	return Math.round(difference_ms/ONEDAY);
}

custom_func.prototype.CheckNull = function (Input) {
	return (Input == null) ? "" : Input;
}

custom_func.prototype.customTrim = function (x) {
	try {
		return x.replace(/^\s+|\s+$/gm, '');
	} catch (e) {
		return '';
	}
}

custom_func.prototype.FormatException = function (Error, Exception) {
		try {
			Error = Error ? Error : '';
			Exception=(Exception && Exception.stack) ? Exception.stack:Exception;
			Error = typeof(Error)=="string"? Error: JSON.stringify(Error ? Error : '');
			Exception = Exception && Exception != "" ? (JSON.stringify(Exception ? Exception : '')) : "";
			if (Exception) {
				return Error + (Exception && Exception != "" ? "-" : "") + (Exception && Exception != "" ? Exception : "");
			} else {
				return Error;
			}
		} catch (e) {
			return Error ? Error : "";
		}
	},
/**
 * Method: SaveException
 * Purpose: Save Error Logs to noSql
 * @param {*} FileName 
 * @param {*} Method 
 * @param {*} Exception 
 */
custom_func.prototype.SaveException = function (FileName, Method, Exception) {
try {
		//console.log("SaveException error Method  --->>>>>", Method);
		//console.log("SaveException error try  --->>>>>", Exception);
		FileName = JSON.stringify(FileName ? FileName : '');
		Method = JSON.stringify(Method ? Method : '');
		let newExp=new Error(Exception);
		newExp = (newExp ? (newExp.message?newExp.message:newExp) : '');
		console.log(newExp)
	} catch (e) {
		console.log("SaveException error catch  --->>>>>", e);
	}
}

custom_func.prototype.FormatJoiError = function (error, LangMsg) {
	try {
		let errorType = error.details[0]["type"];
		var msg = "";
		switch (errorType) {
			case "object.allowUnknown":
				if (LangMsg) {
					msg = error.details[0]['context']["label"].toString() + " " + LangMsg.PostfixAllowUnknownError;
					msg = msg.trim();
				} else {
					msg = error.details[0]['message'].toString();
					msg = msg.trim();
				}
				break;
			case "any.empty":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "any.required":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "object.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "number.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "string.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "string.alphanum":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "string.max":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "string.min":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "string.email":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "boolean.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "number.max":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "number.min":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "array.max":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			default:
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				// msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString() + msg;
				msg = msg.trim();
				//  msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString(); msg = msg.substring(2).trim();
				break;
		}
		msg=msg.replace(msg[0],msg[0].toUpperCase());
		return msg;
	} catch (e) {
		return e.message;
	}
}
custom_func.prototype.AesEncript = function (planText) {
	try {		
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		let iv = Buffer.from(Config.AesSecretIVKey);
		let key = Buffer.from(Config.AesSecretKey);	
		let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(planText, 'utf8', 'hex') + cipher.final('hex');
		return encryptedData;
	} catch (e) {
		return '';
	}

}
custom_func.prototype.AesDecript = function (encryptedText) {
	try {
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		encryptedText=encryptedText.toString();
		let iv = Buffer.from(Config.AesSecretIVKey);
		let key = Buffer.from(Config.AesSecretKey);		
		let cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(encryptedText, 'hex', 'utf8') + cipher.final('utf8');
		return encryptedData;
	} catch (e) {
		return '';
	}
}
custom_func.prototype.EncodeBase64 = function (planText) {
	try {
		let buff = Buffer.from(planText.toString());
		let base64data = buff.toString('base64');
		return base64data;
	} catch (e) {
		return '';
	}
}
custom_func.prototype.DecodeBase64 = function (base64Text) {
	try {
		let data = 'c3RhY2thYnVzZS5jb20=';
		let buff =  Buffer.from(base64Text, 'base64');
		let text = buff.toString('ascii');
		return text;
	} catch (e) {
		return '';
	}
}
custom_func.prototype.GetHashText = function (text) {
	try {
		return crypto.createHash('md5').update(text).digest('hex');		 
	} catch (e) {
		return '';
	}
}

custom_func.prototype.CompareHashText = function (text,hashText) {
	try {
		let newText = crypto.createHash('md5').update(text).digest('hex');	
		return 	newText==hashText; 
	} catch (e) {
		return false;
	}
}

custom_func.prototype.AesConfigurationEncrypt = function (planText) {
	try {		
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		let iv = Buffer.from(Config.AesSecretIVKeyConfiguration);
		let key = Buffer.from(Config.AesSecretKeyConfiguration);	
		let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(planText, 'utf8', 'hex') + cipher.final('hex');
		return encryptedData;
	} catch (e) {
		return '';
	}

}
custom_func.prototype.GenerateOTP = function (otpLength) {
	try {		
		 	/*// Declare a digits variable  
			// which stores all digits 
			let len=otpLength?otpLength:Config.OTPLength;
			var digits = '0123456789'; 
			let OTP = ''; 
			for (let i = 0; i < len; i++ ) { 
				OTP += digits[Math.floor(Math.random() * 10)]; 
			} 
			return Number(OTP);
			*/
			return Math.floor(1000 + Math.random() * 9000);
	} catch (e) {
		return null;
	}

}
custom_func.prototype.AesConfigurationDecrypt = function (encryptedText) {
	try {		
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		encryptedText=encryptedText.toString();
		let iv = Buffer.from(Config.AesSecretIVKeyConfiguration);
		let key = Buffer.from(Config.AesSecretKeyConfiguration);		
		let cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(encryptedText, 'hex', 'utf8') + cipher.final('utf8');
		return encryptedData;
	} catch (e) {
		return '';
	}

}
custom_func.prototype.GetKeyByValue = function (object, value) {
	try {		
		for (var prop in object) {
			if (object.hasOwnProperty(prop)) { 
				if (object[prop].toString() === value.toString()) 
				return prop; 
			} 
		} 
	} catch (e) {
		return '';
	}

}
custom_func.prototype.ISNULL = function (value,key) {
	try {		
		return value?value=='undefined' || value=='null'?true:false:value==0?false:true;
	} catch (e) {		
		return false;
	}

}

module.exports = new custom_func();
