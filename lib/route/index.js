'use strict'

const path = require('path')
const fs = require('fs')
const config = require('config')

function readDirectory (dirname, routePrefix) {
  return fs.readdirSync(dirname)
    .filter((item) => fs.lstatSync(path.resolve(dirname, item)).isFile())
    .map((file) => {
      let route = require(path.resolve(dirname, file))

      route.url = `/${config.server.apiPrefix}/${/^_root$/.test(routePrefix) ? '' : routePrefix}/${route.url}/`
        .replace(/\/[/]*/g, '/')
        .replace(/\/$/, '')

      return route
    })
}

console.log('Loading routes ...')

const routes = fs.readdirSync(__dirname)
  .filter((item) => fs.lstatSync(path.resolve(__dirname, item)).isDirectory())
  .reduce((acc, directory) => {
    return acc.concat(readDirectory(path.resolve(__dirname, directory), directory))
  }, [])

module.exports = routes
