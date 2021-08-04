# 01. console 객체와 process 객체

## - console

 - dir() : 객체 속성 확인
 - time('id')
 - timeEnd('id')

## - process

 - argv : 프로세스 실행할 때 전달되는 파라미터
 - env : 환경 변수
 - exit()

### * OS 환경 변수의 값
```js
process.env['OS']
```
### * 주요 전역 변수

 - `__filename` : 실행한 파일 이름(Path 전체)
 - `__dirname` : 실행한 파일이 들어있는 폴더(Path 전체)

<br><br><br><br><br>
<hr>
<br><br><br><br><br>



# 02. 모듈 관리

## - 모듈화와 사용 1

### * export
```js
exports.함수이름 = 구현부
```
 - `module.js`
```js
exports.test = function(){
    console.log("모듈 불러옴");
}

exports.test2 = function(){
    console.log("모듈 불러옴2");
}
```

### * import
```js
var module = require('module.js');
module.함수이름();
```
 - `main.js`

```js
let sample = require('./module');
sample.test(); /*모듈 불러옴*/
sample.test2(); /*모듈 불러옴2*/
```

## - 모듈화와 사용 2

### * export
```js
var something = {}

something.프로퍼티 = 구현

module.exports = something;
```

### * Example

 - module.js
```js
let calc = {}

calc.add = (n1, n2) => {
    return n1 + n2;
}

calc.mul = (n1, n2) => {
    return n1 * n2;
}

module.exports = calc;
```


 - main.js
```js
let calc = require('./module');

console.log(calc.add(10, 20)); //30
console.log(calc.mul(10, 20)); //200
```

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

# 03. 시스템 환경 변수에 접근하기 `nconf`

```cmd
npm install nconf
```

```js
let nconf = require('nconf');
nconf.env();

console.log(`OS 환경변수의 값 : ${nconf.get('OS')}`);
```

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

# 04. npm 사용

## * package.json 만들기

```cmd
npm init
```

## * npm 설치/지우기

```cmd
npm uninstall nconf
```

```cmd
npm install nconf --save
```

 - package.json에 정의된 모듈 설치
```cmd
npm install
```


<br><br><br><br><br>
<hr>
<br><br><br><br><br>

# 05. 빌트인

## - `os` 모듈

| 메소드 이름 | 설명 |
|:---:|:---:|
|hostname()| 운영체제의 호스트 이름|
|totalmem()| 시스템의 전체 메모리 용량|
|freemem()| 사용가능한 메모리 용량|
|cpus()|CPU정보|
|networkInterfaces()| 네트워크 인터페이스 정보를 담은 배열|

## - `path` 모듈

| 메소드 이름 | 설명 |
|:---:|:---:|
|join()| 파일 패스 합치기|
|dirname()| 디렉터리 이름 반환|
|basename()| 확장자를 제외한 이름 |
|extname()| 확장자 반환|

### * Example

```js
let path = require('path');

console.log(path.sep); // "\"

let filepath = `WORKSPACE/CodeWorld/GIT-REPO-ARCHIVE/JS/Playground.NodeJS/main.js`

console.log(`dirname : ${path.dirname(filepath)}`);
console.log(`basename : ${path.basename(filepath)}`);
console.log(`extname : ${path.extname(filepath)}`);

/* 
dirname : WORKSPACE/CodeWorld/GIT-REPO-ARCHIVE/JS/Playground.NodeJS
basename : main.js
extname : .js
*/
```


<br><br><br><br><br>
<hr>
<br><br><br><br><br>

# 06. 노드 기본 기능

## - 주소 다루기

### * url 모듈 & querystring 모듈

#### url 모듈

 - `parse()` : 주소 문자열 -> URL 객체
 - `format()` : URL 객체 -> 주소 문자열

#### querystring 모듈

 - `parse()` : 문자열 -> Parameter 객체
 - `stringify()` : Parameter -> 문자열

```js
let url = require('url');
let queryString = require('querystring');

let strUrl = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=node.js';

let urlObj = url.parse(strUrl); //deprecated
console.log(strUrl); //https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=node.js 
let param = queryString.parse(urlObj.query); //Parameter 객체
console.log(param);
/* 
{
  where: 'nexearch',
  sm: 'top_hty',
  fbm: '1',
  ie: 'utf8',
  query: 'node.js'
}
*/
```



## - 이벤트 처리
 
