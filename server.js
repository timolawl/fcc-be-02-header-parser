'use strict';

var express = require('express'),
    favicon = require('serve-favicon'),
  //  routes = require('./app/routes/index.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(favicon(process.cwd() + '/public/images/favicon.ico'));


app.get('/api/whoami', function(req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var language = req.headers['accept-language'];
    var os = process.platform;

    res.json({ ipaddress: ip, language: language, software: os });
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


