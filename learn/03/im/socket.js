// TCP协议 - 实现一个即时通讯IM
const net = require('net')
const chatServer = net.createServer()
const clientList = []
chatServer.on('connection',client => {
  client.write('Hi!\n')
  clientList.push(client)
  client.on('data',data => {
    console.log('receive:',data.toString())
    clientList.forEach(v => {
      v.write(data)
   })
 })
})
chatServer.listen(8888)
