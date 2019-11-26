'use strict';
const mysql  = require('mysql');
const config = require('./Config');
module.exports = mysql.createPool({
    connectionLimit : config.DbMySql.connectionLimit, //important
    host     : config.DbMySql.host,
    user     : config.DbMySql.user,
    password : config.DbMySql.password,
    database : config.DbMySql.database,
    supportBigNumbers:true,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    multipleStatements: true    
    //,debug    : config.DbMySql.MYQLDB_DEBUG
});