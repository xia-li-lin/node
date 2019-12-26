module.exports.clone = async function(repo, dest) {
    const { promisify } = require('util');
    const download = promisify(require('download-git-repo'));
    const ora = require('ora');
    const process = ora();
    process.start('项目下载...');

    try {
        await download(repo, dest);
    } catch (err) {
        process.fail();
    };
    process.succeed();
}
