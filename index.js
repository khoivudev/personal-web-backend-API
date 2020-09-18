//Dependencies- Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

//Middleware
//1.Serve static assets
app.use(express.static(__dirname + "/public"))



//Route
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html")
})





//Sever IP - Port
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

var server = http.createServer(app);
server.listen(app.get('port'), app.get('ip'), function() {
    console.log("Server is listening at %s:%d", app.get('ip'), app.get('port'));
});