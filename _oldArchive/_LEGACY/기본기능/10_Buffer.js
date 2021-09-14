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
