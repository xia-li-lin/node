const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    // console.log('request:',getPrototypeChain(request));
    // console.log('response:',getPrototypeChain(response));

    const { url, method, headers } = request;
    if (url === '/' && method === 'GET') {
        fs.readFile('./pages/index.html', (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain;charset:utf-8' });
                response.end('500 服务器出错拉~~');
                return;
            }

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        });
    } else if (url === '/users' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify([
            { name: 'Janice', sex: 'women' },
            { name: 'Micky', sex: 'man' },
            { name: 'Ann', sex: 'women' }
        ]));
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.'+url).pipe(response);
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain;charset=utf-8');
        response.end('404 页面找不到啦');
    }
});

server.listen(8090);

// 打印原型链
function getPrototypeChain(obj) {
    const protoChain = [];
    while (obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj);
    }
    return protoChain;
}