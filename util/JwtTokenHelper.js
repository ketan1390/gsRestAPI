const jwt=require('jsonwebtoken');
const config=require('../config/Config');

class JWTHelper{
    generateToken(userDT) {
        try {
            if(!userDT){return new Error("payload not define");}
            /*const token = jwt.sign(userDT, config.JWT.Secret, 
                            {expiresIn: Math.floor(new Date().getTime()/1000) + config.JWT.TokenLife});*/
            const token = jwt.sign(userDT, config.JWT.Secret, 
                            {expiresIn: Number(config.JWT.TokenLife)});
            const refreshToken = jwt.sign({emailId:userDT.emailId}, config.JWT.RefreshTokenSecret
                                , { expiresIn: Number(config.JWT.RefreshTokenLife)});            
            return {
                accessToken:token,
                refreshToken:refreshToken
            }
        } catch (e) {
            throw e;
        }
    };
    getAccessToken(userDT) {
        try {
            if(!userDT){return new Error("payload not define");}
            const token = jwt.sign(userDT, config.JWT.Secret, 
                            {expiresIn: Number(config.JWT.TokenLife)});
            
            return {
                accessToken:token
            }
        } catch (e) {
            throw e;
        }
    };
    getRefreshToken(userDT) {
        try {
            if(!userDT){return new Error("payload not define");}
            const refreshToken = jwt.sign({emailId:userDT.emailId}, config.JWT.RefreshTokenSecret
                , {expiresIn: Number(config.JWT.RefreshTokenLife)});
            
            return {
                refreshToken:refreshToken
            }
        } catch (e) {
            throw e;
        }
    };
    /**
     * Generate new access token by refresh token
     * @param {*} userDT 
     */
    generateAccessToken(userDT) {
        try {
                if(!userDT){return reject("payload not define");}
                
                const token = jwt.sign(userDT, config.JWT.Secret, { expiresIn: Number(config.JWT.TokenLife)})
                return {
                    accessToken:token
                }
        } catch (e) {
            throw e;
        }
    }
    /**
     * Verify access token 
     * @param {*} accessToken 
     */
    verify(accessToken) {
        try {
            return new Promise((resolve,reject)=>{
                if(!accessToken){return reject("NO_TOKEN_FOUND");}  
                // verifies secret and checks exp
                /*let decodedJwt = jwt.decode(jwtToken, {
                    complete: true
                });
                console.log("token---------------",decodedJwt);*/
                jwt.verify(accessToken, config.JWT.Secret, function(err, decoded) {                    
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            })
        } catch (e) {
            throw e;
        }
    }
    /**
     * Verify refresh token 
     * @param {*} accessToken 
     */
    verifyRefreshToken(refreshToken) {
        try {
            return new Promise((resolve,reject)=>{
                if(!refreshToken){return reject("NO_TOKEN_FOUND");}  
                // verifies secret and checks exp
                jwt.verify(refreshToken, config.JWT.RefreshTokenSecret, function(err, decoded) {
                    if (err) {
                        return reject("INVALID_TOKEN_FOUND");
                    }
                    resolve("VALID");
                });
            })
        } catch (e) {
            throw e;
        }
    }
    getJWTPayload(jwtToken){
        try {
            let decodedJwt = jwt.decode(jwtToken, {
                complete: true
            });
            return decodedJwt && decodedJwt.payload?decodedJwt.payload:null;
        } catch (error) {            
            return null;
        }
    }
    /**
     * Generate reset password token by jwt
     * @param {*} userDT 
     */
    getResetToken(userDT) {
        try {
            if(!userDT){return new Error("payload not define");}
            const token = jwt.sign(userDT, config.JWT.ResetSecret, 
                            {expiresIn: Number(config.JWT.TokenLife)});
            
            return {
                accessToken:token
            }
        } catch (e) {
            throw e;
        }
    };

    /**
     * verify reset password token
     * @param {*} userDT 
     */

    verifyResetToken(token) {
        try {
            return new Promise((resolve,reject)=>{
                if(!token){return reject("NO_TOKEN_FOUND");}  
                // verifies secret and checks exp
                /*let decodedJwt = jwt.decode(jwtToken, {
                    complete: true
                });
                console.log("token---------------",decodedJwt);*/
                jwt.verify(token, config.JWT.ResetSecret, function(err, decoded) {                    
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            })
        } catch (e) {
            throw e;
        }
    }
}
module.exports = new JWTHelper();