const express = require('express')
const app = express()
app.use(express.static(__dirname + '/'))
// 反向代理
const proxy=require('http-proxy-middleware')
app.use('/api',proxy({
    target:'http://localhost:4000'
}))
module.exports = app
