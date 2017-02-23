'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res) {
  Promise.resolve()
    .then(() => machineState.state.start())
    .then(() => res.sendStatus(204))
}

module.exports = {
  url: '/',
  method: 'post',
  handler
}
