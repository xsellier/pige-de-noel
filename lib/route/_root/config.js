'use strict'

const config = require('config')

function handler (req, res) {
  res(config.draw)
}

module.exports = {
  url: '/config',
  method: 'get',
  handler
}
