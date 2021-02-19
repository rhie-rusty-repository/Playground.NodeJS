var http = require("http");
var fs = require("fs");

var server = http.createServer();
var port = 3000;

server.listen(port, function () {
  console.log("서버가 시작되었습니다.");
});

server.on("request", function (req, res) {
  //   var filename = "./ServerBasic/애즈퍼엄2.jpg";
  var filename = "./ServerBasic/toClientText.txt";

  var infile = fs.createReadStream(filename);
  //   var outfile = fs.createWriteStream(res); 파라미터는 string이여야 한다.
  infile.pipe(res);
});
