'use strict';

var express = require('express'),
    os = require('os');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send();
});

app.get('/api/whoami', function(req, res) {
    console.log(req.headers['user-agent']);
    var ip = req.headers['X-Forwarded-For'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var language = req.headers['accept-language'].match(/^\S+(?=,)/)[0];
    var software = req.headers['user-agent'].match(/\((.+?)(?=;)/).slice(1)[0];

    res.json({ ipaddress: ip, language: language, software: software, architecture: os.arch() });
});



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


