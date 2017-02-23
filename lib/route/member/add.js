'use strict'

const draw = require('../../module/draw')

function handler (req, res) {
  let member = req.body.member

  Promise.resolve()
    .then(() => draw.state.addMember(member))
    .then(() => res.sendStatus(204))
}

module.exports = {
  url: '/',
  method: 'post',
  handler
}
