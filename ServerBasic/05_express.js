var express = require("express");
var http = require("http");

var app = express();

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어에서 요청을 처리함");

  req.user = "mike";

  next();
});

app.use("/", function (req, res, next) {
  console.log("두번째 미들웨어에서 요청을 처리함");

  res.write("<h1>Express에서 응답</h1>");
  res.write("<p>" + req.user + "</p>");
  res.end();
});

http.createServer(app).listen(3000, function () {
  console.log("Express Server is started. Port Number is 3000");
});
