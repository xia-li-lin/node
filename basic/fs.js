const fileName = './download.js';
const fs = require('fs');

// 同步操作
// const data = fs.readFileSync('./download.js');
// console.log(data.toString());

// 异步操作
fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});