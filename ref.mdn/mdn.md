# JavaScript 안내서

## - 문법과 자료형

### 세미콜론
```js
var 갑을 = "병정";
```

### 주석

```js
// 한 줄 주석

/* 이건 더 긴,
 * 여러 줄 주석입니다.
 */
```

### 선언

```js
var
let
const
```
 - undefined and null

 - var, let const와 호이스팅

ECMAScript 6 이전의 JavaScript는 block 문 범위가 없습니다. 그래서 오히려, 블록 내에 선언된 변수는 그 블록 내에 존재하는 함수(혹은 전역 범위)에 지역적입니다. 예를 들어서 아래의 코드는 5라는 로그를 남깁니다. x의 범위가 이 경우 if문 블록이 아니라 x가 선언된 함수(나 전역 문맥)이기 때문입니다.

```js
if (true) {
  var x = 5;
}
console.log(x); // 5
```

ECMAScript 6에 도입된 let 선언을 사용했을 때, 이 동작은 바뀌었습니다.

```js
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined
```

 - 전역변수와 지역변수

전역 변수는 사실 global 객체의 속성(property)입니다. 웹 페이지에서 global 객체는 window 이므로, windows.variable 구문을 통해 전역 변수를 설정하고 접근할 수 있습니다.

 - 변수와 상수 자료형, 리터럴의 개념

 - 자료형 변환 ( 캐스팅 )

`parseInt()`, `parseFloat()`, `+` 단항 더하기

 - 이스케이프 문자(특수문자)

<br>
<br>
<br>

## - 제어 흐름과 에러 처리

### Block 문

### 조건문

 - if~else if~else
 - 조건식에 할당 

```js
if ((x = y)) {
  /* statements here */
}
```
 - 거짓으로 취급

false

undefined

null

0

NaN

the empty string ("")

 - switch 문

### 예외 처리문

 - throw, try~catch~finally

### Promise 비동기식 연산

<br>
<br>
<br>

## - 루프와 반복

for 문

do...while 문

while 문

레이블 문

break 문

continue 문

for...in 문

for...of 문


<br>
<br>
<br>

## 함수

함수 선언

함수 표현식

함수 호출

함수의 범위

클로저

argument 객체

<br>
<br>
<br>
<br>
<br>
<hr>
<br>
<br>
<br>
<br>
<br>

