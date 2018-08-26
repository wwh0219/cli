#!/usr/bin/env node
const program = require('commander')
const ora = require('ora')
const ask = require('./ask')
const download = require('./download')
const packageJson = require('../package.json')
const fs = require('fs')
const log = require('../util/chalk')
const compile = require('./compile')
const install = require('./install')
const run = require('./run')
const {pageBoilerplate} = require('./constant')
//  项目初始化
program
  .version(`当前版本:${packageJson.version}`)
  .command('init <name>')
  .option('-r, --no-recursive', 'Remove recursively')
  .action(async (name, cmd) => {
    if (fs.existsSync(name)) {
      log.error('项目已存在')
      return process.exit(1)
    }
    let anwsers = await ask()
    anwsers.name = name
    const spinner = ora('正在下载模板...')
    spinner.start()
    await download(anwsers)
    await compile(anwsers)
    spinner.succeed('初始化完成')
    if (anwsers.packageManag) {
      spinner.start('正在安装依赖')
      await install(anwsers)
      spinner.stop('启动服务')
      run(anwsers)
    }
  })
//  新建页面
program
  .command('mk-page <name>')
  .action(async (name, cmd) => {
    const dir = `src/pages/${name}`
    if (fs.existsSync(dir)) {
      log.error('项目已存在')
      return process.exit(1)
    }
    const spinner = ora('正在下载模板...')
    spinner.start()
    await download({template: pageBoilerplate, name: dir})
    await compile({name: dir})
    spinner.stop('页面初始化完成')
  })
program.parse(process.argv)
