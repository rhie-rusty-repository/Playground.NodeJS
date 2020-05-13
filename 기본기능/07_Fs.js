var fs = require("fs");

fs.readFile("./기본기능/package.json", "utf8", function (err, data) {
  //읽어 들이 데이터 출력
  console.log(data);
});

console.log("프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.");
