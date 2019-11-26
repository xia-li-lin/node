(async () => {
    const Sequelize = require('sequelize')

    // 建立连接
    const sequelize = new Sequelize('kaikeba', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit', {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
            timestamps: false,
            tableName: 'TBL_FTUITS'
        })

    // 同步数据库
    // let ret = await Fruit.sync({force:true})
    let ret = await Fruit.sync({ force: true })
    ret = await Fruit.create({
        name: '香蕉',
        price: 3.5
    })

    ret = await Fruit.update(
        {
            price: 4
        },
        {
            where: { name: '香蕉' }
        }
    )

    const Op = Sequelize.Op
    ret = await Fruit.findAll({
        where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
    })
    console.log(JSON.stringify(ret, '', '\t'))
})()