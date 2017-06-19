// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  var regexpLang = /^(\w+-\w+)/;
  var regexpSoft = /(\(.+\))/g;
  var headerForIP = request.headers['x-forwarded-for'];
  var headerLanguage = request.headers['accept-language'];
  var headerSoft = request.headers['user-agent'];
  var ipaddress = headerForIP.substr(0,headerForIP.indexOf(','));
  var language = regexpLang.exec(headerLanguage)[0];
  var software = regexpSoft.exec(headerSoft);
  software = software[0].substr(1,software[0].indexOf(')')-1);
  var obj = {
    ipaddress,
    language,
    software
  };
  response.send(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
