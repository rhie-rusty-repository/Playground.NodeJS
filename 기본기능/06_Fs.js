var fs = require("fs");

var data = fs.readFileSync("./기본기능/package.json", "utf8");
console.log(data);

console.log("프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.");

/* 
    오류가 발생하면 err에 오류 데이터가 들어가고 그렇지 않으면 err 변수의 값이 null이 됩니다.

    대표적인 메소드 4가지
        readFile(filename, [encoding], [callback]) : 비동기식 IO로 파일을 읽어 들입니다.
        readFileSync(filename, [encoding]) : 동기식 IO로 파일을 읽어들입니다.
        writeFile(filename, data, encoding='utf8', [callback]) : 비동기식 IO로 파일을 씁니다.
        writeFileSync(filename, data, encoding='utf8') : 동기식 IO로 파일을 씁니다.
*/
