const Joi = require('@hapi/joi');
class UserRequest {
    Signup(LangMsg) {
        return Joi.object().keys({           
            type: Joi.number().valid(1,2).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixNumberDataTypeError
                    }
                }
            }),
            name: Joi.string().min(3).max(80).when('type', {
        is: 1,
        then: Joi.required(),
        otherwise: Joi.optional()
    }).options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError,
                        email: LangMsg.PostfixInvalidEmailId
                    }
                }
            }),
            mobile_no: Joi.string().min(8).max(15).when('type', {
                is: 1,
                then: Joi.required(),
                otherwise: Joi.optional()
            }).options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError,
                        email: LangMsg.PostfixInvalidEmailId
                    }
                }
            }),
            email: Joi.string().max(70).email().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError,
                        email: LangMsg.PostfixInvalidEmailId
                    }
                }
            }),
            device_token: Joi.string().max(200).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            device_type: Joi.any().valid('1','2','3').required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError
                    }
                }
            }),
            password: Joi.string().max(200).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    Login(LangMsg) {
        return Joi.object().keys({           
            email: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            password: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            device_token: Joi.string().max(250).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            device_type: Joi.any().valid('1','2','3').required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError
                    }
                }
            })
        });
    }

    GetAccessToken(LangMsg) {
        return Joi.object().keys({ 
            user_id: Joi.number().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixNumberDataTypeError
                    }
                }
            }),
            device_token: Joi.string().max(250).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            refresh_token: Joi.string().max(255).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    ForgetPass(LangMsg) {
        return Joi.object().keys({ 
            email: Joi.string().max(70).email().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError,
                        email: LangMsg.PostfixInvalidEmailId
                    }
                }
            }),
            type: Joi.number().valid(1,2,3).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixNumberDataTypeError
                    }
                }
            })
        });
    }

    ResetPass(LangMsg) {
        return Joi.object().keys({ 
			token: Joi.number().max(255).required().options({
				language: {
					any: {
						required: LangMsg.PostfixRequiredError,
						empty: LangMsg.PostfixEmptyError
					},
					number: {
						base: LangMsg.PostfixNumberDataTypeError,
						max: LangMsg.PostfixMaxLengthError
					}
				}
			}),
            password: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    ChangePassword(LangMsg) {
        return Joi.object().keys({  
            old_pass: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            new_pass: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        }).unknown();
    }

    SetDeliveryAddress(LangMsg) {
        return Joi.object().keys({
            decodedUserId: Joi.number().required().positive().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixNumberDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            city: Joi.string().max(20).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            zipcode: Joi.string().max(15).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            mobile_no: Joi.string().max(15).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            address: Joi.string().max(255).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            latitude: Joi.number().precision(6).strict().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        precision: LangMsg.PostfixSixPrecisionError
                    }
                }
            }),
            longitude: Joi.number().precision(6).strict().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixSixPrecisionError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        precision: LangMsg.PostfixSixPrecisionError
                    }
                }
            })
        });
    }

    GetProfile(LangMsg) {
        return Joi.object().keys({  
            decodedUserId: Joi.number().required().positive().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixNumberDataTypeError
                    }
                }
            })
        });
    }

    UpdateProfile(LangMsg) {
        return Joi.object().keys({
            decodedUserId: Joi.number().required().positive().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixNumberDataTypeError
                    }
                }
            }),
            name: Joi.string().min(3).max(80).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError,
                        min: LangMsg.PostfixMinLengthError
                    }
                }
            }),
            city: Joi.string().max(20).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            zipcode: Joi.string().max(15).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            mobile_no: Joi.string().max(15).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            address: Joi.string().max(255).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            latitude: Joi.number().precision(6).strict().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        precision: LangMsg.PostfixSixPrecisionError
                    }
                }
            }),
            longitude: Joi.number().precision(6).strict().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixSixPrecisionError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        precision: LangMsg.PostfixSixPrecisionError
                    }
                }
            })
        });
    }


    UpdateImage(LangMsg) {
        return Joi.object().keys({
            decodedUserId: Joi.number().required().positive().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixNumberDataTypeError,
                    }
                }
            }),
            profile_image: Joi.string().max(100).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    KitchenLogin(LangMsg) {
        return Joi.object().keys({           
            email: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            password: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            device_token: Joi.string().max(250).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    AdminLogin(LangMsg) {
        return Joi.object().keys({           
            email: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            password: Joi.string().max(150).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    FetchAccessToken(LangMsg) {
        return Joi.object().keys({ 
            admin_user_id: Joi.number().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixNumberDataTypeError
                    }
                }
            }),
            refresh_token: Joi.string().max(255).required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    UsersList(LangMsg) {
        return Joi.object().keys({           
            search_keyword: Joi.string().max(50).required().allow('').options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            page_num: Joi.number().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixNumberDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }
    
    UpdateUserStatus(LangMsg) {
        return Joi.object().keys({ 
            user_id: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            is_active: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            role_id: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    UserBlock(LangMsg) {
        return Joi.object().keys({ 
            user_id: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            is_deleted: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            }),
            role_id: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    number: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    AzureSasToken(LangMsg) {
        return Joi.object().keys({ 
            container_name: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError
                    }
                }
            }),
            file_name: Joi.string().required().options({
                language: {
                    any: {
                        required: LangMsg.PostfixRequiredError,
                        empty: LangMsg.PostfixEmptyError
                    },
                    string: {
                        base: LangMsg.PostfixStringDataTypeError,
                        max: LangMsg.PostfixMaxLengthError
                    }
                }
            })
        });
    }

    
}
module.exports = new UserRequest();