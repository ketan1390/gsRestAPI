define({ "api": [
  {
    "type": "put",
    "url": "/api/v1/user/set-delivery-address",
    "title": "user set-delivery-address",
    "name": "set_delivery_address",
    "group": "AppService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>user set-delivery-address</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>customer city minimum 3 max 20</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>customer address minimum 3 max 255</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zipcode",
            "description": "<p>customer address minimum 3 max 15</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile_no",
            "description": "<p>customer mobile max 15</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>example-&gt;27.203822</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>example-&gt;77.501122</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Success\",\n                \"result\": {}\n              }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "AppService"
  },
  {
    "type": "put",
    "url": "/api/v1/user/update-image",
    "title": "update customer image",
    "name": "update_image",
    "group": "AppService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>update customer image</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>max 50</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Success\",\n                \"result\": {}\n            }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "AppService"
  },
  {
    "type": "put",
    "url": "/api/v1/user/update-profile",
    "title": "update customer Profile",
    "name": "update_profile",
    "group": "AppService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>update customer Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>customer city minimum 3 max 20</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>customer address minimum 3 max 255</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zipcode",
            "description": "<p>customer address minimum 3 max 15</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "latitude",
            "description": "<p>example-&gt;27.203822</p>"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "longitude",
            "description": "<p>example-&gt;77.501122</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile_no",
            "description": "<p>user mobile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Profile Updated Successfully\",\n                \"result\": {\n                    \"user_id\": 13,\n                    \"email\": \"rahultest7@yopmail.com\",\n                    \"name\": \"Rahul Test\",\n                    \"mobile_no\": \"1234567891\",\n                    \"profile_image\": \"\",\n                    \"address\": \"dfdsfsdfsdf\",\n                    \"city\": \"test\",\n                    \"zipcode\": \"1231312\",\n                    \"latitude\": \"22.123456\",\n                    \"longitude\": \"22.123456\"\n                }\n            }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "AppService"
  },
  {
    "type": "get",
    "url": "/api/v1/user/get-profile",
    "title": "get user profile",
    "name": "user_get_profile",
    "group": "AppService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>get user profile</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Success\",\n                \"result\":  {\n                  \"user_id\": 13,\n                  \"email\": \"rahultest7@yopmail.com\",\n                  \"name\": \"Rahul Test\",\n                  \"mobile_no\": \"1234567891\",\n                  \"profile_image\": \"\",\n                  \"address\": \"\",\n                  \"city\": \"\",\n                  \"zipcode\": \"\",\n                  \"latitude\": \"\",\n                  \"longitude\": \"\"\n              }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "AppService"
  },
  {
    "type": "post",
    "url": "/api/v1/user/user-login",
    "title": "user-login",
    "name": "user_login",
    "group": "AppService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>user-login</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>customer email id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>customer account password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>customer mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>customer device type enum('1','2','3') &quot;1&quot;-&gt;'Website',&quot;2&quot;-&gt;'Android',&quot;3&quot;-&gt;'iOS'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Login Successfull\",\n                \"result\":  {\n                    \"user_id\": 13,\n                    \"email\": \"rahultest7@yopmail.com\",\n                    \"is_email_verified\": \"1\",\n                    \"access_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsdGVzdDdAeW9wbWFpbC5jb20iLCJ1c2VyX2lkIjoxMywiaWF0IjoxNTcyOTQ1MzQyLCJleHAiOjE1NzI5NjY5NDJ9.yyVMYjcHZU4zAf1mOB5e88ii6qlzqzSxDr4nfQvN5mg\",\n                    \"refresh_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzI5NDUzNDIsImV4cCI6MTU3NTUzNzM0Mn0.0DNNOPeZeOMaAW8ALnHpXbv8ZI3T07YCorsMst2rmJo\",\n                    \"role_id\": 1,\n                    \"is_active\": \"1\",\n                    \"is_profile_updated\": \"0\",\n                    \"name\": \"Rahul Test\",\n                    \"address\": \"\",\n                    \"latitude\": \"\",\n                    \"longitude\": \"\",\n                    \"mobile_no\": \"1234567891\",\n                    \"device_token\": \"qqq1111\",\n                    \"device_type\": \"1\"\n                }\n            }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "AppService"
  },
  {
    "type": "post",
    "url": "/api/v1/user/access-token",
    "title": "access-token",
    "name": "access_token",
    "group": "Common_Kitchen_user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>kitchen/User access-token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>customer user_id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>system/app deviceId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>refresh_token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Fetched Successfully.\",\n                \"result\": {\n                              \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsdGVzdDVAeW9wbWFpbC5jb20iLCJ1c2VyX2lkIjo2LCJpYXQiOjE1NzE4Mzc2MTksImV4cCI6MTU3MTg1OTIxOX0.arFJSQngMJHeLowk-9SYomVGXsE1xpmUmMuAdC0e9nM\"\n                          }\n              }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "Common_Kitchen_user"
  },
  {
    "type": "post",
    "url": "/api/v1/user/register",
    "title": "register",
    "name": "register",
    "group": "Common_Kitchen_user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>user or kitchen register</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "type",
            "description": "<p>user type (1,2) 1-&gt;'Customer',2-&gt;'Kitchen'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>user name required when type is 1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user email id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile_no",
            "description": "<p>user mobile required when type is 1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>user mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>user device type enum('1','2','3') &quot;1&quot;-&gt;'Website',&quot;2&quot;-&gt;'Android',&quot;3&quot;-&gt;'iOS'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user account password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"User registered successfully\",\n                \"result\": {\n                    \"user_id\": 174,\n                    \"@full_error\": \"q91\",\n                    \"email\": \"q9211111@gmail.com\"\n                }\n            }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "Common_Kitchen_user"
  },
  {
    "type": "put",
    "url": "/api/v1/user/change-password",
    "title": "change-password",
    "name": "user_kitchen_change_password",
    "group": "Common_Kitchen_user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>change-password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_pass",
            "description": "<p>customer old password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_pass",
            "description": "<p>customer new password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Password Updated Successfully\",\n                \"result\": {}\n              }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "Common_Kitchen_user"
  },
  {
    "type": "post",
    "url": "/api/v1/user/forgot-password",
    "title": "forgot-password",
    "name": "forgot_password",
    "group": "Common___kitchen_user_admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>kitchen/User/Admin forgot-password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user email</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "type",
            "description": "<p>user type (1,2,3) 1-&gt;'Customer',2-&gt;'Kitchen',3-&gt;'admin'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\"status\":true,\"message\":\"Temporary password send to your email id\",\"result\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "Common___kitchen_user_admin"
  },
  {
    "type": "put",
    "url": "/api/v1/user/reset-password",
    "title": "reset-password",
    "name": "reset_password",
    "group": "Common___kitchen_user_admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>user/kitchen reset-password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>customer reset token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>customer reset password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Password Changed Successfuly\",\n                \"result\": {}\n              }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "Common___kitchen_user_admin"
  },
  {
    "type": "post",
    "url": "/api/v1/user/kitchen-login",
    "title": "kitchen login",
    "name": "kitchen_login",
    "group": "KitchenService",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>kitchen login</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>kitchen email id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>kitchen account password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>device token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n                \"status\": true,\n                \"message\": \"Login Successfull\",\n                \"result\":  {\n                  \"user_id\": 6,\n                  \"email\": \"rahultest5@yopmail.com\",\n                  \"is_email_verified\": \"1\",\n                  \"access_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsdGVzdDVAeW9wbWFpbC5jb20iLCJ1c2VyX2lkIjo2LCJpYXQiOjE1NzI2MTQxMjYsImV4cCI6MTU3MjYzNTcyNn0.mIMrJsvhFngbLBgai5bkg-BeyRS6a_cTgTezfQ2W8jw\",\n                  \"refresh_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzI2MTQxMjYsImV4cCI6MTU3NTIwNjEyNn0.F7fdVYtQVUB9bKbssCqk1coXpEwuX_g5LaDE-ycZRug\",\n                  \"role_id\": 2,\n                  \"is_active\": \"1\",\n                  \"is_profile_updated\": \"0\",\n                  \"owner_name\": \"\",\n                  \"device_token\": \"qqq1111\"\n              }\n            }",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "KitchenService"
  },
  {
    "type": "put",
    "url": "/api/v1/user/update-user-status/:user_id?is_active=0/1",
    "title": "user UpdateUserStatus",
    "name": "update_user_status",
    "group": "admin_user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>user_id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "is_active",
            "description": "<p>is_active</p>"
          }
        ]
      }
    },
    "description": "<p>admin user active status has been updated 1 =&gt; is active and vice-versa</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\"status\":true,\"message\":\"User account has been actived\",\"result\":1}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin_user"
  },
  {
    "type": "put",
    "url": "/api/v1/user/user-block/:user_id?is_deleted=0/1",
    "title": "user UserBlock",
    "name": "user_block",
    "group": "admin_user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>user_id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "is_deleted",
            "description": "<p>is_deleted</p>"
          }
        ]
      }
    },
    "description": "<p>admin user block status has been updated 1 =&gt; blocked and vice-versa</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n             {\"status\":true,\"message\":\"User account has been blocked\",\"result\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin_user"
  },
  {
    "type": "get",
    "url": "/api/v1/user/users-list?search_keyword=&page_num=1/2/3",
    "title": "user UsersList",
    "name": "users_list",
    "group": "admin_user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>admin manage users listing to the admin panel</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search_keyword",
            "description": "<p>search_keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_num",
            "description": "<p>page_num</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\"status\":true,\"message\":\"Users data found\",\"result\":{\"totalUsersCount\":3,\"usersList\":[{\"totalUsersCount\":3,\"user_id\":13,\"email\":\"rahultest7@yopmail.com\",\"is_email_verified\":\"1\",\"is_active\":\"1\",\"is_deleted\":\"0\",\"first_name\":\"\",\"last_name\":\"\",\"mobile_no\":\"1234567891\",\"address\":\"dfdsfsdfsdf\"},{\"totalUsersCount\":3,\"user_id\":12,\"email\":\"sankarshan.pandey@techaheadcorp.com\",\"is_email_verified\":\"1\",\"is_active\":\"1\",\"is_deleted\":\"0\",\"first_name\":\"Sankarshan\",\"last_name\":\"Pandey\",\"mobile_no\":\"9958216610\",\"address\":\"\"},{\"totalUsersCount\":3,\"user_id\":11,\"email\":\"deepali.vig@techaheadcorp.com\",\"is_email_verified\":\"1\",\"is_active\":\"1\",\"is_deleted\":\"0\",\"first_name\":\"Deepali\",\"last_name\":\"Vig\",\"mobile_no\":\"7065111351\",\"address\":\"\"}]}}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin_user"
  },
  {
    "type": "post",
    "url": "/api/v1/user/access-token-admin",
    "title": "access-token-admin",
    "name": "access_token_admin",
    "group": "admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>admin access-token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>refresh_token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "admin_user_id",
            "description": "<p>admin_user_id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\"status\":true,\"message\":\"Token fetched successfully\",\"result\":{\"access_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl91c2VyX2lkIjoxLCJlbWFpbCI6ImFkbWluQGdydWJzbmFwLmNvbSIsImlhdCI6MTU3MzE5NzMwNSwiZXhwIjoxNTczMjE4OTA1fQ.szXauYpyUpJ4MlTdj9ECRn0yzbQrutvfPXxOa_f0zN4\"}}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/v1/user/admin-login",
    "title": "admin Login",
    "name": "admin_login",
    "group": "admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>admin logins to the his private admin panel</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\"status\":true,\"message\":\"Login Successfull\",\"result\":{\"admin_user_id\":1,\"email\":\"admin@grubsnap.com\",\"access_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdydWJzbmFwLmNvbSIsImFkbWluX3VzZXJfaWQiOjEsImlhdCI6MTU3MzE5NzM1MiwiZXhwIjoxNTczMjE4OTUyfQ.aAZ8J6rZhMmhIU0TnjUrXNDL0TtjzNWQrL9CxmNNum0\",\"refresh_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzMxOTczNTIsImV4cCI6MTU3NTc4OTM1Mn0.Gt-2iZWT8Iztv1kW5npOgY1ccE32FD-rdJTSDtY_Ums\"}}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/v1/user/azure-sas-token?container_name=&file_name=",
    "title": "AzureSasToken",
    "name": "azure_sas_token",
    "group": "admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>fetch the azure sas token for file upload on blob storage</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "container_name",
            "description": "<p>container_name</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "file_name",
            "description": "<p>file_name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":true,\"message\":\"Azure Sas token retrieved successfully\",\"result\":{\"token\":\"st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D\",\"uri\":\"https://grubsnapblob.blob.core.windows.net/grubsnapblob/BcJQo1hVP1KA__bulb.jpeg?st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "put",
    "url": "/api/v1/user/change-password",
    "title": "Admin ChangePassword",
    "name": "change_password",
    "group": "admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>admin change his own password from the admin settings panel</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>old_password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>new_password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\"status\":true,\"message\":\"Password updated successfully\",\"result\":{}}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/v1/user/upload-file",
    "title": "UploadFile",
    "name": "upload_file",
    "group": "admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>upload the image to blob</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "multipart",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true/false</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "statusCode",
            "description": "<p>universal status code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message string</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":true,\"message\":\"Azure Sas token retrieved successfully\",\"result\":{\"token\":\"st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D\",\"uri\":\"https://grubsnapblob.blob.core.windows.net/grubsnapblob/BcJQo1hVP1KA__bulb.jpeg?st=2019-11-11T07%3A55%3A30Z&se=2019-11-11T08%3A55%3A30Z&sp=w&sv=2018-03-28&sr=b&sig=lYUyp9BE96%2FNk82MfdfxBR%2FsCNnw3Ga0g5M1WFK3MS0%3D\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/Controller.js",
    "groupTitle": "admin"
  }
] });
