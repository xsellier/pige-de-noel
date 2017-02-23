'use strict'

const machineState = require('../../module/machine-state')

function handler (req, res, next) {
  let couple = req.body.couple

  Promise.resolve()
    .then(() => machineState.state.addCouple(couple[0], couple[1]))
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = {
  url: '/',
  method: 'post',
  handler
}
