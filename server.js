var path = require("path");
var express = require("express");
var fs = require('fs');
var https = require('https');
var http = require('http');
var cors = require('cors');

var DIST_DIR = path.join(__dirname, "dist");
var PORT = 443;
var app = express();

//Serving the files on the dist folder
app.use('*', cors());
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(PORT, function () {
        console.log(`Example app listening on port ${PORT}!`)
    });

http.createServer(function (req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
    res.end();
}).listen(80);