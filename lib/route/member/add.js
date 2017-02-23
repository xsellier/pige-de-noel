'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res) {
  let member = req.body.member

  Promise.resolve()
    .then(() => machineState.state.addMember(member))
    .then(() => res.sendStatus(204))
}

module.exports = {
  url: '/',
  method: 'post',
  handler
}
