const { min, AirApp } = require('./store')
const AirShellUtils = require('./air-shell')
const permissions = require('./permissions').permissions
const permissionsKeys = require('./permissions').permissionsKeys

const path = require('path')
const defaultDependencies = require('../package.json').defaultDependencies
const chalk = require('chalk')
const figures = require('figures')
const fs = require('fs')

// Init AirApp
function initApp(appInfo, rootPath) {
  const absoluteRootPath = path.resolve(process.cwd(), rootPath)

  AirShellUtils.downloadLatestShell()
    .then(zipFileName => {
      process.stdout.write(`Creating AirApp project directory '${rootPath}'...`)
      return AirShellUtils.unzipAirShellTo(zipFileName, absoluteRootPath)
    })
    .then(() => {
      appInfo.keywords = appInfo.keywords.split(',').filter(Boolean)
      
      const airapp = new AirApp({
        rootPath: absoluteRootPath,
        name: appInfo.appName,
        version: appInfo.version,
        description: appInfo.description,
        main: appInfo.main,
        keywords: appInfo.keywords,
        author: appInfo.author,
        'air:compatibility': appInfo.compatibility
      })

      const packageJSON = {
        name: appInfo.appName,
        version: appInfo.version,
        description: appInfo.description,
        main: appInfo.main,
        dependencies: defaultDependencies,
        keywords: appInfo.keywords,
        author: appInfo.author,
        license: appInfo.license,
        air: {
          compatibility: appInfo.compatibility,
          permissions: {}
        }
      }

      airapp.once('ready', () => {
        fs.writeFileSync(path.join(absoluteRootPath, 'package.json'), JSON.stringify(packageJSON, null, 2) + '\n')
        console.log(`${chalk.bold.white('done')}\nPlease change your workdir to '${rootPath}'.\n ${chalk.bold.green('$') + chalk.bold.white(` cd ${rootPath}`)}`)
        process.exit(0)
      })
    })
}

function formatPair(key, value) {
  return `${chalk.bold.white(key)}: ${value}`
}

function prettyPlatformName(name) {
  const platforms = {
    'ios': 'iOS',
    'android': 'Android',
    'web': 'Web'
  }

  return platforms[name]
}

// Get detail infomations of an AirApp
function appInfo(name) {
  AirApp.search('name', name)
    .then(results => {
      if (results.length === 0) {
        return console.log(`The '${name}' AirApp is not exists.`)
      }

      const app = results[0]
      const info = app.getCacheData()

      console.log(formatPair('App Name', name))
      console.log(formatPair('Version', info.version))
      console.log(formatPair('Project Path', info.rootPath))
      console.log(formatPair('Description', info.description))
      console.log(formatPair('Keywords', info.keywords.join(',')))
      console.log(formatPair('Author', info.author))
      console.log(formatPair('Compatibility', info['air:compatibility'].map(prettyPlatformName)))
      console.log('')

      const permissionsKeys = Object.keys(info)
        .filter(n => n.match(/^air:permission/))
        .filter(n => info[n] && (Array.isArray(info[n]) && info[n].length > 0))
        .map(n => n.substr(16))
        .map(n => permissions[n])

      if (permissionsKeys.length > 0) {
        console.log(chalk.bold.white('Following are permissions that this app needs.'))
        console.log(permissionsKeys.join(','))
      }

      process.exit(0)
    })
}

// List all created AirApps
function listApps() {
  AirApp.dump()
    .then(apps => {
      if (apps.length > 0) {
        console.log('All created AirApps:\n')

        for (const app of apps) {
          console.log(`  ${chalk.white(`${figures.bullet} ${app.name}@${app.version}`)} - ${app.rootPath}`)
        }

        console.log('')
      } else {
        console.log('You have not create any AirApp yet.')
        console.log('You can create one by')
        console.log(`${chalk.bold.green('$')} air init <app_name>`)
      }
      process.exit(0)
    })
}

// List all available permissions
function listAllPermissions() {
  console.log('Following are the permissions available in AirApp')
  console.log('In format "<key> : <Explaination>"')
  console.log('')

  for (const key of permissionsKeys) {
    console.log(`${chalk.bold.white(key)} : ${permissions[key]}`)
  }

  process.exit(0)
}

function runApp(platform) {
  
}

module.exports = {
  initApp,
  appInfo,
  listApps,
  listAllPermissions
}