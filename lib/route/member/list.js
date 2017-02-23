'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res) {
  Promise.resolve()
    .then(() => machineState.state.listMembers())
    .then((members) => res.send({members}))
}

module.exports = {
  url: '/list',
  method: 'get',
  handler
}
