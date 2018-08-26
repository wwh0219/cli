const glob = require('glob')
const fs = require('fs')
const handlebars = require('handlebars')
module.exports = ({name, ...answers}) => {
  const files = glob.sync(`${name}/**`)
  const meta = {
    name,
    description: answers.description,
    author: answers.author
  }
  files.forEach(fileName => {
    try {
      const content = fs.readFileSync(fileName).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(fileName, result)
    } catch (e) {
      // console.log(e)
    }
  })
}
