'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res) {
  let member = req.body.member

  Promise.resolve()
    .then(() => machineState.state.removeMember(member))
    .then(() => res.sendStatus(204))
}

module.exports = {
  url: '/',
  method: 'delete',
  handler
}