### * process.
 - `on(event, listener)`
 - `once(event, listener)` : 한번 실행후 자동으로 제거됨
 - `removeListener(event, listener)`
 - `emit(eventName, parameter)` : 사용자 정의 이벤트

```js
process.on('exit', function(){
    console.log('exit 이벤트 발생');
})

process.exit();
```

### * 이벤트 모듈화

process 객체를 이용하여 이벤트를 다루면 이름이 충돌될 수도 있다.
 
 - `module.js`

```js
let util = require('util'); //상속 기능 사용을 위해
let EventEmitter = require('events').EventEmitter //이벤트 리스터 함수들은 이걸 상속받음

let EventObj = function(){

    let that = this;

    that.on("myEvent", function(a, b){
        console.log(`myEvent 발생 : ${a}, ${b}`);
    });
    
};

util.inherits(EventObj, EventEmitter);

module.exports = EventObj;
module.exports.title = "이벤트 테스트";
```

 - `main.js`

```js
let EventObj = require('./module');

console.log(EventObj.title); //이벤트 테스트
new EventObj().emit('myEvent',10,20); //myEvent 발생 : 10, 20
```

## - 파일 다루기

### * fs 모듈

 - `readFile(filename, [encoding], [callback])`
 - `readFileSync(filename, [encoding])`
 - `writeFile(filename, data, encoding='utf8', [callback])`
 - `writeFileSync(filename, data, encoding='utf8')`


#### 파일 쓰기
```js
let fs = require('fs');
let path = require('path');

let fileName = "myFile.txt"

fs.writeFile(
    path.join(__dirname,fileName),
    "This is my file~",
    function(err){
        if(err){
            console.log("Error : " + err);
        }

        console.log(`${fileName} 쓰기 완료`);
    }
);
```

#### 파일 읽기

```js
let fs = require('fs');
let path = require('path');

let fileName = "myFile.txt"

fs.readFile(
    path.join(__dirname,fileName),
    function(err, data){
        if(err){
            console.log("Error : " + err);
        }

        console.log(data.toString()); //This is my file~
        console.log(`${fileName} 읽기 완료`);
    }
);
```

### * 스트림

```js
let fs = require('fs');
let path = require('path');

let infilePath = path.join(__dirname,"myFile.txt");
let outfilePath = path.join(__dirname,"myFile2.txt");

let infile = fs.createReadStream(infilePath, {flags:'r'});
let outfile = fs.createWriteStream(outfilePath, {flags:'w'});

infile.on('data',function(data){
    console.log(`읽은 데이터 ${data}`);
    outfile.write(data);
})

infile.on('end',function(){
    console.log("파일 읽기 종료");
    outfile.end(()=>console.log("파일 쓰기 종료"));
})

/* 
읽은 데이터 This is my file~
파일 읽기 종료
파일 쓰기 종료
*/
```

## - Buffer

```js
/* 
    Node.js에서 Buffer 객체: 바이트 시퀀스 형태의 이진 데이터를 대표한다.
    Buffer 클래스는 global scope에 있음
*/

// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);

// Creates a Buffer of length 10,
// filled with bytes which all have the value `1`.
const buf2 = Buffer.alloc(10, 1);

// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using fill(), write(), or other functions that fill the Buffer's contents.
const buf3 = Buffer.allocUnsafe(10);

// Creates a Buffer containing the bytes [1, 2, 3].
const buf4 = Buffer.from([1, 2, 3]);

// Create a Buffer containing the bytes [1, 1, 1, 1] - the entries
// are all truncated using `(value & 255)` to fit into the range 0-255.
const buf5 = Buffer.from([257, 257.5, -255, "1"]);

// Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':
// [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)
// [166, 195, 169, 115, 116] (in decimal notation)
const buf6 = Buffer.from("tést");

// Creates a Buffer containing the Latin-1 bytes [0x74, 0xc3, 0xa9, 0x73, 0x74]
const buf7 = Buffer.from("tést", "latin1");

const buf = Buffer.from("hello world", "utf8");
console.log(buf.toString("hex"));
console.log(buf.toString("base64"));

console.log(Buffer.from("fhqwhgads", "utf8"));
```

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

# 07. 웹 서버 기본

## - 기본 틀

```js
let http = require('http');

let server = http.createServer();

let port = 3000;

server.listen(port, function(){
    console.log("서버 시작");
})

server.on('connection', function(socket){
    console.log(socket);
})

server.on('request', function(req,res){
    console.log(req);

    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Hello World</h1>');
    res.write('<body>');
    res.write('</body>');
    res.write('</html>');
    res.end();
})
```

