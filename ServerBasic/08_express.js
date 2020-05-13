var http = require("http");
var express = require("express");
var static = require("serve-static");
var path = require("path");
var app = express();

app.use("/public", static(path.join(__dirname, "public")));

http.createServer(app).listen(function () {
  console.log("서버 열림");
});
