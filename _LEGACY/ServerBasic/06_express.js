var http = require("http");
var express = require("express");

var app = express();

app.use("/test", function (req, res, next) {
  console.log("첫번째 미들웨어");
  var JSON = {
    name: "소녀시대",
    age: 20,
  };
  //   res.send(JSON); 이것이 있으면 두번째 미들웨어에서의 redirect처리는 불가
  next();
});

app.use(function (req, res, next) {
  console.log("두번째 미들웨어");
  setTimeout(function () {
    console.log("3초가 지났음");
    res.redirect("https://www.naver.com/");
  }, 3000);
});

http.createServer(app).listen(3000, function () {
  console.log("서버가 켜졌음");
});
