const min = require('min')
const Model = require('min-model')
const FileStore = require('min-file')
const path = require('path')

const dataFilename = path.resolve(__dirname, './store.dat')

min.store = new FileStore(dataFilename)
Model.use(min)

const AirApp = Model.extend('airapp', {
  rootPath: String,

  name: String,
  version: 'v1.0.0',
  description: String,
  main: 'index.js',
  keywords: Array,
  author: String,

  // AirApp
  //   Compatibility
  'air:compatibility': Array,
  //   Storage
  'air:permissions:storage:file': false,
  'air:permissions:storage:async': false,
  //   Media
  'air:permissions:media:camera': false,
  'air:permissions:media:photos': false,
  'air:permissions:media:microphone': false,
  'air:permissions:media:sound': false,
  //   Net
  'air:permissions:net:http': [],
  'air:permissions:net:tcp': [],
  'air:permissions:net:udp': [],
  'air:permissions:net:websocket': [],
  'air:permissions:net:bluetooth': false,
  'air:permissions:net:nfc': false,

  //   Privacy
  'air:permissions:privacy:location': false,
  'air:permissions:privacy:contacts': false,

  //   System
  'air:permissions:system:background_fetch': false,
  'air:permissions:system:notifications': false,
  'air:permissions:system:call': false,
  'air:permissions:system:motions_sensor': false,
  'air:permissions:system:vibration': false,
  'air:permissions:system:fingerprint': false,

  // Native
  'air:pod': false,
  'air:gradle': false
})
AirApp.setIndex('name')
AirApp.setIndex('description')
AirApp.setIndex('keywords')

module.exports = {
  min, AirApp
}