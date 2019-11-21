// const http=require('http')

// const server=http.createServer((req,res)=>{
//     res.writeHead(200)
//     res.end('Hello World!!!')
// })

// server.listen(8888,()=>{
//     console.log('ok')
// })

const XLL = require('./xll')
const app = new XLL()
// app.use((req,res)=>{
//     console.log(req)
//     console.log('----------------------------------')
//     console.log(res)
//     res.writeHead(200)
//     res.end('xll')
// })

app.use((ctx,next) => {
    ctx.body = 'lalalalala'
})

app.use((ctx,next ) => {
    ctx.body = 'wwwwweeeeeeee'
})

app.listen(3000, () => {
    console.log('listen 3000')
})