const fs = require('fs');
const rs = fs.createReadStream('./assets/images/Hydrangeas.jpg');
const ws = fs.createWriteStream('./assets/images/Hydrangeas-copy.jpg');
rs.pipe(ws);
