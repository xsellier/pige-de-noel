'use strict'

const draw = require('../../module/draw')

function handler (req, res) {
  const member = req.params.member

  Promise.resolve()
    .then(() => draw.state.getMatch(member))
    .then((match) => res.send({match}))
}

module.exports = {
  url: '/:member',
  method: 'get',
  handler
}
