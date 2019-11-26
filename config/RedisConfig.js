
const path = require('path');
 const RedisClustr = require('redis-clustr');
const Redis = require('redis');
	bluebird = require('bluebird'),
	bluebird.promisifyAll(Redis.RedisClient.prototype),
	bluebird.promisifyAll(Redis.Multi.prototype);
const Config = require('../config/Config');


// const defaultRedisOptions = {
//     retry_strategy: (options) => {
//         if (options.times_connected >= 3) { 
//             console.log('option here .......');
//             return new Error('Retry attempts exhausted');
//         }
        
//         return 1000;
//     },
//     no_ready_check: false,
//     enable_offline_queue: true,
// };


// const redis = new RedisClustr({
//     servers: [
//         {
//             host: Config.RedisConfig.Host,
//             port: Config.RedisConfig.Port
//         }
//     ],
//     createClient: function (port, host) {
//         return Redis.createClient(
//             port,
//             host,
//             {
//                 ...defaultRedisOptions,
//                 tls: {
//                             servername: Config.RedisConfig.Host
//                         }
//             }
            
//         );
//     },
//     slotInterval: 1000, 
//     redisOptions: {
//         ...defaultRedisOptions,
//         retry_max_delay: 500
//     }
    
// });

// Add your cache name and access key.
const redis = Redis.createClient(
    Config.RedisConfig.Port,
    Config.RedisConfig.Host,
     {
    //    // auth_pass: "BC/CSWuwkdosceur5jqoKThy7NSfzww5vCObjgYn",
        // tls: {
        //     servername: Config.RedisConfig.Host
        // }
     },
    retry_strategy =  (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
  
);


//connect to redis
redis.on('connect',  () => {
	console.log('AWS redis connected ..... ');
});


  
redis.on('ready', ()=>{
    console.log('redis is ready to work now...');
})

redis.on('Error',()=>{
    console.log('error in Redis');
})


module.exports = redis;