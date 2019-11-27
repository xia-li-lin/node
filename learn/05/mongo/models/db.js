const conf = require('./conf')
const EventEmitter = require('events').EventEmitter

// 客户端
const MongoClient = require('mongodb').MongoClient

class Mongodb {
    constructor(conf) {
        this.conf = conf

        this.emmiter = new EventEmitter()
        this.client = new MongoClient(conf.url, { useNewUrlParser: true })
        this.client.connect(err => {
            if (err) throw err
            this.emmiter.emit('connect')
        })
    }

    col(colName, dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName)
    }

    once(event, callback) {
        this.emmiter.once(event, callback)
    }
}

module.exports=new Mongodb(conf)