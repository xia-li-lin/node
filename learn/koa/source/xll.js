const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class XLL {
    use(callback) {
        this.callback = callback
    }

    // 构建上下文
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }

    listen(...args) {
        const server = http.createServer((req, res) => {
            // 创建上下文
            let ctx=this.createContext(req,res)
            this.callback(ctx)
            res.end(ctx.body)
        })

        server.listen(...args)
    }
}

module.exports = XLL