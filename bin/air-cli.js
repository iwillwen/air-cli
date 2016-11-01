#!/usr/bin/env node --harmony
const program = require('commander')
const package = require(__dirname + '/../package.json')
const path = require('path')
const inquirer = require('inquirer')

const air = require('../lib/air')

// air-cli Version
program.version(package.version)

program
  .command('init <app_name>')
  .description('Init an AirApp project into the directory')
  .action(projectPath => {
    inquirer.prompt([
      {
        name: 'appName',
        message: 'AirApp Name',
        default: projectPath
      },
      {
        name: 'version',
        message: 'Version',
        default: '1.0.0'
      },
      {
        name: 'description',
        message: 'Description'
      },
      {
        type: 'checkbox',
        name: 'compatibility',
        message: 'Platform compatibility',
        choices: [
          {
            name: 'iOS',
            value: 'ios',
            checked: true
          },
          {
            name: 'Android',
            value: 'android',
            checked: true
          },
          {
            name: 'Web',
            value: 'web'
          }
        ]
      },
      {
        name: 'keywords',
        message: 'Keywords(separate with comma)'
      },
      {
        name: 'author',
        message: 'Author'
      },
      {
        name: 'main',
        message: 'Entry file',
        default: 'index.js'
      },
      {
        name: 'license',
        message: 'License',
        default: 'MIT'
      }
    ])
      .then(answers => {
        air.initApp(answers, projectPath)
      })
  })

program
  .command('list')
  .description('List all created AirApps')
  .action(() => air.listApps())

program
  .command('info <app_name>')
  .description('Get detail infomation about an AirApp')
  .action(name => air.appInfo(name))

program
  .command('permission [permission_key]')
  .description('Get or update AirApp native permissions')
  .option('-a --list_all', 'List all available permissions')
  .action((permissionKey, options) => {
    if (options.list_all) {
      return air.listAllPermissions()
    }
  })

program.parse(process.argv)

process.on('unhandledRejection', () => false)