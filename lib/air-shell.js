const wget = require('wget-improved')
const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const mkdirp = require('mkdirp')
const ProgressBar = require('progress')

const destPath = path.resolve(__dirname, '../.tmp/')
const zipUrl = 'http://78rc4m.com1.z0.glb.clouddn.com/air-shell-1.zip'

function downloadLatestShell() {
  return new Promise((resolve, reject) => {
    const filename = path.join(destPath, 'air-shell-latest.zip')
    const download = wget.download(zipUrl, filename, {})
    let progressBar = null

    download.on('error', err => reject(err))
    download.on('start', fileSize => {
      progressBar = new ProgressBar('downloading air-shell [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 30,
        total: parseInt(fileSize)
      })
    })
    download.on('progress', progress => progressBar.update(progress))
    download.on('end', () => resolve(filename))
  })
}

function unzipAirShellTo(zipFilename, destDir) {
  return new Promise((resolve, reject) => {
    checkAndCreateDestDir(destDir)

    const zip = new AdmZip(zipFilename)
    zip.extractAllToAsync(destDir, true, err => {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}

function checkAndCreateDestDir(destDir) {
  const isDestDirExists = fs.existsSync(destDir)

  if (!isDestDirExists) {
    mkdirp.sync(destDir)
  }
}

function createTempDir(destPath) {
  const isTempDirExists = fs.existsSync(destPath)

  if (!isTempDirExists) {
    mkdirp.sync(destPath)
  }
}

module.exports = {
  downloadLatestShell,
  unzipAirShellTo
}

createTempDir(destPath)