const express = require('express');
const qustr = require('querystring');

var app = express();

app.use(require('./routes/index.js'));

var port = process.env.PORT || 3000;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var exp = /./g;

var server = app.get(exp,function(req, res){
    console.log('running')
    var returnObj = {unix : null, natural : null}
    //remove % notation and leading / from url
    var cleanedURL = qustr.unescape(req.url.slice(1));
    //if url cannot be parsed by Date
    if(String(Date.parse(cleanedURL)) == 'NaN'){
        //if url is non numeric (not a UNIX timecode)
        if(String(Number(cleanedURL)) == 'NaN'){
            res.end(JSON.stringify(returnObj));
            return}
        //if url is a UNIX timecode
        var date = new Date();
        date.setTime(Number(cleanedURL)*1000);
        var natural = months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
        returnObj.unix = cleanedURL;
        returnObj.natural = natural;
        res.end(JSON.stringify(returnObj));
    };
    //if in date format
    var date = new Date(cleanedURL);
    returnObj.natural = cleanedURL;
    returnObj.unix = date.getTime()/1000;
    res.end(JSON.stringify(returnObj));
});
server.listen(port);