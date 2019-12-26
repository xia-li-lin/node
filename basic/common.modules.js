/**
 * 常用模块：
 * 核心模块：直接用。 如：Buffer,module,process
 * 内置模块：不需要install,但需要用require引入。
 * 第三方模块
 */
//! 内存占有率
const os = require('os');
const mem=os.freemem() / os.totalmem() *100;

console.log(`内存占用率：${mem.toFixed(2)}%`);