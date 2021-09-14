var fs = require("fs");
fs.mkdir("./기본기능/docs", 0666, function (err) {
  console.log("새로운 docs 폴더를 만들었습니다");

  fs.rmdir("./기본기능/docs", function (err) {
    if (err) throw err;
    console.log("docs 폴더를 삭제했습니다.");
  });
});
