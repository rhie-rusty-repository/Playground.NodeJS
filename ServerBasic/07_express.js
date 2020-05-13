var http = require("http");
var express = require("express");
var app = express();

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어");

  var userAgent = req.header("User-Agent");
  var paramName = req.query.name;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<p>" + userAgent + "</p>");
  res.write("<p>" + paramName + "</p>");
  res.end();
});

http.createServer(app).listen(3000, function () {
  console.log("서버 켜짐");
});
