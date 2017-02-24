'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res, next) {
  Promise.resolve()
    .then(() => machineState.reset())
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = {
  url: '/reset',
  method: 'delete',
  handler
}
