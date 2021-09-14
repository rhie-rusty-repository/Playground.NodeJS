var express = require("express"),
  http = require("http");

// 익스프레스 객체 생성
var app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set("port", process.env.PORT || 3000);

// Express 서버 시작
http.createServer(app).listen(app.get("port"), function () {
  console.log("익스프레스 서버를 시작했습니다 : ", app.get("port"));
});

/* 
    set(name, value) : 서버 설정을 위한 속성 지정
    get(name) : 서버 설정시 지정한 속성(name)의 value 리턴
    use(경로, function) : 미들웨어 함수
    get(경로, function) : 특정 패스로 요청된 정보를 처리

    env : 서버 모드 설정
    views : 뷰들이 들어 있는 폴더 설정
    view engine : 디폴트로 사용할 뷰 엔진 설정
*/
