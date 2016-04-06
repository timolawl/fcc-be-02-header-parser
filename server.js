'use strict';

var express = require('express'),
    os = require('os');
  //  favicon = require('serve-favicon');
  //  routes = require('./app/routes/index.js');

function getSoftware() {
    var osType;
    osType = os.type();
    if (osType === 'Darwin') osType = 'OS X';
    else if (osType === 'Windows_NT') osType = 'Windows';

    return osType;
}

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send();
});

//app.enable('trust proxy');

app.get('/api/whoami', function(req, res) {
    var ip = req.headers['X-Forwarded-For'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var language = req.headers['accept-language'].match(/^\S+(?=,)/)[0];

    res.json({ ipaddress: ip, language: language, software: getSoftware(), architecture: os.arch() });
});



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