### * https 적용법

 - SSL 인증서 생성 (Https)

```cmd
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```
 - (Command Backup)
```cmd
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
```cmd
# 이것은 먹히지 않는다.
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

```js
const app = require('express')()
const https = require('https')
const path = require('path')
const fs = require('fs')
const port = 3000

//Use OpenSSL
const options = {
    key: fs.readFileSync(path.join(__dirname, 'config/certificates/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'config/certificates/cert.pem')),
    passphrase: '1234'
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(port,()=>{
    console.log(`app listening at http://localhost:${port}`);
})
```

## - Expess.js 적용

### * request --> middleware --> router --> response

```cmd
npm install --save express
```
```cmd
npm show express version
```
 - `app.js`
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
### * 메서드와 속성

#### 메서드
 - set() : 서버 설정 setter
 - get() : 서버 설정 getter
 - use() : 미들웨어

#### 속성
 - env : 서버 모드를 설정
 - views : 뷰들이 들어 있는 폴더 또는 폴더 배열 설정
 - view engine : 디폴트로 사용할 뷰 엔진 설정

### * Routing 메서드

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post('/', function (req, res) {
  res.send('Got a POST request');
});


app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});


app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

#### URL 파라미터

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

접속 : `http://localhost:3000/users/rhie/books/nodejs`

접속 결과
```json
{"userId":"rhie","bookId":"nodejs"}
```

#### Routing 핸들러 콜백 함수 활용

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/cbchain', function(req,res,next){
  console.log('CB0');
  next();
}, function(req,res,next){
  console.log('CB1');
  next();
},function(req,res){
  res.send('Hello from C!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

#### Routing 핸들러 콜백 함수 배열 적용

```js
const express = require('express')
const app = express()
const port = 3000

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/cbchain', [cb0, cb1, cb2]);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
### * Response 메서드

|Method|Description|
|:---:|:---:|
|res.download()|	Prompt a file to be downloaded.|
|res.end()|	End the response process.|
|res.json()|	Send a JSON response.|
|res.jsonp()|	Send a JSON response with JSONP support.|
|res.redirect()|	Redirect a request.|
|res.render()|	Render a view template.|
|res.send()|	Send a response of various types.|
|res.sendFile()|	Send a file as an octet stream.|
|res.sendStatus()|	Set the response status code and send its string representation as the response body.|


## - Expess.js 미들웨어

### * 미들웨어 기본 사용법

```js
const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next)=>{
    console.log("첫번째 미들웨어");
    req.name = "RHIE";
    next();
})

app.use((req, res, next)=>{
    console.log("두번째 미들웨어");
    next();
})

app.get('/', (req, res) => {
    res.send(`Hello World! ${req.name}`)
})
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```



### * 웹문서

 - `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/css/style.css">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
    <script src="/static/js/script.js"></script>
