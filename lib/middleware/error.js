'use strict'

/**
 * Middleware, format the error response
 * @param {Object} app - ExpressJS app
 */
module.exports = (app) => {
  app.use((err, req, res, next) => {
    console.log(`Error while calling ${req.url}, due to:`, err)

    res.status(500).send({message: 'Something went wrong :-S'})
  })
}
