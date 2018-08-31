const inquirer = require('inquirer')
const {projectBoilerplates} = require('./constant')
module.exports = () => {
  return inquirer.prompt([
    {
      name: 'description',
      message: '请输入项目描述'
    },
    {
      name: 'template',
      message: '选择一个模版类型',
      type: 'list',
      choices: projectBoilerplates
    },
    {
      name: 'author',
      message: '请输入作者名称'
    },
    {
      name: 'packageManag',
      message: '安装依赖？',
      type: 'list',
      choices: [
        {
          name: 'npm',
          value: 'npm'
        },
        {
          name: 'yarn',
          value: 'yarn'
        },
        {
          name: '不需要',
          value: false
        }
      ]
    }
  ])
}
