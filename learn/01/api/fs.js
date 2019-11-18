const fs=require('fs')

// 同步操作
// const data=fs.readFileSync('./download.js')
// console.log(data) // 把二进制变成了十二进制
// console.log(data.toString())

// 异步操作
const data=fs.readFile('./index.js',(err,data)=>{
    if(err){
        throw err
    }
    console.log(data.toString())
})