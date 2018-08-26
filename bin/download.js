const {promisify} = require('util')
const download = promisify(require('download-git-repo'))
module.exports = async ({name, ...answers}) => {
  await download(answers.template, `${name}`)
}
