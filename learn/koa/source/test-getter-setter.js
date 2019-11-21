const xialilin = {
    info: {
        name: '~\(≧▽≦)/~啦啦啦'
    },
    get name() {
        return this.info.name;
    },
    set name(val) {
        console.log('set name is ' + val)
        return this.info.name = val
    }
}

console.log(xialilin.name)
xialilin.name = 'Janice'
console.log(xialilin.name)