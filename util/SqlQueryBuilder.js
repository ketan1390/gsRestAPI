const DbClient = require("../config/MySQLDb");

function SqlQueryBuilder() {

}
/***************************************************************************
 Created By: TechAhead
 Author : Sachita Nand Pandey
 Description - This function is used to process sql query & procedure call .
 @access Public
 ***************************************************************************/
SqlQueryBuilder.prototype.ParameterType = {
    "Input": "IN",
    "Output": "OUT",
    "INOUT":"INOUT"
}
SqlQueryBuilder.prototype.SqlParameter = function (value) {
    try {
        if(typeof(value)!='number'){
            switch(value){
                case "":
                    // set same as value
                    break;
                case '':
                    // set same as value
                    break;
                 default:
                        value=value?value:null
                    break;
            }
        }
        return value;
    } catch (e) {
        throw e;
    }

}
SqlQueryBuilder.prototype.Execute = function (queryText, parameters) {
    return new Promise((resolve, reject) => {
        try {
            DbClient.getConnection(function(err, connection) {
                if(err){ return reject(err);}
                connection.query({
                    sql: queryText?queryText:'',
                    timeout: 40000, // 40s
                    values: parameters?parameters: []
                }, function(error, results, fields) {
                    connection.release();
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch (e) {
            reject(e.stack.toString());
        }
    });

}
module.exports = new SqlQueryBuilder();