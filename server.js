'use strict';

// get the packages we need
 const express = require('express'), //use to define framework
  app = express(), //taking express object for whole project
  bodyParser = require('body-parser'), //it is use to handle post reuqests
  cors = require('cors'),
  Util = require('./util/CustomFunctions'), // used custom function
  Config = require('./config/Config');
// ====================================
// Route need to allow cross origin
// ====================================
const CorsOptions = {
  origin: '*',//Config.OriginWhiteList,
  credentials: true
};
app.use(cors(CorsOptions));
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '500mb',
  extended: true
}));

//enabling bodyparser to accept json also
app.use(bodyParser.json({limit: '500mb',type: 'application/json', extended: true}));

//set view file path
app.set('view engine', 'ejs');

//set default language
app.use(function (req, res, next) {
  let language = req.params.language || req.headers['language'];
  if (language) {
    if (Config.lang.avail_lang[req.headers.language]) {
      app.set('lang', language);
    } else {
      app.set('lang', 'en');
    }
  } else {
    // global.lng='en';
    app.set('lang', 'en');
  }
  next();
});


//Route Start

//adding route for home page
app.get('/api', (req, res) => {
  res.send(
      '<center><h2><b>Hi, This is GrubSnap demo Server.<br><i> How can i help you ;)</i></b></h2></center>'
    );
});


app.use(express.static(__dirname + '/public'));

//Adding route for docs 
app.get('/docs', function (req, res) {
  app.use(express.static(__dirname + '/public/docs'));
  //console.log(__dirname + '/public/docs');
  res.sendFile('./public/docs/index.html', { root: __dirname });
});


//define app api for version v1  and require routes based file
const UsermanagementApi = require('./routes/v1/Routes');
//adding middleware for api v1
app.use('/api/v1/user', UsermanagementApi);



app.use(function (req, res, next) {
  const LangMsg = Config.Messages[req.app.get("lang")];
  Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.NotFound, Util.FormatException(LangMsg.RouteNotAllowed.replace('<<<url>>>', req.url)), null);
  return;
});


process.on(
  'uncaughtException',
  function (err) {
    let stack = err.stack;
    console.log(err);
    //console.log('uncaughtException=====>', stack);
  }
);
// cathc errors and save as file in log folder
process  
  .on('uncaughtException', function (err) {
    let stack = err.stack;
    //console.log('uncaughtException=====>', stack);
  })
  .on('unhandledRejection', (reason, p) => {
    //console.error(reason, 'Unhandled Rejection at Promise', p);
  });

  // var port = process.env.PORT || 8080;
  // app.listen(port, function() {
  //   console.log('Listening on ' + port);
  // });

  module.exports = app;