</body>
</html>
```
 - `public/css/style.css`
```css
h1{
  color : red;  
}
```
 - `public/js/script.js`

```js
console.log("자바스크립트 로딩 완료");
```

 - `main.js` || `app.js`
 
접속 : `localhost:3000/static/index.html`

```js
const express = require('express')
const path = require('path');
const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.send(`Hello World!`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
### * Router 객체 사용하기

 - `bird.js`

```js
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```

 - `app.js`

접속 : `http://localhost:3000/bird`<br>
접속 : `http://localhost:3000/bird/about`

```js
const express = require('express');
const bird = require('./bird');
const app = express();
const port = 3000;

app.use('/bird', bird)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

## - Expess.js 미들웨어 활용

### * 에러 처리

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})

app.all('*', (req,res)=>{
  res.status(404).send("<h1>페이지 없음</h1>");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### * 쿠키 처리 (클라이언트)

```js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(cookieParser());

app.get('/setCookie', (req, res) => {
  res.cookie('member', {
    id : 'quoti',
    name : 'rhie',
    authorized : true
  })

  res.send("<h3>쿠키 설정 완료</h3>")
})

app.get('/getCookie', (req, res) => {
  res.send(req.cookies);
})

app.all('*', (req,res)=>{
  res.status(404).send("<h1>페이지 없음</h1>");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### * 세션 처리 (서버)

세션을 사용할 때는 쿠키도 같이 사용함으로 `cookie-parser`필요

`connect.sid`


쿠키 내의 클라이언트에 세션 식별자 만 저장하고 일반적으로 데이터베이스의 서버에 세션 데이터를 저장

```js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const port = 3000;

app.use(cookieParser());
app.use(expressSession({
  secret:"my secret key",
  resave: true,
  saveUninitialized: true
}))

app.get('/setCookie', (req, res) => {
  res.cookie('member', {
    id : 'quoti',
    name : 'rhie',
    authorized : true
  })

  res.send("<h3>쿠키 설정 완료</h3>")
})

app.get('/getCookie', (req, res) => {
  res.send(req.cookies);
})

app.get('/login', (req, res) => {
  
  console.log("::: /login 접근 :::");

  if(req.session.user){
    console.log(req.cookies)
    console.log(req.session.user);
    res.send("<h3>이미 로그인됨</h3>");
  }else{
    req.session.user = {
      id : 'rob',
      name : 'brian',
      authorized: true
    }
    console.log(req.cookies);
    console.log(req.session.user);
    res.send(req.session.user);
  }


})

app.get('/check', (req, res) => {

  console.log("::: /check 접근 :::");

  if(req.session.user){
    console.log(req.cookies)
    console.log(req.session.user);
    res.send("<h3>권한 있음</h3>");
  }else{
    console.log(req.cookies)
    console.log(req.session.user);
    res.send("<h3>권한 없음</h3>");
  }
  
})

app.all('*', (req,res)=>{
  res.status(404).send("<h1>페이지 없음</h1>");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### * Multipart 처리

#### # multer

 - `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/static/css/style.css">
  <title>Document</title>
</head>

<body>
  <h1>Hello World</h1>

  <form action="/stats" enctype="multipart/form-data" method="post">
    <div class="form-group">
      <input type="file" class="form-control-file" name="uploaded_file">
      <input type="text" class="form-control" placeholder="내용을 입력해주세요" name="content">
      <input type="submit" value="Get me the stats!" class="btn btn-default">
    </div>
  </form>
  <script src="/static/js/script.js"></script>
</body>

</html>
```

 - `app.js`

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});

app.post('/stats', upload.fields([
  { name: 'uploaded_file'},
  { name: 'content'}
]), function(req, res){
  console.log(req.files);
  console.log(req.body.content);
  res.send("성공");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

결과

```c
[Object: null prototype] {
  uploaded_file: [
    {
      fieldname: 'uploaded_file',
      originalname: '013.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'c:\\Users\\Rhie\\Desktop\\WORKSPACE\\CodeWorld\\GIT-REPO-ARCHIVE\\JS\\Playground.NodeJS\\tester\\uploads',
      filename: 'uploaded_file-1622784110008-144449846',
      path: 'c:\\Users\\Rhie\\Desktop\\WORKSPACE\\CodeWorld\\GIT-REPO-ARCHIVE\\JS\\Playground.NodeJS\\tester\\uploads\\uploaded_file-1622784110008-144449846',
      size: 85055
    }
  ]
}
텍스트는 body로 받습니다.
```

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

# 08. MongoDB

## - 설치

https://docs.mongodb.com/manual/installation/

## - Mongo 데몬 실행

```sh
mongod --dbpath ./
```

## - Mongo 쉘 사용법

https://docs.mongodb.com/manual/reference/program/mongo/#mongodb-binary-bin.mongo

 - Mongo 쉘 사용

```sh
mongo
```

 - 데이터베이스 조회

```sh
show dbs
```

 - 데이터베이스 사용

```sh
use <database_name>
```

 - 사용중인 데이터베이스 위치

```sh
db
```

 - 컬랙션 조회

```sh
show collections
```

## - CRUD

https://docs.mongodb.com/manual/crud/

## - Node.js Driver

http://mongodb.github.io/node-mongodb-native/3.6/api/

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { MongoClient } = require("mongodb");

app.use('/static', express.static(path.join(__dirname, 'public')))

/*** 데이터베이스 연결 테스트 ***/
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("local").command({ ping: 1 });
    console.log("MongoDB server has received heart beat~!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/*** 데이터베이스 인스턴스 받기 ***/
let database;

function connectDB(){
  client.connect((err,db)=>{
    if(err) throw err;

    console.log("Connected successfully to MongoDB server");

    database = db;
  })
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  run().catch(console.dir);
  // connectDB();
})
```

## - Mongoose

https://mongoosejs.com/docs/guide.html

### * 꿀팁 from StackOverflow

```js
Through this line you are connected to mongoDB.

`const conn = mongoose.connect(dbRoute, { useNewUrlParser: true })`

and dbRoute = mongodb://DB-username:DBpassword@ds245901.mlab.com:44422/Database-Name";
Here is your data information

DB-username = your database user name.
DBpassword = your database password.
Database-Name = your database name.(which database you want to use).

No need to connect to your desired database like this 
const db = conn.db('test_db');
```


### * 간단한 사용법

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

app.use('/static', express.static(path.join(__dirname, 'public')))

const db_uri = 'mongodb://localhost:27017';
const db_name = 'local';

mongoose.connect(`${db_uri}/${db_name}`,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

/*** Create Schema ***/
const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean
})
const toySchema = new Schema();
toySchema.add({ name: 'string', color: 'string'}).add({price: 'number' });

/*** Create Model ***/
const Blog = mongoose.model('Blog', blogSchema);
const Toy = mongoose.model('Toy', toySchema);

app.get("/save/toys", function(req,res){
  const robot_toy = new Toy({name:"robot", color:"red",price:10000});
  robot_toy.validate((err)=>{
    if(err) throw err;
    console.log("validate status : good");
    robot_toy.save();
    console.log("database save : good");
    res.send("쓰기 성공");
  });
})

app.get("/find/toys", function(req,res){
  const toy_query = Toy.find();
  toy_query.exec(function(err, toy){
    if (err) return handleError(err);
    console.log(toy);
    res.send("읽기 성공")
  })
  
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
```


### * 로그인과 회원가입

 - `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/static/css/style.css">
  <title>Document</title>
</head>

<body>
  <h1>웹사이트</h1>

  <a href="/static/login.html">로그인 화면</a>
  <a href="/static/register.html">회원가입 화면</a>
  <script src="/static/js/script.js"></script>
</body>

</html>
```

 - `login.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/css/style.css">
    <title>login</title>
</head>
<body>
    <h1>LOGIN</h1>

    <form method="post" action="/process/login">
        <label for="id">아이디</label>
        <input type="text" name="id">
        <label for="pw">비밀번호</label>
        <input type="password" name="pw">

        <input type="submit" value="로그인" name="">
    </form>
    <script src="/static/js/script.js"></script>
</body>
</html>
```

 - `register.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/css/style.css">
    <title>register</title>
</head>
<body>
    <h1>회원가입</h1>

    <form method="post" action="/process/register">
        <label for="id">아이디</label>
        <input type="text" name="id">
        <label for="pw">비밀번호</label>
        <input type="password" name="pw">
        <label for="pw">비밀번호 확인</label>
        <input type="password" name="checkPw">
        <label for="username">이름</label>
        <input type="text" name="username">
        
        <input type="submit" value="가입신청" name="">
    </form>
    <script src="/static/js/script.js"></script>
</body>
</html>
```

 - `app.js`

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db_uri = 'mongodb://localhost:27017';
const db_name = 'local';

mongoose.connect(`${db_uri}/${db_name}`,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

/*** Create Schema ***/
const userSchema = new Schema({
  user_id:  String, // String is shorthand for {type: String}
  password: String,
  username: String,
  reg_date: { type: Date, default: Date.now },
},
{ collection: 'member' })

/*** Create Model ***/
const User = mongoose.model('Users', userSchema);

app.post("/process/register", function(req,res){
  const user = new User();
  console.log(req.body);
  user.user_id = req.body.id;
  user.password = req.body.pw;
  user.username = req.body.username;

  if(user.password !== req.body.checkPw){
    res.send("비밀번호가 일치하지 않음 : 회원가입 실패");
  }else{
    user.save();
    res.send("회원가입 성공");
  }
})

app.post("/process/login", function(req,res){
  const user_query = User.find();
  user_query.exec(function(err, user){
    if (err) return handleError(err);
    
    let isFail = true;
    let userInfo = null;
    let sendMsg = null;

    for(let i = 0; i < user.length; i++){
      if(user[i].user_id === req.body.id 
        && user[i].password === req.body.pw){
          console.log("로그인 성공");
          isFail = false;
          userInfo = user[i];
          break;
        }
    }
    
    if(isFail){
      sendMsg = "로그인 실패";
    }else{
      sendMsg = "로그인 성공";
    }
    console.log(userInfo);
    res.send(sendMsg);
  })
  
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
```


### * 암호화 `crypto`

 - 단방향 암호화 : 해쉬 사용 
   - pbkdf, bcrypt, scrypt (약함 <--- 상대적인 보안강도 ---> 강함)

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const crypto = require('crypto');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function base64encrypt(password, callback){
  crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64')
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) throw err;

      const encrypt_result = {
        saltVar: salt,
        hashVar: derivedKey.toString('hex')
      }

      console.log(encrypt_result);

      callback(encrypt_result);
    })
  })
}

