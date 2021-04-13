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