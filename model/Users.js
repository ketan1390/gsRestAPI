const Util = require("../util/CustomFunctions");
const SqlQueryBuilder = require("../util/SqlQueryBuilder");
const synceach = require('sync-each');

class Users {
    constructor() { }
    /**
     * user signup
     * @param {*} params
     */
    SignUp(params) {
        return new Promise((resolve, reject) => {
            try {
                let newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter(params.email));
                newParams.push(SqlQueryBuilder.SqlParameter(params.password?Util.AesConfigurationEncrypt(params.password):null)); 
                newParams.push(SqlQueryBuilder.SqlParameter(params.name?params.name:''));
                newParams.push(SqlQueryBuilder.SqlParameter(params.device_token));
                newParams.push(SqlQueryBuilder.SqlParameter(params.device_type));
                newParams.push(SqlQueryBuilder.SqlParameter(params.mobile_no?params.name:''));
                newParams.push(SqlQueryBuilder.SqlParameter(params.type?params.type:''));
                SqlQueryBuilder.Execute(`call sp_customer_register(?,?,?,?,?,?,?)`, newParams).then((recordSet) => {
                    if(recordSet && recordSet[0] && recordSet[0][0] 
                      && (recordSet[0][0]['@full_error']=='EMAIL_EXISTS')
                      ){
                        return reject(recordSet[0][0]['@full_error']);
                    }else if(recordSet && recordSet[0] && recordSet[0][0]['user_id']){
                      return resolve(recordSet[0][0]);
                    }else{
                        return reject(recordSet);
                    }
                }).catch((err) => {
                    reject(err);
                });
            } catch (e) {
                reject(e.stack.toString());
            }  
        });
    }
  /**
   * Method: CheckUser
   * Purpose: to check user exists in db 
   * @param {*} params 
   */
  CheckUser(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(params.uId));

        SqlQueryBuilder.Execute(`call sp_user_check(?)`, newParams).then((recordSet) => {
          if (recordSet && recordSet[0] && recordSet[0][0]) {
            return resolve(recordSet[0][0]);
          } else {
            return reject('USER_NOT_EXISTS');
          }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }
  /**
   * Method: Login
   * Purpose: to login user exists in db by emailId & password
   * @param {*} params 
   */
  Login(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(params.email));
        newParams.push(SqlQueryBuilder.SqlParameter(params.device_token));
        newParams.push(SqlQueryBuilder.SqlParameter(params.device_type));
        SqlQueryBuilder.Execute(`call sp_customer_user_login(?,?,?)`, newParams).then((recordSet) => {
          console.log(recordSet);
          if (recordSet && recordSet[0] && recordSet[0][0]) {
            let dto = recordSet[0][0];
            let pass = Util.AesConfigurationDecrypt(dto.password);
            if(!pass) {
              return reject('PASSWORD_INVALID');
             }
             else if (pass == params.password) {
               return resolve(recordSet[0][0]);
             } else {
               reject('PASSWORD_INVALID');
             }
           } else {
             return reject('EMAILID_INVALID');
           }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }
  /**
   * Method: SaveRefreshToken
   * Purpose: to login user exists in db by emailId & password
   * @param {*} params 
   */
  SaveRefreshToken(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        
        newParams.push(SqlQueryBuilder.SqlParameter(params.userId));
        newParams.push(SqlQueryBuilder.SqlParameter(Util.GetHashText(params.refreshToken)));
        newParams.push(SqlQueryBuilder.SqlParameter(params.expTime));
        newParams.push(SqlQueryBuilder.SqlParameter(params.deviceToken));
        newParams.push(SqlQueryBuilder.SqlParameter(params.deviceType));
        newParams.push(SqlQueryBuilder.SqlParameter(params.userType));
        
        SqlQueryBuilder.Execute(`call sp_customer_saveRefreshToken(?,?,?,?,?,?)`, newParams).then((recordSet) => {
          if (recordSet && recordSet[0] && recordSet[0][0]) {
            return resolve(recordSet[0][0]['refreshToken']);
          } else {
            return reject(null);
          }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }

  /**
   * Method: KitchenLogin
   * Purpose: to login kitchen user exists in db by emailId & password
   * @param {*} params 
   */
  KitchenLogin(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(params.email));
        SqlQueryBuilder.Execute(`call sp_kuser_login(?)`, newParams).then((recordSet) => {
          console.log(recordSet);
          if (recordSet && recordSet[0] && recordSet[0][0]) {
            let dto = recordSet[0][0];
            let pass = Util.AesConfigurationDecrypt(dto.password);
            if(!pass) {
              return reject('PASSWORD_INVALID');
             }
             else if (pass == params.password) {
               return resolve(recordSet[0][0]);
             } else {
               reject('PASSWORD_INVALID');
             }
           } else {
             return reject('EMAILID_INVALID');
           }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }
  /**
   * Method: GetAccessToken
   * Purpose: to get refresh token by userId and deviceId
   * @param {*} params 
   */
  GetAccessToken(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params.user_id)));
        newParams.push(SqlQueryBuilder.SqlParameter(params.device_token));

        SqlQueryBuilder.Execute(`call sp_kitchen_user_getRefreshToken(?,?)`, newParams).then((recordSet) => {
          
          if (recordSet && recordSet[0] && recordSet[0][0] && recordSet[0][0]['@full_error']) {
            return reject('REFRESH_EXPIRED');
          } else if (recordSet && recordSet[0] && recordSet[0][0]) {
            let dt = recordSet[0][0];
            
            if (Util.CompareHashText(params.refresh_token, dt.refresh_token)) {
              return resolve(dt);
            } else {
              return reject('INVALID_TOKEN');
            }
          } else {
            return reject('INVALID_USER');
          }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }


  /**
   * Method: ForgetPassword
   * Purpose: Send otp on register email id in case of forget password
   * @param {*} params 
   */
  ForgetPassword(params) {
        return new Promise((resolve, reject) => {
            try {
                let newParams = [];                  
                newParams.push(SqlQueryBuilder.SqlParameter(params.emailId));

                SqlQueryBuilder.Execute(`call sp_user_forgetPassword(?)`, newParams).then((recordSet) => {                                     
                  if(recordSet && recordSet[0] && recordSet[0][0] && recordSet[0][0]['@final_res'] && recordSet[0][0]['@final_res']=='VALID'){
                        
                        return resolve({user_id:recordSet[0][0]['uId']});                                              
                    }
                    else{
                        return reject('INVALID');
                    }
                }).catch((err) => {
                    reject(err);
                });
            } catch (e) {
                reject(e.stack.toString());
            }
        });
  }
  /**
   * Method: ResetPassword
   * Purpose: Reset user password by emailId & otp
   * @param {*} params 
   */
  ResetPassword(params) {
    return new Promise((resolve, reject) => {
        try {

            let newParams = [];                  
            newParams.push(SqlQueryBuilder.SqlParameter(params.uId));
            newParams.push(SqlQueryBuilder.SqlParameter(Util.AesConfigurationEncrypt(params.password)));

            SqlQueryBuilder.Execute(`call sp_kitchen_user_resetPassword(?,?)`, newParams).then((recordSet) => {                   
                if(recordSet && recordSet[0] && recordSet[0][0]){
                    return resolve(recordSet[0][0]['@output']);                                              
                }
                else{
                    return reject('INVALID_USER');
                }
            }).catch((err) => {
                reject(err);
            });

        } catch (e) {
            reject(e.stack.toString());
        }
    });
  }

  /**
   * Method: ChangePassword
   * Purpose: change user/kitchen password by old password & user id
   * @param {*} params 
   */
  ChangePassword(params) {
    try{
      return new Promise((resolve, reject) => {
            params=params?params:{};
            let newParams = [];     
            newParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params.userId)));
            /////  call get password procedure
            SqlQueryBuilder.Execute(`call sp_user_getPasswordById(?);`, newParams).then((recordSet) => { 
              let resp = JSON.parse(JSON.stringify(recordSet));  
              if(resp[0]&&resp[0][0]){
                    let userDt=resp[0][0];                    
                    if(params.oldPass==Util.AesConfigurationDecrypt(userDt.password)){
                          let sqlParams = [];     
                          sqlParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params.userId)));
                          sqlParams.push(SqlQueryBuilder.SqlParameter(Util.AesConfigurationEncrypt(params.newPass)));          
                          SqlQueryBuilder.Execute(`call sp_user_updatePasswordById(?,?);`, sqlParams).then((ds) => {                          
                            return resolve(null);
                          }).catch((er) => {
                              reject(er);
                          });
                    }else{
                        return reject("INVALID_PASSWORD");
                    }
              }else{
                return reject('USER_NOT_EXISTS');
              }
            }).catch((err) => {
                reject(err);
            });
          // end call get password procedure
      });
    } catch(e){
      throw e;
    }
    
  }

  /**
   * Method: SetDeliveryAddress
   * Purpose: update customer delivery address
   * @param {*} params 
   */
  SetDeliveryAddress(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        
        newParams.push(SqlQueryBuilder.SqlParameter(params.decodedUserId));
        newParams.push(SqlQueryBuilder.SqlParameter(params.address));
        newParams.push(SqlQueryBuilder.SqlParameter(params.city));
        newParams.push(SqlQueryBuilder.SqlParameter(params.zipcode));
        newParams.push(SqlQueryBuilder.SqlParameter(params.mobile_no));
        newParams.push(SqlQueryBuilder.SqlParameter(params.latitude));
        newParams.push(SqlQueryBuilder.SqlParameter(params.longitude));
        
        SqlQueryBuilder.Execute(`call sp_customer_setDeliveryAddress(?,?,?,?,?,?,?)`, newParams).then((recordSet) => {
          return resolve(true);
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }

/**
 * Method: GetProfile
 * Purpose: get user profile by user Id
 * @param {*} params 
 */

GetProfile(params) {
  try{
    return new Promise((resolve, reject) => {
          params=params?params:{};
          let newParams = [];     
          newParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params)));

          SqlQueryBuilder.Execute(`call sp_customer_profile(?);`, newParams).then((recordSet) => { 
            let resp = JSON.parse(JSON.stringify(recordSet));

            if(resp[0]&&resp[0][0] && resp[0][0]){                                        
              
              return resolve(resp[0][0]);

            }else{

              return reject('INVALID_USER');
              
            }
          }).catch((err) => {
              reject(err);
          });
    });
  } catch(e){
    throw e;
  }
  
}

  /**
   * Method: update profile
   * Purpose: update customer profile by user id
   * @param {*} params 
   */
  UpdateProfile(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        
        newParams.push(SqlQueryBuilder.SqlParameter(params.decodedUserId));
        newParams.push(SqlQueryBuilder.SqlParameter(params.address));
        newParams.push(SqlQueryBuilder.SqlParameter(params.city));
        newParams.push(SqlQueryBuilder.SqlParameter(params.zipcode));
        newParams.push(SqlQueryBuilder.SqlParameter(params.mobile_no));
        newParams.push(SqlQueryBuilder.SqlParameter(params.latitude));
        newParams.push(SqlQueryBuilder.SqlParameter(params.longitude));
        newParams.push(SqlQueryBuilder.SqlParameter(params.name));
        
        SqlQueryBuilder.Execute(`call sp_customer_updateProfile(?,?,?,?,?,?,?,?)`, newParams).then((recordSet) => {
          return resolve(true);
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }

  /**
   * Method: update image
   * Purpose: update customer image
   * @param {*} params 
   */
  UpdateImage(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        
        newParams.push(SqlQueryBuilder.SqlParameter(params.decodedUserId));
        newParams.push(SqlQueryBuilder.SqlParameter(params.profile_image));
        
        SqlQueryBuilder.Execute(`call sp_customer_updateImage(?,?)`, newParams).then((recordSet) => {
          return resolve(true);
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }


  /**
   * Method: GenerateUserPassword
   * Purpose: Send random password on registered user email id in case of forgot password
   * @param {*} params 
   */
  GenerateUserPassword(params) {
    return new Promise((resolve, reject) => {
        try {
            let newParams = [];  
            let randomPassword = '';
            randomPassword = Util.randomString(8);

            
            newParams.push(SqlQueryBuilder.SqlParameter(params.email));
             
            
            newParams.push(SqlQueryBuilder.SqlParameter(Util.AesEncript(randomPassword)));
            newParams.push(SqlQueryBuilder.SqlParameter(params.type));     

            SqlQueryBuilder.Execute(`call sp_User_ForgotPassword(?,?,? , @output);`, newParams).then((recordSet) => {                                     

              if(recordSet && recordSet[0] && recordSet[0][0]['@output'] > 0){
      
                    return resolve({ tempPass : randomPassword });
              }else{
                    return reject('USER_EMAIL_NOT_EXISTS');
              }
            }).catch((err) => {
                reject(err);
            });
        } catch (e) {
            reject(e.stack.toString());
        }
    });
}

  /**
   * Method: CheckAdmin
   * Purpose: to check admin exists in db 
   * @param {*} params 
   */
  CheckAdmin(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(params.uId));
        SqlQueryBuilder.Execute(`call sp_Admin_Check(?)`, newParams).then((recordSet) => {
          if (recordSet && recordSet[0] && recordSet[0][0]) {
            return resolve(recordSet[0][0]);
          } else {
            return reject('ADMIN_NOT_EXISTS');
          }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }

    /**
   * Method: AdminLogin
   * Purpose: to login admin exists in db by emailId & password
   * @param {*} params 
   */
  AdminLogin(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        let response  =  [];
        newParams.push(SqlQueryBuilder.SqlParameter(params.email));
        newParams.push(SqlQueryBuilder.SqlParameter(params.password));
        SqlQueryBuilder.Execute(`call sp_Admin_Login(?,?)`, newParams).then((recordSet) => {
          if(recordSet[0].length > 0){
              resolve(recordSet[0][0]);
          }else{
              resolve(response);
          }
          
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
          reject(e.stack.toString());
      }
    });
  }

    /**
   * Method: SaveRefreshToken
   * Purpose: to login user exists in db by emailId & password
   * @param {*} params 
   */
  AdminSaveRefreshToken(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(params.admin_user_id));
        newParams.push(SqlQueryBuilder.SqlParameter(Util.GetHashText(params.refresh_token)));
        newParams.push(SqlQueryBuilder.SqlParameter(params.expiration_time));

        console.log(newParams); 

        SqlQueryBuilder.Execute(`call sp_Admin_InsertToken(?,?,?)`, newParams).then((recordSet) => {
          if (recordSet && recordSet[0] && recordSet[0][0]) {
            return resolve(recordSet[0][0]['refreshToken']);
          } else {
            return reject(null);
          }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }

     /**
   * Method: AdminChangePassword
   * Purpose: change admin password by old password & new password
   * @param {*} params 
   */
  AdminChangePassword(params) {
    try{
      return new Promise((resolve, reject) => {
            params=params?params:{};
            let newParams = [];     
            newParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params.AdminUserId)));
            /////  call get password procedure
            SqlQueryBuilder.Execute(`call sp_Admin_PasswordById(?);`, newParams).then((recordSet) => { 
              if(recordSet[0]&&recordSet[0][0]){
                    let password = recordSet[0][0].password;                    
                    if(params.OldPassword==Util.AesDecript(password)){
                          let sqlParams = [];     
                          sqlParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params.AdminUserId)));
                          sqlParams.push(SqlQueryBuilder.SqlParameter(Util.AesEncript(params.NewPassword)));          
                          SqlQueryBuilder.Execute(`call sp_Admin_UpdatePassword(?,?);`, sqlParams).then((ds) => {                          
                            return resolve(null);
                        }).catch((er) => {
                            reject(er);
                        });
                    }else{
                        return reject("INVALID_PASSWORD");
                    }
              }else{
                return reject('ADMIN_NOT_EXISTS');
              }
            }).catch((err) => {
                reject(err);
            });
          // end call get password procedure
      });
    } catch(e){
      throw e;
    }
    
  }

  /**
   * Method: FetchAccessToken
   * Purpose: to get refresh token by userId
   * @param {*} params 
   */
  FetchAccessToken(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params.admin_user_id)));
