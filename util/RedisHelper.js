
 const Redisclient = require('../config/RedisConfig');
class RedisHelper {

	constructor(TTL = 86400, ConnectStatus = false) {
		try {
			this.TTL = TTL;
			if (process.env.DISABLE_REDIS && process.env.DISABLE_REDIS == true) {
				this.connected = false;
			} else {
				this.connected = ConnectStatus;
			}

			this.client = Redisclient;
			// Redis Client Ready connection check
			this.client.on('ready', () => {
				this.connected = true;
			})
			// Redis Client Error in connection 
			this.client.on('error', (err) => {
				this.connected = false;
				console.log('On redis connect : error : ', err);
			});
		} catch (e) {
			console.log('On redis connect : constructor catch error : ');
		}

	}


	 // check redis clinet Status
	status() {
		this.client.ping()
	}

	  // set key with expire default ttl
	  set(key, values, expiry = this.TTL) {
        return new Promise((resolve, reject) => {
            try {
                if (this.connected && this.client.ping()) {
				    let response =  this.client.set(key, JSON.stringify(values),'EX', expiry);
                    resolve(response);
				} else {
                    resolve(true);
                }
            } catch(e){
                reject('Redis SetKey throw error -->>',e.stack.toString());
            }
        });
	}
	
    // Get Key 
    get(key) {
        return new Promise((resolve, reject) => {
            try {
                if (this.connected && this.client.ping()) {
                    this.client.getAsync(key).then((data) => {
                        if (data && data != null) {
                            data = JSON.parse(data);
                            resolve(data)
                        } else {
                            reject("data not found");
                        }
                    })
                } else {
                    reject('Redis is not Connected');
                }
            } catch(e){
                reject('Redis Get throw error -->>',e.stack.toString());                
            }
        });
    }   

// redis.keys('**', function (err, keys) {
//     keys.forEach( (key, pos) => {
//          console.log(key);
//     });
// });

	async getRedisAllKey() {
		const redisKeys = [];
		return new Promise((resolve, reject) => {
			
			if (this.connected && this.client.ping()) {
				this.client.keys('**', function (err, redisKeys) {
					return resolve({ redisKeys });
				});
			} else {
				return resolve({ redisKeys });
			}
		});
	}

	
	async getRedisKeyBYId(userId) {
		const preKeys = [];
		return new Promise((resolve, reject) => {
			if (this.connected && this.client.ping()) {
				this.client.keys('*' + userId + '_*', function (err, preKeys) {
					return resolve({ preKeys });
				});
			} else {
				return resolve({ preKeys });
			}
		});
	}


	async deletePreviousCache(keys) {
		return new Promise((resolve, reject) => {
			if (this.connected && this.client.ping()) {
			this.client.del(keys, function (error, res) {
				if (error) {
					return reject(error);
				}
				return resolve({ res });
			});
			} else {
				return resolve({ keys });
			}
		});
	}
	
	async genrateRedisKey (input)  {
		return new Promise((resolve, reject) => {
			let rediskey = input.userId + '_';
			if ( input.latitude && input.longitude) {
			  rediskey = rediskey + input.latitude.replace(/\./g, '_') + '_' + input.latitude.replace(/\./g, '_');
			}
			if ( input.city) {
			  rediskey = rediskey + '_' + input.city;
			}
			if ( input.state) {
			  rediskey = rediskey + '_' + input.state;
			}
			if ( input.searchText) {
			  rediskey = rediskey + '_' + input.searchText;
			}
			if (input.page) {
				rediskey = rediskey + '_' + input.page;
			  }
			if ( input.listingType) {
				rediskey = rediskey + '_' +  input.listingType.replace(/\,/g, '_');
			}
			if ( input.page) {
				rediskey = rediskey + '_' + input.page;
			  }
			
			return resolve({ rediskey });
			
		});
	}

}
module.exports = new RedisHelper();