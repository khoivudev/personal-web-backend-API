var express = require('express');
var router = express.Router();
var parser = require('ua-parser-js');

router.get("/hello", (req, res) => {
    res.json({ greeting: 'hello API' });
});

//APIs and Microservices Projects - Timestamp Microservice
router.get("/timestamp/", (req, res) => {
    date = new Date();
    console.log("current date");
    res.json({ "unix": date.getTime(), "utc": date.toUTCString() })
});

router.get("/timestamp/:date_string", (req, res) => {
    let dateString = req.params.date_string;
    if (/\d{5,}/.test(dateString)) {
        dateInt = parseInt(dateString);
        //Date regards numbers as unix timestamps, strings are processed differently
        res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
    }

    let date = new Date(dateString);
    if ((date !== "Invalid Date") && !isNaN(date)) {
        res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
    } else {
        res.json({ "error": "Invalid Date" });
    }
});

//APIs and Microservices Projects - Request Header Parser Microservice
router.get('/whoami', (req, res) => {
    var software = parser(req.get('user-agent'))

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var language = req.get('accept-language')

    var userObject = {
        "ipaddress": ip,
        "language": language.split(',')[0],
        "software": software.os.name + " " + software.os.version
    }

    console.log('ipaddress: ' + ip);
    console.log('software: ' + JSON.stringify(software.os.name) + " " + JSON.stringify(software.os.version));
    console.log('language: ' + language.split(',')[0]);
    res.json(userObject);
})


module.exports = router;