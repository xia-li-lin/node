const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const { url, method, headers } = req
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            console.log(err)
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
                res.end('500,服务器出错')
                return
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url === '/user' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify([{ name: 'Janice', age: 30, school: '海南经贸职业技术学院' }]))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('./' + url).pipe(res)
    } else {
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end('404,页面没找到')
    }
})

server.listen(8888)