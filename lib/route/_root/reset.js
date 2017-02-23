'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res) {
  Promise.resolve()
    .then(() => machineState.reset())
    .then(() => res.sendStatus(204))
    .catch(res)
}

module.exports = {
  url: '/reset',
  method: 'delete',
  handler
}
