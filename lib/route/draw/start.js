'use strict'

const draw = require('../../module/draw')

function handler (req, res) {
  Promise.resolve()
    .then(() => draw.state.start())
    .then(() => res.sendStatus(204))
}

module.exports = {
  url: '/',
  method: 'post',
  handler
}
