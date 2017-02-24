'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res) {
  const member = req.params.member

  Promise.resolve()
    .then(() => machineState.state.get(member))
    .then((match) => res.send({match}))
}

module.exports = {
  url: '/:member',
  method: 'get',
  handler
}
