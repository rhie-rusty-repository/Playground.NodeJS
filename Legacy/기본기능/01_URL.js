var url = require("url");

//URL 객체
var curURL = url.parse(
  "https://m.search.naver.com/search.naver?query=steve+jobs&where=m&m=mtp_hty"
);

//URL => String
var curStr = url.format(curURL);

console.log("주소 문자열 : ", curStr);
console.dir(curURL);

//요청 파라미터 따로 빼기
var querystring = require("querystring");
var param = querystring.parse(curURL.query);
console.log("요청 파라미터 중 query의 값 : ", param.query);
console.log("원본 요청 파라미터 : ", querystring.stringify(param));
