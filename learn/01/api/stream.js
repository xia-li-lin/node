const fs=require('fs')
const rs=fs.createReadStream('./images/01.jpg')
const ws=fs.createWriteStream('./images/02.jpg')
rs.pipe(ws)