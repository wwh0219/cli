const {spawn} = require('child_process')
module.exports = ({name, ...anwsers}) => {
  return new Promise((resolve, reject) => {
    if (!anwsers.packageManag) {
      return resolve()
    }
    const ls = spawn(`cd ${name} && ${anwsers.packageManag} install`, {shell: true})
    ls.stdout.on('data', (data) => {
      console.log(`${data}`)
    })
    ls.stderr.on('data', (data) => {
      console.log(`${data}`)
    })
    ls.on('close', resolve)
  })
}
