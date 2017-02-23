'use strict'

const draw = require('../../module/draw')

function handler (req, res) {
  Promise.resolve()
    .then(() => draw.state.listMembers())
    .then((members) => res.send({members}))
}

module.exports = {
  url: '/list',
  method: 'get',
  handler
}
