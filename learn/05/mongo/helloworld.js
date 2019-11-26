(async () => {
    const { MongoClient: MongoDB } = require('mongodb')

    // 创建客户端
    const client = new MongoDB('mongodb://localhost:27017', { useNewUrlParser: true })
    let ret = await client.connect()

    const db = client.db('test')
    const fruits = db.collection('fruits')

    // 添加文档
    ret = await fruits.insertOne({
        name: '葡萄',
        price: 3.5
    })

    // 查询文档
    ret=await fruits.find()
    
    // 更新文档
    ret=await fruits.updateOne({name:'葡萄'},{$set:{name:'荔枝'}})

    // 删除文档
    // ret=await fruits.deleteOne({name:'荔枝'})
    ret=await fruits.deleteMany({name:'荔枝'})
    console.log(JSON.stringify(ret.result))

    client.close()
})()