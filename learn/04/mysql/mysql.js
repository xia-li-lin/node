(async () => {
    const mysql = require('mysql2/promise')
    // 连接配置
    const cfg = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'kaikeba'
    }

    const connection = await mysql.createConnection(cfg)
    // console.log(connection)

    // 创建表
    const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test(
        id INT NOT NULL AUTO_INCREMENT,
        message VARCHAR(45) NULL,
        PRIMARY KEY(id)
    )`
    const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`
    const SELECT_SQL=`SELECT * FROM test`

    let ret = await connection.execute(CREATE_SQL)
    ret = await connection.execute(INSERT_SQL, ['abc'])
    const [rows,fields]=await connection.execute(SELECT_SQL)
    console.log(ret)
    // console.log(JSON.stringify(rows,'','\t'))
    console.log(fields)
})()