


```js
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = 'not a number' / 2;

const num = 10 // over number의 범의 (-2**53 ~ 2**53)
```

```js
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); //false
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2); //true
console.log(`value: ${symbol1}, type: ${typeof symbol1}`); //Error
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`); //.description을 써야함
```
특수문자열
```js
console.log(0 == false); //true
console.log(0 === false); //false
console.log(null == undefined); //true
console.log(null === undefined); //false
```
loose equality, strict equality

자바스크립트는 선언된 것을 엔진이 젤 위로 올려준다. 단, 각 스코프에 맞게(?)

```js
const printNo = function print(){
    console.log("stack trace(디버깅)시 함수이름을 체크하기 위해");
}
```

getter와 setter는 멍청함을 덜어준다.

커피 자판기에 커피 갯수가 -1개? 말이 안됨. setter로 컨트롤해주자
```js
class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age(){
        return this._age;
    }

    set age(value){
        this._age = value < 0 ? 0 : value;
    }
}
```
_age이어도 age에 할당하거나 age로부터 값을 받을 수 있는 것은 getter와 setter의 이름이 age이기 때문이다.

```js
class PrivateAndPublic{
    publicField = 2;
    #privateField = 0;
}
const pp = new PrivateAndPublic();
console.log(pp.publicField); //2
console.log(pp.privateField); //undefined

너무 최신이라 그런지 지원되는 브라우저가 적다.
사용하기엔 너무 이르다.
```

오버라이딩

toString() 오버라이딩

```js
//Property value shorthand
//key와 value가 같으면 생략가능
function makePerson(name, age){
    return {
        name : name,
        age: age,
    }
}

function makePerson2(name, age){
    return {
        name,
        age,
    }
}
```
```js
// Constructor function
function Person(name, age){
    //this = {};
    this.name = name;
    this.age = age;
    //return this;
}

let p = new Person("rhie", 20)

//키가 있냐 없냐
console.log('name' in p); //true
console.log('spec' in p); //false
console.log(p.spec); //undefined
```

```js
// 오래된 방식
const userCopy = {};
for (key in user){ //user is original var
    userCopy[key] = user[key];
}
console.log(userCopy); //주소가 다른 객체 생성됨

// 이렇게 사용하자
const newUser ={};
Object.assign(newUser, user);
console.log(newUser); //주소가 다른 객체

const newUser2 = Object.assign({}, user);
console.log(); //주소가 다른 객체

//Object.assign({}, obj1, obj2);
//중복된 key는 뒤에가 우선
```
for문에서 조건문은 문지기다.

shift-unshift는 pop-push보다 느리다

배열에 includes 추가되어있나?

indexOf <---> lastIndex : 앞에서부터, 뒤에서부터

find(), splice()

잠깐 filter()랑 find()의 차이..?

reduce() , initial value 존재

reduceRight()

```js
function Student(name, age, enrolled, score){
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
}

const students = {
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88)
}

{
    const result = students
        .map((student)=>student.score)
        .filter((score)=>score>=50)
        .join();
    console.log(result);
}

{
    const result =students
        .map((student)=>student.score)
        .sort((a, b)=>b-a)
        .join();
    console.log(result);
}
```
javaScript is synchronous.
```js
class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(()=>{
            if(
                (id === 'rhie' && password ==='dream') ||
                (id === 'coder' && password ==='academy')
            ){
                onSuccess(id);
            }else{
                onError(new Error('not found'));
            }
        }, 2000)
    }

    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if(user ==='rhie'){
                onSuccess({name:'rhie', role: 'admin'});
            }else{
                onError(new Error('on access'));
            }
        }, 1000)
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(
                    `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
                )
            },
            error => {
                console.log(error);
            }
        )
    },
    error => {
        console.log(error);
    }
)

```

```js
//state : pending --> fulfilled or rejected
//producer
//When new Promise is created, the executor runs automatically.
const promise = new Promise(resolve, reject) =>{
    console.log("do Something,,,");
    setTimeout(()=>{
        resolve('rhie');
    }, 2000);
}
//consumer : then, catch, finally
promise
.then(value=>{
    console.log(value);
})
.catch(error=>{
    console.log(error);
})
.finally(()=>{
    console.log('finally');
})

//promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(()=>resolve(1), 1000);
});

fetchNumber
.then(num => num * 2)
.then(num => num * 3)
.then(num => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(num-1), 1000);
    })
})
.then(new => console.log(num)); //5
```

```js
//Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve("닭"), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => 계란`), 1000);
    });
const getEgg = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 후라이드`), 1000);
    });

getHen() //콜백함수를 전달할 때 받아오는 value를 바로 하나를 호출하는 경우 생략할 수 있다. 매개변수를 말하는 것이다. 암묵적으로 호출해준다.
    .then(getEgg) //.then(hen => getEgg(hen))
    .then(egg) //.then(egg => cook(egg))
    .then(console.log); //.then(meal => console.log(meal));
```














# vscode 쓸만한 Extenstion
```
Material Theme
Prettier => Tab : 2, sing quote
Bracket Pair Colorizer
indent Rainbow
auto rename tag
css peek
HTML CSS Support
HTML to CSS autocompletion
Live Server
github Markdown Preview
REST Client
Emmet 내장
```
# 프론트 사이트
jsFiddle.net

jsbin.com

codesandbox.io

## JSON

jsondiff.com

jsonbeautifier.org

jsonparser.org

json validator

