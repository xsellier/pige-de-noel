'use strict'

const draw = require('../../module/draw')

function handler (req, res, next) {
  let couple = req.body.couple

  Promise.resolve()
    .then(() => draw.state.addCouple(couple[0], couple[1]))
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = {
  url: '/',
  method: 'post',
  handler
}