//        newParams.push(SqlQueryBuilder.SqlParameter(Util.ConvertInt(params.refresh_token)));

        SqlQueryBuilder.Execute(`call sp_Admin_FetchRefreshToken(?)`, newParams).then((recordSet) => {
          
          if (recordSet && recordSet[0] && recordSet[0][0] && recordSet[0][0]['@full_error']) {
            return reject('REFRESH_EXPIRED');
          } else if (recordSet && recordSet[0] && recordSet[0][0]) {
            let dt = recordSet[0][0];
            
            if (Util.CompareHashText(params.refresh_token, dt.refresh_token)) {
              return resolve(dt);
            } else {
              return reject('INVALID_TOKEN');
            }
          } else {
            return reject('INVALID_ADMIN');
          }
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  }

    /**
   * Method: UsersList
   * Purpose: to fetch the users list
   * @param {*} params 
   */
  UsersList(searchKeyword,pageLimit,offset) {
    return new Promise((resolve, reject) => {
      try {
        let newParams =   [];
        let response  =   [];
        newParams.push(SqlQueryBuilder.SqlParameter(searchKeyword));
        newParams.push(SqlQueryBuilder.SqlParameter(pageLimit));
        newParams.push(SqlQueryBuilder.SqlParameter(offset));
        SqlQueryBuilder.Execute(`call sp_Admin_Users_List(?,?,?)`, newParams).then((recordSet) => {
          if(recordSet[0].length > 0){
              resolve(recordSet[0]);
          }else{
              resolve(response);
          }
          
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
          reject(e.stack.toString());
      }
    });
  }

    /**
   * Method: UpdateUserStatus
   * Purpose: update user status is_active =0 /1
   * @param {*} params 
   */
  UpdateUserStatus(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams =   [];
        let response  =   {};
        newParams.push(SqlQueryBuilder.SqlParameter(params.user_id));
        newParams.push(SqlQueryBuilder.SqlParameter(params.is_active));
        newParams.push(SqlQueryBuilder.SqlParameter(params.role_id));
        SqlQueryBuilder.Execute(`call sp_Admin_Update_User_Status(?,?,?)`, newParams).then((recordSet) => {
          if(recordSet[0].length > 0 && recordSet[0][0]['@output'] ){
              resolve(recordSet[0][0]['@output']);
          }else{
              reject('INVALID_USER');
          }
          
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
          reject(e.stack.toString());
      }
    });
  }

    /**
   * Method: UserBlock
   * Purpose: update user status is_delete =0 /1
   * @param {*} params 
   */
  UserBlock(params) {
    return new Promise((resolve, reject) => {
      try {
        let newParams =   [];
        let response  =   {};
        newParams.push(SqlQueryBuilder.SqlParameter(params.user_id));
        newParams.push(SqlQueryBuilder.SqlParameter(params.is_deleted));
        newParams.push(SqlQueryBuilder.SqlParameter(params.role_id));
        SqlQueryBuilder.Execute(`call sp_Admin_User_Block(?,?,?)`, newParams).then((recordSet) => {
          if(recordSet[0].length > 0 && recordSet[0][0]['@output'] ){
              resolve(recordSet[0][0]['@output']);
          }else{
              reject('INVALID_USER');
          }
          
        }).catch((err) => {
          reject(err);
        });
      } catch (e) {
          reject(e.stack.toString());
      }
    });
  }

     /**
     * function to generate the sas token for image upload on blob
     * @param {*} container 
     * @param {*} fileName 
     */
    GenerateSasToken(container, fileName) {

      return new Promise( function ( resolve , reject ){

          try{
          
          let connString = process.env.AzureWebJobsStorage;
          let blobService = azure.createBlobService(connString);
      
          // Create a SAS token that expires in an hour
          // Set start time to five minutes ago to avoid clock skew.
          let startDate = new Date();
          startDate.setMinutes(startDate.getMinutes() - 5);
          let expiryDate = new Date(startDate);
          expiryDate.setMinutes(startDate.getMinutes() + 60);
             
          
          var permissions = permissions || azure.BlobUtilities.SharedAccessPermissions.WRITE;
          

          let sharedAccessPolicy = {
              AccessPolicy: {
                  Permissions: permissions,
                  Start: startDate,
                  Expiry: expiryDate
              }
          };
          
          let sasToken = blobService.generateSharedAccessSignature(container, fileName, sharedAccessPolicy);

          let azureSas = {
                token: sasToken,
                uri: blobService.getUrl(container, fileName, sasToken, true)
          };

          resolve(azureSas);
          
      }catch(e){
              console.log(e);
              reject(false);
          }
          
      })
      
  }
}
module.exports = new Users();