const db_uri = 'mongodb://localhost:27017';
const db_name = 'local';

mongoose.connect(`${db_uri}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*** Create Schema ***/
const userSchema = new Schema({
  user_id: String, // String is shorthand for {type: String}
  password: String,
  username: String,
  salt: String,
  reg_date: { type: Date, default: Date.now },
},
  { collection: 'member' })

/*** Create Model ***/
const User = mongoose.model('Users', userSchema);

app.post("/process/register", function (req, res) {
  const user = new User();
  console.log(req.body);
  user.user_id = req.body.id;
  user.username = req.body.username;

  if (req.body.pw !== req.body.checkPw) {
    res.send("비밀번호가 일치하지 않음 : 회원가입 실패");
  } else {
    base64encrypt(req.body.pw, function(encrypt_result){
      user.salt = encrypt_result.saltVar
      user.password = encrypt_result.hashVar
      user.save();
      res.send("회원가입 성공");
    });
  }
})

app.post("/process/login", function (req, res) {
  const user_query = User.find();
  user_query.exec(function (err, user) {
    if (err) return handleError(err);

    console.log(`유저의 수: ${user.length}`)

    let saltVar = null;
    let origin_pw = null;
    let userInfo = null;
    
    for (let i = 0; i < user.length; i++) {
      if (user[i].user_id === req.body.id) {
        console.log("같은 ID 발견!!!");
        userInfo = user[i];
        break;
      }
    }

    saltVar = userInfo.salt;
    origin_pw = userInfo.password;

    crypto.scrypt(req.body.pw, saltVar, 64, (err, derivedKey) => {
      if (err) throw err;

      const hashVar = derivedKey.toString('hex');

      console.log(`DB에 저장되어 있는 PASSWORD : ${origin_pw}`)
      console.log(`사용자로부터 입력 받은 PASSWORD : ${hashVar}`)

      
      if (origin_pw === hashVar) {
        console.log("같다고 판단됨")
        res.send(`로그인 성공 : ${userInfo}`);
      }else{
        res.send("로그인 실패")
      }
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
```

<br><br><br><br><br>
<hr>
<br><br><br><br><br>

# 09.  웹 서버 심화


## - 모듈화

`exports`와 `module.exports`를 함께 사용하게 되면 `module.exports`가 우선 적용되고 `exports` 전역변수는 무시된다. 그래서 `module.exports`사용을 권장한다.

### * 분리 제안

 - `config.js`
    - 서버 정보
      - 포트
    - 데이터베이스 정보
      - file
      - collection
      - schemaName
      - modelName
    - 라우팅 정보
      - file
      - path
      - method
      - type  

### * 모듈화 연습

 - app.js

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const database = require('./database');
const security = require('./security');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/process/register", function (req, res) {
  const user = new database.UserModel();
  console.log(req.body);
  user.user_id = req.body.id;
  user.username = req.body.username;

  if (req.body.pw !== req.body.checkPw) {
    res.send("비밀번호가 일치하지 않음 : 회원가입 실패");
  } else {
    security.base64encrypt(req.body.pw, function(encrypt_result){
      user.salt = encrypt_result.saltVar
      user.password = encrypt_result.hashVar
      user.save();
      res.send("회원가입 성공");
    });
  }
})

