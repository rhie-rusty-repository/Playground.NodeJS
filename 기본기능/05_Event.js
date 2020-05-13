/* 
    항상 process 객체를 사용해 이벤트를 전달한다면, 같은 이름의 이벤트를 사용하는 경우에 충돌이 생길 수 있다.
    그러므로 모듈 파일을 만들고 그 안에서 이벤트를 처리하도록 만드는 것이 좋다.
*/
var Calc = require("./04_Event");

var calc = new Calc();
calc.emit("stop");

console.log(Calc.title + "에 stop 이벤트 전달함");
