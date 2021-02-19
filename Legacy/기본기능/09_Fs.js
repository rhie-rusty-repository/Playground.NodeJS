//new Buffer() ==> deprecated
/* 
  Developers should migrate all existing uses of the new Buffer() constructors to one of these new APIs.

Buffer.from(array) returns a new Buffer that contains a copy of the provided octets.
Buffer.from(arrayBuffer[, byteOffset[, length]]) returns a new Buffer that shares the same allocated memory as the given ArrayBuffer.
Buffer.from(buffer) returns a new Buffer that contains a copy of the contents of the given Buffer.
Buffer.from(string[, encoding]) returns a new Buffer that contains a copy of the provided string.
Buffer.alloc(size[, fill[, encoding]]) returns a new initialized Buffer of the specified size. This method is slower than Buffer.allocUnsafe(size) but guarantees that newly created Buffer instances never contain old data that is potentially sensitive. A TypeError will be thrown if size is not a number.
Buffer.allocUnsafe(size) and Buffer.allocUnsafeSlow(size) each return a new uninitialized Buffer of the specified size. Because the Buffer is uninitialized, the allocated segment of memory might contain old data that is potentially sensitive.
Buffer instances returned by Buffer.allocUnsafe() may be allocated off a shared internal memory pool if size is less than or equal to half Buffer.poolSize. Instances returned by Buffer.allocUnsafeSlow() never use the shared internal memory pool.
*/

var fs = require("fs");

//파일에 데이터를 씁니다.
fs.open("./기본기능/output.txt", "w", function (err, fd) {
  if (err) throw err;

  var buf = Buffer.from("안녕하세요\n", "utf8");

  fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
    if (err) throw err;

    console.log(err, written, buffer);

    fs.close(fd, function () {
      console.log("파일 열고 데이터 쓰고 파일 닫기 완료");
    });
  });
});

/* fd ???
File descriptors are a concept used in many programming languages, they represent a reference to an opened file.
The file descriptor will be used to reference the correct file stream by all file system related functions.
In fact stdout, stdin and stderr get assigned a file descriptor too, they are occupying fd 0 through 2, 
the next free file descriptor value is 3. Thats why the value returned in your example is 3.
*/

/*
    'r' : 읽기에 사용하는 플래그입니다. 파일이 없으면 예외가 발생합니다.
    'w' : 쓰기에 사용하는 플래그입니다. 파일이 없으면 만들어지고 파일이 있으면 이전 내용을 모두 삭제합니다.
    'w+' : 읽기와 쓰기에 모두 사용하는 플래그입니다. 파일이 없으면 만들어지고 파일이 있으면 이전 내용을 모두 삭제합니다.
    'a+' : 읽기와 추가에 모두 사용하는 플래그입니다. 파일이 없으면 만들어지고 있으면 이전 내용에 대한 새로운 내용을 추가합니다.
*/
