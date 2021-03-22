# `[9] 비동기적 JS 활용`

<br><br><br><br><br>


## 1. JS 메모리
![JS-Memory.png](./mdsrc/JS-Memory.png)
<br><br><br><br><br>
[loupe에서 확인해보기](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)


## 2. setInterval(), setTimeout()
함수를 지금 당장이 아닌, 나중에 호출하고 싶을 때 크게 두가지 방법이 있다.
 - `setTimeout` : 지정한 interval만큼의 시간이 한번 지나면 함수를 실행
 - `setInterval` : 처음 Interval만큼의 시간 후 실행 한 후, 그것을 반복한다. (setTimeout의 반복)

### setTimeout()
```js
function sayHi() {
alert('Hello');
}
setTimeout(sayHi, 1000);
```
```js
function sayHi(phrase, who) {
alert( phrase + ', ' + who );
}
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John

```
#### clearTimeout()
```js
let timerId = setTimeout(() => alert("3초가 지났어"), 3000);
clearTimeout(timerId);
console.log(timerId); //undefined
```

### setInterval()
```js
// repeat with the interval of 2 seconds
let timerId = setInterval(() => alert('tick'), 2000);
```
#### clearInterval()
```js
// after 5 seconds stop
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

### 중첩 setTimeout

무엇인가를 반복적으로 실행하고자 할때 사실 다른 방법을 쓸 수도 있다.

```js
/* instead of:
let timerId = setInterval(() => alert('tick'), 2000); */
let timerId = setTimeout(function tick() {
alert('tick');
timerId = setTimeout(tick, 2000); // (*)
}, 2000);
```
이와 같은 구현은 setInterval보다 좀더 유연한 형태를 보인다. 예를 들어 실행하고자 하는 것이 cpu를 많이 잡아먹는다면, 소요 시간을 측정한 후 그 다음 실행에 대해 계획할 수 있다.
```js
//Sample Usage, note executable

let delay = 5000;
let timerId = setTimeout(function request() {
...send request...
if (request failed due to server overload) {
  // increase the interval to the next run
  delay *= 2;
}
timerId = setTimeout(request, delay);
}, delay);
```

또한 Nested setTimeout은 setInterval보다 더 정확하게 실행 사이의 간격을 설정할 수 있다.
```js
//Sample Usage, note executable
let i = 1;
setInterval(function() {
    func(i++);
}, 100);
```
etInterval을 통해 불러오는 func의 호출 간 실제 딜레이는 코드에서 정한 것보다 짧다! 이건 정상이다. 왜냐하면 func의 실행으로 소요되는 시간은 해당 간격의 일부를 소비하기 때문이다.
func의 실행이 길어지면 우리가 예상했던 100ms보다 더 늦어질 수도 있다.
```js
//Sample Usage, note executable
let i = 1;
setTimeout(function run() {
    func(i++);
    setTimeout(run, 100);
}, 100);
```
setTimeout은 매 실행 간의 고정된 delay를 보장한다. (함수 실행 시간과 무관하게)
당연한 것이기도 하다. 각 함수가 끝난 이후에야 새로 함수가 호출되니깐.

<br><br><br><br><br>


## 3. callback 함수
```js
console.log("Start");
for(var i = 0 ; i < 10; i++){
    setTimeout(()=>{console.log(i)}, 2000)
}
console.log("End");
```
우리가 기대하는 `1,2,3,4....`같이 출력되는 것과 달리 `10, 10, 10, 10...`으로 10번 출력되는 것을 볼 수 있다. 그 이유는  setTimeout()이 호출되기 전에 이미 for문이 다 돌았기 때문이다.

또한 `console.log("End");`까지 이미 도달하여 출력이되었다. 콜백함수로 비동기 처리 방식의 문제를 해결해보자

```js
var forFactor = {
    i : 0,
    init : function(){
        this.i = 0
    },
    condition : function(){
        return this.i < 9
    },
    increment : function(){
        this.i++;
    }
}
function exeForDelayOneSec(forFactor, callback){
    setTimeout(function(){
        if(forFactor.condition()){
            forFactor.increment();
            console.log(i)
            console.log(forFactor);
            exeForDelayOneSec(forFactor, callback);
        }else{
            callback();
        }
    },1000)
}
console.log("Start");
exeForDelayOneSec(forFactor, function(){
    console.log("End");
})
```
[콜백지옥](https://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
<br><br><br><br><br>


## 4. Promise
new Promise()
```js
let foo = new Promise((resolve, reject) => {resolve('foo')})
foo.then(value => console.log(value)) // foo
```

Promise.resove
```js
let foo = Promise.resolve('foo')
foo.then(value => console.log(value)) // foo
```

Promise, setTimeout
```js
let myFirstPromise = new Promise((resolve, reject) => {  
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.

  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 1000);
});

