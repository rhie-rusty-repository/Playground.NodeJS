var http = require("http");

//웹 서버 객체를 만듭니다.
var server = http.createServer();

//웹 서버를 시작하여 3000번 포트에서 대기합니다.
var port = 3000;
var host = "127.0.0.1";
server.listen(port, host, function () {
  console.log("웹서버가 시작되었습니다.", port);
});
