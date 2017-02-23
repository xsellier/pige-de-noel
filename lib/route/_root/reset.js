'use strict'

const draw = require('../../module/draw')

function handler (req, res) {
  Promise.resolve()
    .then(() => draw.reset())
    .then(() => res.sendStatus(204))
    .catch(res)
}

module.exports = {
  url: '/reset',
  method: 'delete',
  handler
}