myFirstPromise.then((successMessage)=>{
    console.log(`Oh Yeah! ${successMessage}`);
})
```
### Chaining 체이닝
Promise는 체이닝 될 수 있습니다.
```js
let hello1 = new Promise(resolve => resolve("hello1"))

hello1.then(val1 => {
  console.log(val1);
  return "hello2"
}).then(val2 => {
  console.log(val2);
  return "hello3"
}).then(val3 => {
  console.log(val3)
})
// hello1
// hello2
// hello3
```
이전 단계의 then에서 return을 통해 값을 넘겨주어야, 그 다음의 then에서 매개변수로 받을 수 있다. return을 하지 않는 경우에 매개변수는 undefined가 된다.


만약 비동기 작업의 결과가 부적합하다면, 그것을 resolve하는 대신, reject 할 수 있다.
```js
let fooReject = new Promise((resolve, reject) => {reject('foo rejected')})
fooReject // Uncaught (in promise) foo rejected
```
catch역시 가져야한다.
```js
let foo = new Promise((resolve, reject) => {reject('Error!!!')})
foo
.then(value => console.log(`resolve : ${value}`))
.catch(err => console.log(err)) //Error!!!

```

[Promise 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Using Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises)

<br><br><br><br><br>


## 5. async/await
1. async
```js
function fetchUser(){
    //오래걸리는 것
    return "rhie";
}

const user = fetchUser();
console.log(user);
```
JS는 동기적으로 수행하기 때문에 fetchUser()가 값을 return할 때까지 기달리게 될 것이다. 그렇기 때문에 비동기적인 처리를 해야 한다.

`Promise`
```js
function fetchUser(){
    return new Promise((resolve, reject)=>{
            resolve("rhie");
    })
}
const user = fetchUser();
user.then((data)=>console.log(data)); //rhie
```

`async` : 이 키워드로 쓰면 Promise로 바뀐다.
```js
async function fetchUser(){
    return 'rhie';
}
const user = fetchUser();
user.then((data)=>console.log(data)); //rhie
```

`await` : async 함수 안에서만 사용 가능
```js
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getUser(){
    await delay(3000);
    return "user-info";
}

async function getAPI(){
    await delay(3000);
    return "api-data";
}

function showAll(){
    return getUser().then(user=>{
        return getAPI().then(api=> `${user} + ${api}`);
    });
} // 코드가 정갈하지 않음

showAll().then(result => console.log(result)); //6초 기달려하함
```
개선하기
```js
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getUser(){
    await delay(3000);
    return "user-info";
}

async function getAPI(){
    await delay(3000);
    return "api-data";
}

async function showAll(){
    const user = await getUser();
    const api = await getAPI();
    return `${user} + ${api}`;
}

showAll().then(result => console.log(result));
```
에러처리하기
```js
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getUser(){
    await delay(3000);
    throw 'error';
    return "user-info";
}

async function getAPI(){
    await delay(3000);
    return "api-data";
}

async function showAll(){
    try{
        const user = await getUser();
        const api = await getAPI();
        return `${user} + ${api}`;
    }catch(e){
        return e;
    }
}

showAll().then(result => console.log(result));
```
user와 api는 서로 연관이 없음

<br><br><br><br><br>

