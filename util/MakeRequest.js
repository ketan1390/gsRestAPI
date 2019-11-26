const request = require('request')
const async = require('async');
const each = require('sync-each');
const Config = require('../config/Config');
const pageLimit = Config.SearchItemPerPage;

class MakeRequest {

    async sendRequest(option) {
        return new Promise((resolve, reject) => {
            request(option, (error, response, body) => {
                if (error) {
                    return reject(error)
                }
                return resolve({ body, response })
            });
        });
    }

        async sendRequests(option) {
        return new Promise((resolve, reject) => {
            request(option, (error, response, body) => {
                if (error) {
                    return reject(error)
                }
                return resolve({ body, response })
            });
        });
    }

    margeResponse(arr1, arr2) {
        let margeResult = [];
        return new Promise((resolve, reject) => {
            async.parallel([
                function (callback) {
                    each(arr1, function (item, next) {
                        let boxltyImage = '';
                        if (item.property_photo && item.property_photo[0] && item.property_photo[0].property_photo) {
                            boxltyImage = params.property_photo[0].property_photo;
                        }
                        item.property_photo = boxltyImage;
                        item.property_from = Config.Property.Boxlty;
                        margeResult.push(item);
                        next('', item);
                    }, function (lerr, arr1TransformedItems) {
                        callback(null, arr1.length);
                    });
                },

                function (callback) {
                    arr2=arr2?arr2:[];
                    each(arr2, function (item, next) {
                        let homeJunctionImage = '';
                        if (item.images && item.images[0]) {
                            homeJunctionImage = item.images[0];
                        }

                        margeResult.push({
                            'property_id': item.id,
                            'property_nickname': '',
                            'address': item.address.street,
                            'city': item.address.city,
                            'state': item.address.state,
                            'zipcode': item.address.zip,
                            'latitude': item.coordinates.latitude,
                            'longitude': item.coordinates.longitude,
                            'property_photo': homeJunctionImage,
                            'listingType': item.listingType,
                            'price': item.listPrice,
                            'property_from':  Config.Property.HomeJunction
                        });
                        next('', item);

                    }, function (lerr, arr2TransformedItems) {
                        callback(null, arr2.length);
                    });
                }
            ],
                function (err, results) {
                    return resolve(margeResult);
                });
        });
    }
    IsNull(value){
        return value?value=='undefined' || value=='null'?true:false:value==0?false:true;
    }
  /**
   * Method: GetHomeJunctionOptions
   * Purpose: get property date from home junction api
   */
  GetHomeJunctionOptions(input) {
    try {
        // set limit and offset 
      const limit = (!input.itemsPerPage) ? pageLimit : parseInt(input.itemsPerPage);
      let offset = (parseInt(input.page)) ? ((parseInt(input.page) - 1) * limit) : 0;

      // set input parameter for rquest to fetch record from db      
      input.maxDistance = Config.RadiusKM;
      input.latitude = (input.latitude) ? input.latitude : null;
      input.longitude = (input.longitude) ? input.longitude : null;
      input.city = (input.city) ? input.city : null;
      input.state = (input.state) ? input.state : null;
      input.searchText = (input.searchText) ? input.searchText : null;
      input.limitOffset = offset;
      input.itemsPerPage = limit;
      input.listingType = (input.listingType) ? input.listingType : null;
      input.accessType = (input.accessType) ? input.accessType : null;

      const listingType = (input.listingType) ? Config.HomeJunctionListingType[input.listingType] : null;
      // set rquest for hom junction
      let reqOption={};
      let circle = '';
      if (input.latitude && input.longitude) {
        const radius_in_miles = 20;
        circle = input.latitude + ',' + input.longitude + ',' + radius_in_miles;

        let queryParam={};

        queryParam.market='bright';
        !this.IsNull(input.city)?queryParam['city']=input.city:'';
        !this.IsNull(input.state)?queryParam['state']=input.state:'';
        !this.IsNull(input.page)?queryParam['pageNumber']=parseInt(input.page):'';
        !this.IsNull(input.itemsPerPage)?queryParam['pageSize']=input.itemsPerPage:'';
        !this.IsNull(circle)?queryParam['circle']=circle:'';
        !this.IsNull(input.searchText)?queryParam['address.street']=input.searchText:'';       
        !this.IsNull(listingType)?queryParam['listingType']=listingType:'';

        reqOption = {
            method: 'GET',
            uri: `${Config.HomeJunctionBaseUrl}/ws/listings/search`,
            qs: queryParam,
            headers: {
              'HJI-Slipstream-Token': input.homeJunctionToken,
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Origin': '*',
              'User-Agent': 'boxlty-node'
            }
          };
      }else{
       // https://slipstream.homejunction.com/ws/public-records/resolve?address=3301+South+Greenfield+Rd+Gilbert+AZ+85297
       /* reqOption = {
            method: 'GET',
            uri: `${Config.HomeJunctionBaseUrl}/ws/public-records/resolve`,
            qs: {
                'address': input.searchText
            },
            headers: {
              'HJI-Slipstream-Token': input.homeJunctionToken,
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Origin': '*',
              'User-Agent': 'boxlty-node'
            }
        };*/
        let queryParam={};
        queryParam.market='bright';

        !this.IsNull(input.pageNumber)?queryParam['pageNumber']=input.pageNumber:'';
        !this.IsNull(input.pageSize)?queryParam['pageSize']=input.pageSize:'';
        !this.IsNull(input.searchText)?queryParam['address.deliveryLine']=input.searchText:'';
        !this.IsNull(input.city)?queryParam['city']=input.city:'';
        !this.IsNull(input.state)?queryParam['state']=input.state:'';
        !this.IsNull(input.listingType)?queryParam['listingType']=listingType:'';

        reqOption = {
            method: 'GET',
            uri: `${Config.HomeJunctionBaseUrl}/ws/listings/search`,
            qs: queryParam,
            headers: {
              'HJI-Slipstream-Token': input.homeJunctionToken,
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Origin': '*',
              'User-Agent': 'boxlty-node'
            }
          };
      }
      //console.log("req-----------------",reqOption);
      return reqOption;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new MakeRequest();
