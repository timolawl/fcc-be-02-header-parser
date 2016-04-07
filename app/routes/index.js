'use strict';

module.exports = function(app) {
    app.route('/')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

    app.get('/api/whoami', function(req, res) {
        var ip = req.headers['X-Forwarded-For'] ||
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        var language = req.headers['accept-language'].match(/^\S+(?=,)/)[0];
        var software = req.headers['user-agent'].match(/\((.+?)(?=;)/).slice(1)[0];

        res.json({ ipaddress: ip, language: language, software: software, architecture: os.arch() });
    });

};
