'use strict'

const config = require('config')

function handler (req, res, next) {
  res.send(config.draw)
}

module.exports = {
  url: '/config',
  method: 'get',
  handler
}