app.post("/process/login", function (req, res) {
  const user_query = database.UserModel.find();

  user_query.exec(function (err, user) {
    if (err) return handleError(err);

    console.log(`유저의 수: ${user.length}`)

    let saltVar = null;
    let origin_pw = null;
    let userInfo = null;
    
    for (let i = 0; i < user.length; i++) {
      if (user[i].user_id === req.body.id) {
        console.log("같은 ID 발견!!!");
        userInfo = user[i];
        break;
      }
    }

    if(!userInfo){
      res.send("해당 아이디가 없습니다.")
    }


    saltVar = userInfo.salt;
    origin_pw = userInfo.password;

    security.base64decrypt(req.body.pw, origin_pw, saltVar, function(result){
      if (result) {
        console.log("같다고 판단됨")
        res.send(`로그인 성공 : ${userInfo}`);
      }else{
        res.send("비밀번호가 틀렸습니다. 실패")
      }
    });

  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
```

 - database.js

 ```js
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const db_uri = 'mongodb://localhost:27017';
const db_name = 'local';

mongoose.connect(`${db_uri}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*** Create Schema ***/
const UserSchema  = new Schema({
  user_id: String, // String is shorthand for {type: String}
  password: String,
  username: String,
  salt: String,
  reg_date: { type: Date, default: Date.now },
},
  { collection: 'member' })

UserSchema.path('user_id').validate(function(user_id){
  return user_id.length
}, "user_id column is not exist")

UserSchema.static('findAll',function(callback){
  return this.find({},callback);
})

/*** Create Model ***/
const UserModel = mongoose.model('Users', UserSchema );

module.exports.UserModel = UserModel;
 ```

 - security.js

```js
const crypto = require('crypto');

function base64encrypt(password, callback){
    crypto.randomBytes(64, (err, buf) => {
        const salt = buf.toString('base64')
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) throw err;

        const encrypt_result = {
            saltVar: salt,
            hashVar: derivedKey.toString('hex')
        }

        console.log(encrypt_result);

        callback(encrypt_result);
        })
    })
}

function base64decrypt(need_validate_password, origin_password, salt, callback){
    crypto.scrypt(need_validate_password, salt, 64, (err, derivedKey) => {
        if (err) throw err;
        
        const hashVar = derivedKey.toString('hex');
        
        console.log(`DB에 저장되어 있는 PASSWORD : ${origin_password}`)
        console.log(`사용자로부터 입력 받은 PASSWORD : ${hashVar}`)
        
        callback(origin_password === hashVar)

    })
}
    
module.exports.base64encrypt = base64encrypt;
module.exports.base64decrypt = base64decrypt;
```

## - 뷰 템플릿 (ejs, pug)

future work....... 지금 당장 필요성 못느끼겠고 좋아하는 방식이 아님

## - 패스포트(passport)

myPassport 참고

### * express-session

passport는 내부적으로 session을 사용하기 때문에 기본적인 session설정이 필요하다

### * serializeUser와 deserializeUser의 차이

아래 메소드는 꼭 있어야 passport가 작동한다.

 - `serializeUser`은 로그인 성공시 `done(null, user)`에서 (`passport.use()` 등으로 부터) 받은 `user`객체를 전달받아 `req.session.passport`세션에 저장합니다.
    - Strategy 성공시 호출됨

 - `deserializeUser`은 서버로 들어오는 요청마다 세션 정보(`req.user`)를 확인합니다. DB에 해당 세션정보가 있는지 확인하는 로직을 넣을 수도 있습니다.
    - 첫번째 매개변수는 `req.session.passport.user`에 저장된 값

### * 모듈화 제안

 - 패스포트 설정 파일
 - 라우팅 함수를 별도 파일로 분리
 - 메인 파일 수정

#### example

`config/passport.js`

```js
var local_login = require('./passport/local_login');
var local_signup = require('./passport/local_signup');
var facebook = require('./passport/facebook');

module.exports = function(app, passport) {
  console.log('config/passport.js 호출됨');

  // 사용자 인증 성공 시 호출
  passport.serializeUser(function(user, done) {
  	console.log('serializeUser() 호출됨.');
  	console.dir(user);

      done(null, user);
  });

  // 사용자 인증 이후 사용자 요청이 있을 때마다 호출
  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser()  호출됨');
    console.dir(user);

    // 사용자 정보 중 id나 email만 있는 경우 사용자 정보 조회 필요 - 여기에서는 user 객체 전체를 패스포트에서 관리
    done(null, user);
  });

  // 인증방식  local-signup
  passport.use('local-login', local_login);
  passport.use('local-signup', local_signup);
  passport.use('facebook', facebook(app, passport));
};
```
이곳에는 passport에 필요한 serializeUser와 deserializeUser를 설정하고 필요한 Strategy는 또 모듈화하여 보관한다.

 - `config/passport/facebook.js`
 - `config/passport/local_login.js`
 - `config/passport/local_signup.js`