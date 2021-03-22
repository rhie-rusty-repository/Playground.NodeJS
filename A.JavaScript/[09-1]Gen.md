컬렉션을 반복하는 방법 = Generator

# 반복자(Iterator)
 - 시퀀스 정의
 - 종료시의 반환값을 잠재적 정의
 - `value`, `done`을 반환하는 **next()** 메소드 사용
 - 마지막 값을 산출하고나서  next()를 추가적으로 호출하면 `{done: true}` 가 반환

```js
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    var nextIndex = start;
    var n = 0;
    
    var rangeIterator = {
       next: function() {
           var result;
           if (nextIndex < end) {
               result = { value: nextIndex, done: false }
           } else if (nextIndex == end) {
               result = { value: n, done: true }
           } else {
               result = { done: true };
           }
           nextIndex += step;
           n++;
           return result;
       }
    };
    return rangeIterator;
}
```
사용해보기
```js
var it = makeRangeIterator(1, 4);

var result = it.next();
while (!result.done) {
 console.log(result.value); // 1 2 3
 result = it.next();
}

console.log("Iterated over sequence of size: ", result.value);
```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators