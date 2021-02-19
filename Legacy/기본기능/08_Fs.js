var fs = require("fs");

//파일에 데이터를 씁니다.
fs.writeFile("./기본기능/output.txt", "Hello world!", function (err) {
  if (err) {
    console.log("Error : " + err);
  }
  console.log("ouput.txt 쓰기 완료");
});
