/* 
    스트림 단위로 파일 읽고 쓰기
        -   createReadStream(path, [options]) : 파일을 읽기 위한 스트림 객체를 만듭니다.
        -   createWriteStream(path, [options]) : 파일을 쓰기 위한 스트림 객체를 만듭니다.
    
    Extends : stream.Readable
        Event: 'close'
        Event: 'data'
        Event: 'end'
        Event: 'error'
        Event: 'pause'
        Event: 'readable'
        Event: 'resume'

            createReadStream
                Event: 'close'
                Event: 'open'
                Event: 'ready'

    Extends : stream.Writable
        Event: 'close'
        Event: 'drain'
        Event: 'error'
        Event: 'finish'
        Event: 'pipe'
        Event: 'unpipe'
        
            createWriteStream
                Event: 'close'
                Event: 'open'
                Event: 'ready'
*/
var fs = require("fs");
var infile = fs.createReadStream("./기본기능/output.txt", { flags: "r" });
var outfile = fs.createWriteStream("./기본기능/output2.txt", { flags: "w" });

infile.on("data", function (data) {
  console.log("읽어 들인 데이터", data);
  outfile.write(data);
});

infile.on("end", function () {
  console.log("파일 읽기 종료");
  outfile.end(function () {
    console.log("파일 쓰기 종료");
  });
});
