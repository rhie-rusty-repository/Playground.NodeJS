var fs = require("fs");

// 파일에서 데이터를 읽어 들입니다.
fs.open("./기본기능/output.txt", "r", function (err, fd) {
  if (err) throw err;

  var buf = Buffer.alloc(9);

  fs.read(fd, buf, 0, buf.length, 3, function (err, bytesRead, buffer) {
    if (err) throw err;

    console.log(buffer.toString("utf8"));
    console.log(bytesRead);
    fs.close(fd, function () {
      console.log("output.txt 파일을 열고 읽기 완료");
    });
  });
});
