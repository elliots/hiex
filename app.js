var log = require('log4js').getLogger('mappu');

var express = require('express');
var lessMiddleware = require('less-middleware');
var _ = require('underscore');
var path = require('path');
var request = require('request');

var app = express();

var appDir = path.join(__dirname, 'app');
var genDir = path.join(__dirname, 'gen');

app.configure(function(){
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(lessMiddleware({
        dest: genDir + '/css',
        src: appDir + '/less',
        prefix: "/css",
        compress: true
    }));

    app.use(express.static(appDir));
    app.use(express.static(genDir));
});

// simple logger
app.use(function(req, res, next){
  log.log('verbose', '> %s %s', req.method, req.url);
  next();
});

app.listen(12345);
