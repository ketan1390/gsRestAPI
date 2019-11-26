'use strict';
module.exports = {
    APIResCode: {
        Success: 200,
        InvalidCredential: 203,
        BadRequest: 400,
        Unauthorized: 401,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        RequestTimeout: 408,
        Conflict: 409,
        LengthRequired: 411,
        InvalidToken: 498,
        //TokenRequired: 499,
        ServerError: 500,
        InvalidAccessToken: 417,
        InvalidRefreshToken: 410,
        AccessExpired: 501,
        RefreshExpired: 502
    },
    ProviderConst: {
        Boxtly: 1,
        Facebook: 2,
        GooglePlus: 3
    },
    GenderConst: {
        Male: 1,
        Female: 2,
        Trans: 3
    },
    DevicePlateform: {
        Android: 1,
        IOS: 2,
        Web: 3,
        apiServer: 4
    },
    weekdays: {
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
        Sun: 7
    },
    Interval: {
        Daily: 1,
        Weekly: 2,
        Monthly: 3

    },
    PageLimit: 20

}
