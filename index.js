var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');







app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP);

var server = http.createServer(app);
server.listen(app.get('port'), app.get('ip'), function() {
    console.log("Server is listening at %s:%d", app.get('ip'), app.get('port'));
});