'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res, next) {
  res.send({state: machineState.state.name})
}

module.exports = {
  url: '/state',
  method: 'get',
  handler
}
