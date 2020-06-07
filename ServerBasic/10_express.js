// Express 기본 모듈 불러오기
var express = require("express"),
  http = require("http"),
  path = require("path");

// Express 미들웨어 불러오기
var bodyParser = require("body-parser"),
  static = require("serve-static");

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

// 라우터 함수 등록
var router = express.Router();

router.route("/login").get(function (req, res) {
  res.redirect("/public/login.html");
});

router.route("/process/login/:name").post(function (req, res) {
  console.log("/process/login 처리함");

  var paramName = req.params.name;
  var paramId = req.body.paramId;
  var paramPassword = req.body.paramPassword;

  console.log(req.body);
  res.send(req.body);
});

// 라우터 객체를 app 객체에 등록
app.use("/", router);

http.createServer(app).listen(3000, function () {
  console.log("서버 켜짐");
});
