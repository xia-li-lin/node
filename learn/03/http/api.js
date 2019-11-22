const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {
    const { url, method } = req
    res.setHeader('Set-Cookie','name=cookieJanice')
    console.log('cookie',req.headers.cookie)
    console.log(url, method)
    if (url == '/' && method == 'GET') {
        fs.readFile('./index.html', (err, data) => {
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url == '/api/users' && (method == 'GET' || method == 'POST')) {
        res.setHeader('Content-Type', 'application/json')
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        // res.setHeader('Access-Control-Allow-Credentials','true')
        res.end(JSON.stringify([{ name: 'Janice', age: 21 }]))
    } else if (method == 'OPTIONS') {
        // res.setHeader('Access-Control-Allow-Credentials','true')
        // res.writeHead(200, {
        //     'Access-Control-Allow-Origin': 'http://localhost:3000',
        //     'Access-Control-Allow-Headers': 'x-Token,Content-Type',
        //     'Access-Control-Allow-Methods': 'PUT'
        // });
        res.end();
    }else if(method=='POST' && url=='/api/save'){   // 通过流进行输出
        let reqData=[]
        let size=0
        req.on('data',data=>{
            console.log('------------------>req on data',data)
            reqData.push(data)
            size+=data.length
        })
        req.on('end',()=>{
            console.log('----------------->end')
            const data=Buffer.concat(reqData,size)
            console.log('data:',size,data.toString())
            res.end(`formData:${data.toString()}`)
        })
    }
})

module.exports = app
